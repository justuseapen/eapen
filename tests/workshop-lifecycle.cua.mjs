import assert from 'node:assert/strict';

/**
 * Run through the existing CUA tab/CDP handles, after reading their documentation:
 *   await suite.verifyWorkshopLifecycle(preview, cdp, 'http://127.0.0.1:8003');
 * Uses a disposable, connected controller. Does not spawn a browser or server.
 */
export async function verifyWorkshopLifecycle(tab, cdp, baseUrl) {
  const base = new URL(baseUrl);
  assert.ok(['localhost', '127.0.0.1'].includes(base.hostname), 'Use a local test server');
  const results = [];
  const record = check => results.push({ check, passed: true });
  const runtime = async code => {
    const result = await cdp.send('Runtime.evaluate', {
      expression: `(async () => { const t = window.__workshopLifecycle; ${code} })()`,
      awaitPromise: true,
      returnByValue: true,
    });
    assert.ok(!result.exceptionDetails, JSON.stringify(result.exceptionDetails));
    return result.result.value;
  };
  const media = value => cdp.send('Emulation.setEmulatedMedia', {
    features: [{ name: 'prefers-reduced-motion', value }],
  });
  const act = action => tab.playwright.locator(`#workshop-lifecycle-fixture [data-action="${action}"]`).click();
  const settled = (value, state, policy) => {
    assert.equal(value.state, state);
    assert.equal(value.policy, policy);
    assert.equal(value.moving, null);
    assert.equal(value.animations.length, 0);
    assert.equal(value.pauseHidden, true);
  };

  try {
    await tab.goto(base.href);
    assert.equal(new URL(await tab.url()).origin, base.origin, 'Remain on the local origin');
    await media('no-preference');
    await runtime(`
      const { initWorkshopDemo } = await import('/scripts/workshop-demo.js');
      const fixture = document.createElement('section');
      fixture.id = 'workshop-lifecycle-fixture';
      fixture.style.cssText = 'position:fixed;inset:0;z-index:2147483647;overflow:auto;background:#171613;padding:24px';
      const stage = document.createElement('div');
      const link = document.createElement('a');
      link.id = 'workshop-lifecycle-link';
      link.href = '#workshop-lifecycle-fixture';
      link.textContent = 'Test navigation cancellation';
      link.style.cssText = 'position:fixed;top:0;right:0;z-index:2;background:#171613;padding:8px';
      // Exercise the document capture handler without adding a test history entry.
      link.addEventListener('click', event => event.preventDefault());
      fixture.append(link, stage);
      document.body.append(fixture);
      const test = window.__workshopLifecycle = { fixture, stage, initWorkshopDemo };
      test.controller = initWorkshopDemo(stage);
      test.desk = () => stage.querySelector('.workflow-demo');
      test.frame = () => new Promise(resolve => requestAnimationFrame(resolve));
      test.frames = async () => { await test.frame(); await test.frame(); };
      test.animations = () => document.getAnimations().filter(animation =>
        animation.effect?.target && test.desk()?.contains(animation.effect.target));
      test.capture = () => {
        const animations = test.animations();
        // Capture finished promises BEFORE cancellation; reading them afterward can
        // create fresh pending promises on cancelled Web Animations.
        return { animations, finished: Promise.allSettled(animations.map(animation => animation.finished)) };
      };
      test.snapshot = () => {
        const desk = test.desk();
        const pause = desk.querySelector('[data-action="pause"]');
        return {
          state: desk.dataset.state,
          policy: test.controller.getState().policy,
          moving: desk.dataset.moving ?? null,
          animations: test.animations().map(animation => animation.playState),
          pauseHidden: pause.hidden,
          pauseLabel: pause.textContent,
          focus: document.activeElement.getAttribute('data-action'),
        };
      };
      await test.frames();
      return true;
    `);

    await act('run');
    let value = await runtime('t.current = t.capture(); return t.snapshot();');
    assert.equal(value.moving, 'true');
    assert.ok(value.animations.length > 0);
    await act('pause');
    value = await runtime('await t.frames(); return t.snapshot();');
    assert.ok(value.animations.length > 0 && value.animations.every(state => state === 'paused'));
    assert.equal(value.pauseLabel, 'Resume motion');
    assert.equal(value.state, 'needs-decision');
    await act('pause');
    value = await runtime('return t.snapshot();');
    assert.ok(value.animations.some(state => state === 'running'));
    value = await runtime('await t.current.finished; await t.frames(); return t.snapshot();');
    settled(value, 'needs-decision', null);
    assert.equal(value.focus, 'run');
    record('Pause/resume preserves the decision; natural completion restores focus and clears motion');

    await act('request-source');
    value = await runtime(`
      t.controller.start();
      t.previous = t.capture();
      t.controller.start();
      t.current = t.capture();
      await t.previous.finished;
      await t.frames();
      return { ...t.snapshot(), oldCancelled: t.previous.animations.every(a => a.playState === 'idle') };
    `);
    assert.equal(value.oldCancelled, true);
    assert.equal(value.moving, 'true', 'Old completion must not clear the newer replay');
    assert.ok(value.animations.some(state => state === 'running'));
    assert.equal(value.policy, 'request-source');
    await act('reset');
    value = await runtime('await t.current.finished; await t.frames(); return t.snapshot();');
    settled(value, 'idle', null);
    assert.equal(value.focus, 'run');
    record('A new replay supersedes old animation callbacks; Reset cancels motion and clears the policy');

    await act('run');
    await act('request-source');
    for (const trigger of ['Escape', 'offscreen', 'anchor click']) {
      value = await runtime('t.controller.start(); t.current = t.capture(); return t.snapshot();');
      assert.equal(value.moving, 'true', `${trigger} begins with active motion`);
      assert.ok(value.animations.length > 0);
      if (trigger === 'Escape') {
        await tab.playwright.locator('#workshop-lifecycle-fixture [data-action="pause"]').press('Escape');
      } else if (trigger === 'offscreen') {
        await runtime("t.fixture.style.transform = 'translateY(200vh)'; return true;");
      } else {
        await tab.playwright.locator('#workshop-lifecycle-link').click();
      }
      value = await runtime(`
        // Bound the observation well below the 2.1-second natural choreography.
        for (let frame = 0; frame < 12 && t.desk().dataset.moving; frame++) await t.frame();
        return t.snapshot();
      `);
      settled(value, 'held', 'request-source');
      if (trigger === 'Escape') assert.equal(value.focus, 'run');
      await runtime('await t.current.finished; t.fixture.style.transform = ""; await t.frames(); return true;');
    }
    record('Active Escape, real offscreen observation, and anchor-click cancellation preserve the held policy');

    value = await runtime(`
      const duplicate = t.initWorkshopDemo(t.stage);
      t.controller.start();
      t.current = t.capture();
      const oldDesk = t.desk();
      const oldChoice = oldDesk.querySelector('[data-action="omit-claim"]');
      const oldController = t.controller;
      const oldState = JSON.stringify(oldController.getState());
      const activeBeforeDestroy = t.current.animations.length;
      oldController.destroy();
      const removed = !oldDesk.isConnected && !t.stage.dataset.workshopInitialized && !t.stage.children.length;
      oldController.start();
      oldChoice.click();
      const inert = JSON.stringify(oldController.getState()) === oldState;
      t.controller = t.initWorkshopDemo(t.stage);
      const fresh = t.snapshot();
      t.controller.start();
      await t.current.finished;
      await t.frames();
      return {
        duplicate: duplicate === null, activeBeforeDestroy, removed, inert,
        oldCancelled: t.current.animations.every(animation => animation.playState === 'idle'),
        freshState: fresh.state, freshPolicy: fresh.policy,
        desks: t.stage.querySelectorAll('.workflow-demo').length,
        ...t.snapshot(),
      };
    `);
    assert.equal(value.duplicate, true);
    assert.ok(value.activeBeforeDestroy > 0);
    assert.equal(value.removed, true);
    assert.equal(value.inert, true);
    assert.equal(value.oldCancelled, true);
    assert.equal(value.freshState, 'idle');
    assert.equal(value.freshPolicy, null);
    assert.equal(value.desks, 1);
    assert.equal(value.state, 'needs-decision');
    assert.equal(value.moving, 'true', 'Destroyed instance callbacks must not settle the new instance');
    await act('request-source');
    value = await runtime('return t.snapshot();');
    assert.equal(value.state, 'held');
    assert.equal(value.policy, 'request-source');
    record('Duplicate init is rejected; destruction cancels and detaches; reinitialization starts clean and works');
    return results;
  } finally {
    try {
      await runtime('if (t) { try { t.controller?.destroy(); } finally { t.fixture.remove(); delete window.__workshopLifecycle; } } return true;');
    } finally {
      await cdp.send('Emulation.setEmulatedMedia', { features: [] });
    }
  }
}
