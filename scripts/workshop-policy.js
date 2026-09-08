// A closed, fictional rehearsal. No requests, model calls, storage, or publishing.
const story = {
  title: "A new chapter for the neighborhood.",
  introduction:
    "The community library has opened its doors, with quiet corners for readers and a shared table for after-school projects.",
  claim: "Visitors doubled in its first month.",
  closing: "Next on the calendar: a Saturday book swap, open to everyone.",
};

export const SAMPLES = Object.freeze({
  missing: Object.freeze({
    ...story,
    id: "missing",
    number: "014",
    source: null,
  }),
  complete: Object.freeze({
    ...story,
    id: "complete",
    number: "015",
    source: Object.freeze({
      label: "Fictional library desk note · 02",
      detail:
        "Illustrative visitor count: 120 in the opening week; 240 in the fourth week. This invented note belongs only to the sample.",
    }),
  }),
});

const policies = new Set([null, "request-source", "omit-claim"]);

export function evaluateSubmission(sample, policy = null) {
  if (!sample || !Object.values(SAMPLES).includes(sample))
    throw new TypeError("Unknown rehearsal sample.");
  if (!policies.has(policy))
    throw new TypeError("Unknown missing-source policy.");

  const sourced = Boolean(sample.source);
  const omit = !sourced && policy === "omit-claim";
  const status = sourced
    ? "ready"
    : policy === null
      ? "needs-decision"
      : omit
        ? "revised"
        : "held";

  return Object.freeze({
    status,
    claimIncluded: !omit,
    source: sample.source,
    editorReview: sourced || omit,
    publicationAllowed: false,
    revision: omit
      ? Object.freeze({
          removed: sample.claim,
          reason: "Removed because no source was supplied.",
        })
      : null,
  });
}

export function initialRehearsalState() {
  return { sample: "missing", policy: null, result: null };
}

export function transitionRehearsal(state, event) {
  switch (event.type) {
    case "reset":
      return initialRehearsalState();
    case "run": {
      const sample = event.sample ?? state.sample;
      return {
        ...state,
        sample,
        result: evaluateSubmission(SAMPLES[sample], state.policy),
      };
    }
    case "choose-policy":
      if (!state.result)
        throw new Error("Run a sample before choosing a policy.");
      return {
        ...state,
        policy: event.policy,
        result: evaluateSubmission(SAMPLES[state.sample], event.policy),
      };
    case "change-policy":
      return {
        ...state,
        policy: null,
        result: state.result
          ? evaluateSubmission(SAMPLES[state.sample], null)
          : null,
      };
    default:
      throw new TypeError("Unknown rehearsal event.");
  }
}
