import {
  SAMPLES,
  initialRehearsalState,
  transitionRehearsal,
} from "./workshop-policy.js";

let rehearsalNumber = 0;

const outcomeCopy = {
  idle: {
    label: "THE DESTINATION",
    title: "A person gets the final say.",
    description:
      "A clear brief. A visible decision. An editor who stays in charge.",
    footnote: "Run the sample to follow the paper.",
    gate: {
      status: "READY",
      eyebrow: "IF A CLAIM HAS NO SOURCE",
      title: "Where do you draw the line?",
      description:
        "Let the routine checks run. Keep the consequential choice yours.",
      route: "A human decision becomes a rule.",
      icon: "↗",
    },
  },
  "needs-decision": {
    label: "AWAITING YOUR DECISION",
    title: "This part needs a person.",
    description:
      "“Visitors doubled” arrived without a source. Choose what the workflow should do with that claim.",
    footnote: "The submission stays here until you choose.",
    gate: {
      status: "YOUR CALL",
      eyebrow: "IF A CLAIM HAS NO SOURCE",
      title: "What should happen next?",
      description:
        "“Visitors doubled” arrived without a source. Decide what the system should do.",
      route: "A human decision becomes a rule.",
      icon: "?",
    },
  },
  held: {
    label: "HELD · SOURCE REQUESTED",
    title: "A useful pause.",
    description:
      "The submission is held with its wording intact. The contributor needs to provide a source before it can reach the editor.",
    footnote: "Next action: contributor supplies a source.",
    gate: {
      status: "HOLD",
      eyebrow: "IF A CLAIM HAS NO SOURCE",
      title: "Your judgment, made explicit.",
      description:
        "Now the same situation gets the same treatment. And anyone can see why.",
      route: "A deliberate stop, with a clear next step.",
      icon: "Ⅱ",
    },
  },
  revised: {
    label: "PREPARED FOR EDITOR REVIEW",
    title: "Less claim. More clarity.",
    description:
      "The unsupported sentence is removed. The rest of the brief moves to the editor with the change clearly marked.",
    footnote: "Next action: the editor reviews the revision.",
    gate: {
      status: "REVISE",
      eyebrow: "IF A CLAIM HAS NO SOURCE",
      title: "Your judgment, made explicit.",
      description:
        "Now the same situation gets the same treatment. And anyone can see why.",
      route: "Your rule → a visible revision.",
      icon: "✓",
    },
  },
  ready: {
    label: "PREPARED FOR EDITOR REVIEW",
    title: "The source travels with the story.",
    description:
      "This sample includes a source note. The complete brief and its citation move together to the editor.",
    footnote: "Next action: the editor checks the brief and source.",
    gate: {
      status: "SOURCE FOUND",
      eyebrow: "A SOURCE NOTE IS PRESENT",
      title: "The check passes.",
      description:
        "The citation stays with the claim. An editor checks both before any publishing decision.",
      route: "Claim + source → editor review.",
      icon: "✓",
    },
  },
};

