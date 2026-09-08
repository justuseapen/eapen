import assert from 'node:assert/strict';

/**
 * Real-browser regression suite using Codex's documented CUA tab and CDP handles.
 * Run from the CUA REPL after selecting a localhost tab and reading CDP docs:
 *   const suite = await import('file:///ABSOLUTE/REPO/tests/workshop-browser.cua.mjs');
 *   const results = await suite.verifyWorkshop(preview, cdp, 'http://127.0.0.1:8003');
 * Browser control stays entirely inside CUA. No server or browser is spawned here.
 */
export async function verifyWorkshop(tab, cdp, baseUrl) {
  const base = new URL(baseUrl);
  assert.ok(['localhost', '127.0.0.1'].includes(base.hostname), 'Use a local test server');
  const results = [];
  const record = (check, detail) => results.push({ check, passed: true, ...detail });
  const inspect = () => tab.playwright.evaluate(() => {
    const desk = document.querySelector('.workflow-demo');
    const part = name => desk.querySelector(`[data-part="${name}"]`);
    return {
      state: desk.dataset.state,
      sample: desk.dataset.sample,
      focus: document.activeElement.getAttribute('data-copy') || document.activeElement.getAttribute('data-action'),
      revision: !part('revision').hidden,
      source: !part('attached-source').hidden,
      carriedRule: !part('carried-rule').hidden ? desk.querySelector('[data-copy="carried-rule"]').textContent : null,
      selectedRule: !part('selected-rule').hidden ? desk.querySelector('[data-copy="selected-rule"]').textContent : null,
      training: !part('training-link').hidden,
      announcement: part('announcement').textContent,
      inspector: part('inspector').open,
    };
  });
  const act = action => tab.playwright.locator(`[data-action="${action}"]`).click();
  const runtime = async expression => {
    const result = await cdp.send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
    assert.ok(!result.exceptionDetails, 'Instrumentation must execute successfully');
    return result.result.value;
  };
  const media = value => cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value }] });
  try {
    await media('reduce');
    await tab.goto(base.href);
    assert.equal((await inspect()).state, 'idle');
    await act('run');
    let state = await inspect();
    assert.equal(state.state, 'needs-decision');
    assert.equal(state.focus, 'gate-title');
    assert.equal(state.carriedRule, null);
    record('Run waits for a human policy and focuses the decision');

    await act('request-source');
    state = await inspect();
    assert.equal(state.state, 'held');
    assert.equal(state.focus, 'result-title');
    assert.match(state.carriedRule, /Request a source/);
    assert.equal(state.revision, false);
    assert.equal(state.training, true);
    assert.match(state.announcement, /HELD/);
    await act('replay');
    assert.equal((await inspect()).state, 'held');
    record('Request source holds intact text, carries the rule, and survives replay');

    await act('other-sample');
    state = await inspect();
    assert.equal(state.state, 'ready');
    assert.equal(state.source, true);
    assert.equal(state.revision, false);
    assert.equal(state.focus, 'result-title');
    await act('other-sample');
    assert.equal((await inspect()).state, 'held');
    record('Complete source reaches editor review without clearing the policy');

    await act('change-policy');
    assert.equal((await inspect()).focus, 'request-source');
    await act('omit-claim');
    state = await inspect();
    assert.equal(state.state, 'revised');
    assert.equal(state.revision, true);
    assert.match(state.carriedRule, /Omit the claim/);
    assert.match(state.announcement, /removed/);
    await act('replay');
    assert.equal((await inspect()).state, 'revised');
    record('Omit claim marks the revision and preserves the newly chosen policy');

    await tab.playwright.locator('.workflow-rule-inspector > summary').press('Enter');
    assert.equal((await inspect()).inspector, true);
    await act('reset');
    state = await inspect();
    assert.equal(state.state, 'idle');
    assert.equal(state.focus, 'run');
    assert.equal(state.carriedRule, null);
    assert.equal(state.selectedRule, null);
    assert.equal(state.inspector, false);
    assert.equal(state.training, false);
    await act('run');
    assert.equal((await inspect()).state, 'needs-decision');
    record('Keyboard inspector works; Reset clears both the policy and its presentation');

    await media('no-preference');
    await runtime('new Promise(resolve => requestAnimationFrame(() => resolve(true)))');
    await act('replay');
    const active = await runtime("document.querySelector('.workflow-demo').dataset.moving === 'true'");
    assert.equal(active, true);
    await media('reduce');
    const settled = await runtime("new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve({moving:document.querySelector('.workflow-demo').dataset.moving??null,active:document.getAnimations().filter(a=>a.playState==='running').length}))))");
    assert.equal(settled.moving, null);
    assert.equal(settled.active, 0);
    assert.equal((await inspect()).state, 'needs-decision');
    record('Runtime reduced motion cancels choreography without changing the decision', settled);

    const caseLink = tab.playwright.locator('a[data-case][href="/work/1t-home.html"]');
    await caseLink.click();
    assert.equal(new URL(await tab.url()).pathname, '/work/1t-home.html');
    assert.equal(await tab.playwright.getByRole('button', { name: 'Close project story', exact: true }).isVisible(), true);
    await tab.playwright.getByRole('button', { name: 'Close project story', exact: true }).press('Escape');
    await tab.playwright.locator('dialog[open]').waitFor({ state: 'detached' });
    let navigation = await tab.playwright.evaluate(() => ({ open: document.querySelector('dialog').open, focus: document.activeElement.getAttribute('href') }));
    assert.equal(navigation.open, false);
    assert.equal(navigation.focus, '/work/1t-home.html');
    await tab.forward();
    await tab.playwright.locator('dialog[open]').waitFor({ state: 'visible' });
    assert.equal(new URL(await tab.url()).pathname, '/work/1t-home.html');
    await tab.back();
    await tab.playwright.locator('dialog[open]').waitFor({ state: 'detached' });
    record('Native Escape, Forward, and Back preserve the project path and invoking focus');
    return results;
  } finally {
    await cdp.send('Emulation.setEmulatedMedia', { features: [] });
  }
}