/** Enhance an empty stage. The caller retains the static, no-JavaScript explanation. */
export function initWorkshopDemo(stage) {
  if (!stage || stage.dataset.workshopInitialized) return null;
  stage.dataset.workshopInitialized = "true";
  const document = stage.ownerDocument;
  const window = document.defaultView;
  const prefix = `workflow-${++rehearsalNumber}`;
  const desk = document.createElement("div");
  desk.className = "workflow-demo";
  desk.setAttribute("role", "region");
  desk.setAttribute("aria-label", "Interactive editorial workflow rehearsal");
  desk.innerHTML = `
    <div class="workflow-topline">
      <div class="workflow-ident"><span class="workflow-led" aria-hidden="true"></span> THE EDITORIAL DESK <span class="workflow-edition">/ NO. 01</span></div>
      <span class="workflow-fiction">Fictional sample · no live AI</span>
    </div>
    <div class="workflow-intro">
      <p class="workflow-invitation">One story.<br><em>Your judgment.</em></p>
      <div class="workflow-start">
        <button class="workflow-run" type="button" data-action="run"><span class="workflow-play" aria-hidden="true">↗</span><span data-copy="run-label">Run the sample</span></button>
        <span class="workflow-start-note" data-copy="start-note">One story. One decision. Your rule.</span>
      </div>
    </div>
    <div class="workflow-board">
      <section class="workflow-column workflow-input" aria-labelledby="${prefix}-input-label">
        <h3 class="workflow-column-label" id="${prefix}-input-label"><span>01</span> A STORY COMES IN <span class="workflow-column-dot" aria-hidden="true"></span></h3>
        <article class="workflow-paper" data-motion="paper">
          <div class="workflow-paper-top"><span>THE COMMUNITY DESK</span><span data-copy="sample-number">SUB. 014</span></div>
          <div class="workflow-paper-rule" aria-hidden="true"></div>
          <p class="workflow-paper-kicker">A neighborhood dispatch</p>
          <h4>${SAMPLES.missing.title}</h4>
          <p class="workflow-story">${SAMPLES.missing.introduction}</p>
          <p class="workflow-claim-wrap"><span class="workflow-margin-number" aria-hidden="true">03</span><mark class="workflow-claim" data-motion="claim">${SAMPLES.missing.claim}<span class="workflow-claim-ref" aria-hidden="true"> 1</span></mark></p>
          <p class="workflow-story">${SAMPLES.missing.closing}</p>
          <div class="workflow-source" data-motion="source">
            <span class="workflow-source-symbol" aria-hidden="true">↳</span>
            <div><span class="workflow-source-label" data-copy="source-label">1 / Source not supplied</span><p data-copy="source-note">This sentence needs something to stand on.</p></div>
          </div>
          <details class="workflow-source-detail" data-part="source-detail" hidden><summary>Read the fictional source note</summary><p>${SAMPLES.complete.source.detail}</p></details>
          <div class="workflow-paper-footer"><span>ILLUSTRATIVE SUBMISSION</span><span data-copy="source-count">1 claim / 0 sources</span></div>
        </article>
        <p class="workflow-caption"><span aria-hidden="true">↳</span> The entire example is invented.</p>
      </section>
      <section class="workflow-column workflow-middle" aria-labelledby="${prefix}-rule-label">
        <h3 class="workflow-column-label" id="${prefix}-rule-label"><span>02</span> A RULE MAKES IT CLEAR <span class="workflow-column-dot" aria-hidden="true"></span></h3>
        <div class="workflow-gate" data-motion="gate">
          <div class="workflow-gate-top"><span class="workflow-gate-icon" aria-hidden="true">⌘</span><span>SOURCE CHECK</span><span class="workflow-gate-status" data-copy="gate-status">READY</span></div>
          <div class="workflow-rule-diagram" aria-hidden="true"><span></span><i></i><span></span></div>
          <p class="workflow-gate-eyebrow" data-copy="gate-eyebrow">IF A CLAIM HAS NO SOURCE</p>
          <h4 class="workflow-gate-title" data-copy="gate-title" tabindex="-1">Where do you draw the line?</h4>
          <p class="workflow-gate-description" data-copy="gate-description">Let the routine checks run. Keep the consequential choice yours.</p>
          <div class="workflow-policy-options" data-part="policy-options" role="group" aria-label="Choose the missing-source policy" hidden>
            <button class="workflow-policy" type="button" data-action="request-source"><span><strong>Request a source</strong><small>Hold the submission</small></span><span aria-hidden="true">↗</span></button>
            <button class="workflow-policy" type="button" data-action="omit-claim"><span><strong>Omit the unsupported claim</strong><small>Prepare a marked revision</small></span><span aria-hidden="true">↗</span></button>
          </div>
          <div class="workflow-selected-rule" data-part="selected-rule" hidden><span class="workflow-selected-label">YOUR RULE</span><strong data-copy="selected-rule"></strong><span class="workflow-rule-mark" data-motion="rule-mark" aria-hidden="true"></span><span class="workflow-rule-scope">Used again in this rehearsal until reset.</span></div>
          <p class="workflow-gate-awaiting" data-part="gate-awaiting"><span aria-hidden="true">—</span> Waiting for the sample</p>
        </div>
        <div class="workflow-connector" aria-hidden="true"><svg viewBox="0 0 220 40" fill="none"><path d="M1 9H70C90 9 91 30 110 30H217M208 22l9 8-9 8"/></svg><span data-copy="route-label">A human decision becomes a rule.</span></div>
      </section>
      <section class="workflow-column workflow-output" aria-labelledby="${prefix}-output-label">
        <h3 class="workflow-column-label" id="${prefix}-output-label"><span>03</span> THE NEXT RIGHT STEP <span class="workflow-column-dot" aria-hidden="true"></span></h3>
        <article class="workflow-result" data-motion="result">
          <div class="workflow-result-ticks" aria-hidden="true"><span>+</span><span>+</span></div>
          <div class="workflow-result-icon" aria-hidden="true" data-copy="result-icon">↗</div>
          <p class="workflow-result-label" data-copy="result-label">${outcomeCopy.idle.label}</p>
          <h4 class="workflow-result-title" data-copy="result-title" tabindex="-1">${outcomeCopy.idle.title}</h4>
          <p class="workflow-carried-rule" data-part="carried-rule" hidden><span>YOUR RULE</span><strong data-copy="carried-rule"></strong></p>
          <p class="workflow-result-description" data-copy="result-description">${outcomeCopy.idle.description}</p>
          <div class="workflow-revision" data-part="revision" hidden><span>MARKED REVISION / −1 SENTENCE</span><del>${SAMPLES.missing.claim}</del><small>No source supplied. Removed for editor review.</small></div>
          <div class="workflow-attached-source" data-part="attached-source" hidden><span>SOURCE ATTACHED</span><strong>${SAMPLES.complete.source.label}</strong></div>
          <div class="workflow-result-bottom"><span class="workflow-result-seal" aria-hidden="true">JE</span><p data-copy="result-footnote">${outcomeCopy.idle.footnote}</p></div>
        </article>
        <a class="workflow-training-link" data-part="training-link" hidden href="#offers">Learn to build systems like this <span aria-hidden="true">↗</span></a>
        <p class="workflow-output-note"><span aria-hidden="true">↳</span> Prepared for a person. Never auto-published.</p>
      </section>
    </div>
    <div class="workflow-bottom">
      <div class="workflow-secondary-actions">
        <button type="button" class="workflow-text-button" data-action="other-sample" hidden>Try complete sample <span aria-hidden="true">↗</span></button>
        <button type="button" class="workflow-text-button" data-action="replay" hidden>Replay this sample</button>
        <button type="button" class="workflow-text-button" data-action="change-policy" hidden>Change your rule</button>
        <button type="button" class="workflow-text-button workflow-reset" data-action="reset" hidden>Reset</button>
        <button type="button" class="workflow-text-button" data-action="pause" hidden>Pause motion</button>
      </div>
      <span class="workflow-boundary">AUTOMATE THE ROUTINE. KEEP THE JUDGMENT.</span>
    </div>
    <details class="workflow-rule-inspector" data-part="inspector">
      <summary><span><span class="workflow-inspect-symbol" aria-hidden="true">{ }</span> Inspect the rule</span><span class="workflow-inspect-plus" aria-hidden="true">+</span></summary>
      <div class="workflow-rule-content">
        <div><p class="workflow-inspector-kicker">SMALL ENOUGH TO UNDERSTAND</p><h4>No mystery in the middle.</h4><p>This is a fixed rehearsal with two invented submissions. It checks whether a source note is present. It does not verify truth or call a model.</p><p>Your choice stays in this rehearsal and reset clears it. An editor still reviews every prepared brief.</p></div>
        <ol class="workflow-rule-list"><li><span>01</span><p><strong>Source supplied?</strong>Attach it to the brief → prepare for editor review.</p></li><li data-rule="request-source"><span>02</span><p><strong>No source + request a source</strong>Keep the claim → hold the submission for a source.</p></li><li data-rule="omit-claim"><span>03</span><p><strong>No source + omit the claim</strong>Mark the removal → prepare the revision for editor review.</p></li><li><span>04</span><p><strong>No policy chosen?</strong>Pause for a person. Nothing is published in any branch.</p></li></ol>
      </div>
    </details>
    <div class="workflow-sr-only" role="status" aria-live="polite" aria-atomic="true" data-part="announcement"></div>
  `;
  stage.append(desk);

  const part = (name) => desk.querySelector(`[data-part="${name}"]`);
  const button = (name) => desk.querySelector(`[data-action="${name}"]`);
  const copy = (name, text) => {
    desk.querySelector(`[data-copy="${name}"]`).textContent = text;
  };
  const motionTarget = (name) => desk.querySelector(`[data-motion="${name}"]`);
  let state = initialRehearsalState();
  let animations = [];
  let motionVersion = 0;
  let paused = false;
  let destroyed = false;
  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)");

  function settleMotion() {
    const wasPauseFocused = document.activeElement === button("pause");
    motionVersion += 1;
    animations.forEach((animation) => animation.cancel());
    animations = [];
    paused = false;
    desk.removeAttribute("data-moving");
    button("pause").hidden = true;
    button("pause").textContent = "Pause motion";
    if (wasPauseFocused) button("run").focus({ preventScroll: true });
  }

  function playMotion() {
    const bounds = desk.getBoundingClientRect();
    if (
      reducedMotion?.matches ||
      document.hidden ||
      !desk.animate ||
      bounds.bottom <= 0 ||
      bounds.top >= window.innerHeight
    )
      return;
    const version = motionVersion;
    desk.dataset.moving = "true";
    button("pause").hidden = false;
    const easing = "cubic-bezier(.22, 1, .36, 1)";
    const animate = (name, keyframes, timing) => {
      const animation = motionTarget(name).animate(keyframes, {
        easing,
        ...timing,
      });
      animations.push(animation);
      return animation;
    };
    // Three beats: read the same paper, show the boundary, then hand it onward.
    animate(
      "paper",
      [
        { transform: "translateY(14px) rotate(-1.6deg)", opacity: 0.65 },
        { transform: "translateY(0) rotate(-0.7deg)", opacity: 1 },
      ],
      { duration: 850 },
    );
    animate(
      "source",
      [
        { transform: "translateX(-7px)", opacity: 0.45 },
        { transform: "translateX(0)", opacity: 1 },
      ],
      { delay: 350, duration: 700 },
    );
    animate(
      "gate",
      [
        { transform: "translateY(12px)", opacity: 0.55 },
        { transform: "translateY(0)", opacity: 1 },
      ],
      { delay: 550, duration: 850 },
    );
    animate(
      "result",
      [
        { transform: "translateY(18px) rotate(1.5deg)", opacity: 0.4 },
        { transform: "translateY(0) rotate(0.6deg)", opacity: 1 },
      ],
      { delay: 1100, duration: 1000 },
    );
    Promise.allSettled(animations.map((animation) => animation.finished)).then(
      () => {
        if (version === motionVersion && !destroyed) settleMotion();
      },
    );
  }

  function render({ announce = false } = {}) {
    const sample = SAMPLES[state.sample];
    const status = state.result?.status ?? "idle";
    const result = outcomeCopy[status];
    const needsDecision = status === "needs-decision";
    desk.dataset.state = status;
    desk.dataset.sample = state.sample;
    copy("sample-number", `SUB. ${sample.number}`);
    copy(
      "source-label",
      sample.source ? `1 / ${sample.source.label}` : "1 / Source not supplied",
    );
    copy(
      "source-note",
      sample.source
        ? "A local note is included with this sample."
        : "This sentence needs something to stand on.",
    );
    copy(
      "source-count",
      `1 claim / ${sample.source ? "1 source" : "0 sources"}`,
    );
    part("source-detail").hidden = !sample.source;
    if (!sample.source) part("source-detail").open = false;
    copy("run-label", state.result ? "Replay this sample" : "Run the sample");
    copy(
      "start-note",
      state.result
        ? state.policy
          ? "Your rule carries into the next run."
          : "Choose a rule at the source check."
        : "One story. One decision. Your rule.",
    );
    if (status === "ready")
      copy("start-note", "A source note is included in this sample.");
    copy("gate-status", result.gate.status);
    copy("gate-eyebrow", result.gate.eyebrow);
    copy("gate-title", result.gate.title);
    copy("gate-description", result.gate.description);
    part("policy-options").hidden = !needsDecision;
    part("selected-rule").hidden = !state.policy || status === "ready";
    copy(
      "selected-rule",
      state.policy === "omit-claim"
        ? "Omit the unsupported claim → editor review"
        : "Request a source → hold submission",
    );
    part("gate-awaiting").hidden = status !== "idle";
    copy("route-label", result.gate.route);
    copy("result-label", result.label);
    copy("result-title", result.title);
    copy("result-description", result.description);
    copy("result-footnote", result.footnote);
    copy("result-icon", result.gate.icon);
    part("carried-rule").hidden = !["held", "revised"].includes(status);
    copy(
      "carried-rule",
      state.policy === "omit-claim"
        ? "Omit the claim → editor review"
        : "Request a source → hold",
    );
    part("training-link").hidden = !["held", "revised", "ready"].includes(
      status,
    );
    part("revision").hidden = status !== "revised";
    part("attached-source").hidden = status !== "ready";
    button("other-sample").hidden = !state.result;
    button("replay").hidden = !state.result;
    button("other-sample").textContent =
      state.sample === "complete"
        ? "Try missing-source sample ↗"
        : "Try complete sample ↗";
    button("change-policy").hidden = !state.policy || status === "ready";
    button("reset").hidden = !state.result;
    desk
      .querySelectorAll("[data-rule]")
      .forEach((rule) =>
        rule.toggleAttribute(
          "data-selected",
          rule.dataset.rule === state.policy,
        ),
      );
    if (announce)
      part("announcement").textContent =
        status === "idle"
          ? "Rehearsal reset. Your rule has been cleared."
          : `${result.label}. ${result.description} ${result.footnote}`;
  }

  function focusStep(name) {
    const target = desk.querySelector(`[data-copy="${name}"]`);
    target.focus({ preventScroll: true });
    // On a stacked desk, an explicit action leads to its resulting step.
    if (window.innerWidth <= 900) {
      const card = target.closest(".workflow-column");
      const bounds = card.getBoundingClientRect();
      if (bounds.top < 20 || bounds.bottom > window.innerHeight) {
        card.scrollIntoView({
          block: "start",
          behavior: reducedMotion?.matches ? "instant" : "smooth",
        });
      }
    }
  }

  function runSample(sample = state.sample, { follow = true } = {}) {
    if (destroyed) return;
    settleMotion();
    state = transitionRehearsal(state, { type: "run", sample });
    render({ announce: true });
    playMotion();
    if (follow) {
      focusStep(
        state.result.status === "needs-decision"
          ? "gate-title"
          : "result-title",
      );
      if (window.innerWidth > 900) {
        const board = desk.querySelector(".workflow-board");
        const bounds = board.getBoundingClientRect();
        if (bounds.bottom > window.innerHeight || bounds.top < 0) {
          board.scrollIntoView({
            block: "start",
            behavior: reducedMotion?.matches ? "instant" : "smooth",
          });
        }
      }
    }
  }

  function act(event) {
    const control = event.target.closest("button[data-action]");
    if (!control || !desk.contains(control)) return;
    const action = control.dataset.action;
    if (action === "pause") {
      paused = !paused;
      animations.forEach((animation) =>
        paused ? animation.pause() : animation.play(),
      );
      control.textContent = paused ? "Resume motion" : "Pause motion";
      return;
    }
    if (action === "run" || action === "replay" || action === "other-sample") {
      const sample =
        action === "other-sample"
          ? state.sample === "missing"
            ? "complete"
            : "missing"
          : state.sample;
      runSample(sample);
      return;
    }
    settleMotion();
    if (action === "request-source" || action === "omit-claim") {
      state = transitionRehearsal(state, {
        type: "choose-policy",
        policy: action,
      });
      render({ announce: true });
      if (!reducedMotion?.matches && !document.hidden) {
        const mark = motionTarget("rule-mark");
        const version = motionVersion;
        const stroke = mark.animate(
          [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }],
          { duration: 650, easing: "cubic-bezier(.2,.75,.25,1)" },
        );
        const handoff = motionTarget("result").animate(
          [
            { opacity: 0.45, transform: "translateY(12px) rotate(.6deg)" },
            { opacity: 1, transform: "translateY(0) rotate(.6deg)" },
          ],
          { duration: 650, easing: "cubic-bezier(.2,.75,.25,1)" },
        );
        animations.push(stroke, handoff);
        Promise.allSettled([stroke.finished, handoff.finished]).then(() => {
          if (version === motionVersion && !destroyed) settleMotion();
        });
      }
      focusStep("result-title");
    } else if (action === "reset") {
      state = transitionRehearsal(state, { type: "reset" });
      part("inspector").open = false;
      render({ announce: true });
      button("run").focus({ preventScroll: true });
      desk.querySelector(".workflow-intro").scrollIntoView({
        block: "start",
        behavior: reducedMotion?.matches ? "instant" : "smooth",
      });
    } else if (action === "change-policy") {
      state = transitionRehearsal(state, { type: "change-policy" });
      render({ announce: true });
      focusStep("gate-title");
      button("request-source").focus({ preventScroll: true });
    }
  }

  function handleVisibility() {
    if (document.hidden) settleMotion();
  }
  function handleReducedMotion() {
    if (reducedMotion.matches) settleMotion();
  }
  function handleNavigation(event) {
    if (event.target.closest?.("a[href]")) settleMotion();
  }
  function handleEscape(event) {
    if (event.key === "Escape") settleMotion();
  }
  const observer = window.IntersectionObserver
    ? new window.IntersectionObserver(
        (entries) => {
          if (!entries[0].isIntersecting) settleMotion();
        },
        { threshold: 0 },
      )
    : null;

  desk.addEventListener("click", act);
  desk.addEventListener("keydown", handleEscape);
  document.addEventListener("visibilitychange", handleVisibility);
  document.addEventListener("click", handleNavigation, true);
  window.addEventListener("pagehide", settleMotion);
  window.addEventListener("popstate", settleMotion);
  if (reducedMotion?.addEventListener)
    reducedMotion.addEventListener("change", handleReducedMotion);
  else reducedMotion?.addListener?.(handleReducedMotion);
  observer?.observe(desk);
  render();

  return {
    start: () => runSample(state.sample, { follow: false }),
    cancelMotion: settleMotion,
    getState: () => ({ ...state }),
    destroy() {
      destroyed = true;
      settleMotion();
      observer?.disconnect();
      desk.removeEventListener("click", act);
      desk.removeEventListener("keydown", handleEscape);
      document.removeEventListener("visibilitychange", handleVisibility);
      document.removeEventListener("click", handleNavigation, true);
      window.removeEventListener("pagehide", settleMotion);
      window.removeEventListener("popstate", settleMotion);
      if (reducedMotion?.removeEventListener)
        reducedMotion.removeEventListener("change", handleReducedMotion);
      else reducedMotion?.removeListener?.(handleReducedMotion);
      desk.remove();
      delete stage.dataset.workshopInitialized;
    },
  };
}
