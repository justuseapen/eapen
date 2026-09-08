import test from 'node:test';
import assert from 'node:assert/strict';
import {
  SAMPLES,
  evaluateSubmission,
  initialRehearsalState,
  transitionRehearsal,
} from '../scripts/workshop-policy.js';

test('a missing source requires a human policy before a brief can advance', () => {
  const result = evaluateSubmission(SAMPLES.missing, null);
  assert.equal(result.status, 'needs-decision');
  assert.equal(result.editorReview, false);
  assert.equal(result.claimIncluded, true);
  assert.equal(result.publicationAllowed, false);
});

test('requesting a source preserves the claim and holds the submission', () => {
  const result = evaluateSubmission(SAMPLES.missing, 'request-source');
  assert.equal(result.status, 'held');
  assert.equal(result.claimIncluded, true);
  assert.equal(result.editorReview, false);
  assert.equal(result.publicationAllowed, false);
  assert.equal(result.revision, null);
});

test('omitting the unsupported claim marks a revision for the editor', () => {
  const result = evaluateSubmission(SAMPLES.missing, 'omit-claim');
  assert.equal(result.status, 'revised');
  assert.equal(result.claimIncluded, false);
  assert.equal(result.editorReview, true);
  assert.equal(result.revision.removed, SAMPLES.missing.claim);
  assert.match(result.revision.reason, /source/i);
  assert.equal(result.publicationAllowed, false);
  assert.equal(SAMPLES.missing.claim, 'Visitors doubled in its first month.');
});

test('a source-complete fictional sample reaches editor review with either policy', () => {
  for (const policy of [null, 'request-source', 'omit-claim']) {
    const result = evaluateSubmission(SAMPLES.complete, policy);
    assert.equal(result.status, 'ready');
    assert.equal(result.claimIncluded, true);
    assert.equal(result.editorReview, true);
    assert.equal(result.revision, null);
    assert.equal(result.source, SAMPLES.complete.source);
    assert.match(result.source.label, /fictional/i);
    assert.equal(result.publicationAllowed, false);
  }
});

test('replay and switching samples preserve the chosen policy; reset clears it', () => {
  let state = transitionRehearsal(initialRehearsalState(), { type: 'run', sample: 'missing' });
  state = transitionRehearsal(state, { type: 'choose-policy', policy: 'omit-claim' });
  assert.equal(state.result.status, 'revised');
  state = transitionRehearsal(state, { type: 'run', sample: 'complete' });
  assert.equal(state.result.status, 'ready');
  assert.equal(state.policy, 'omit-claim');
  state = transitionRehearsal(state, { type: 'run', sample: 'missing' });
  assert.equal(state.result.status, 'revised');
  assert.equal(state.policy, 'omit-claim');
  const previous = state;
  state = transitionRehearsal(state, { type: 'reset' });
  assert.deepEqual(state, initialRehearsalState());
  assert.equal(previous.policy, 'omit-claim', 'transitions do not mutate earlier state');
});

test('changing the policy reopens the same missing-source decision', () => {
  let state = transitionRehearsal(initialRehearsalState(), { type: 'run', sample: 'missing' });
  state = transitionRehearsal(state, { type: 'choose-policy', policy: 'request-source' });
  assert.equal(state.result.status, 'held');
  state = transitionRehearsal(state, { type: 'change-policy' });
  assert.equal(state.sample, 'missing');
  assert.equal(state.policy, null);
  assert.equal(state.result.status, 'needs-decision');
});

test('unknown samples, policies, and transitions fail explicitly', () => {
  assert.throws(() => evaluateSubmission(SAMPLES.missing, 'publish'), /policy/i);
  assert.throws(() => evaluateSubmission(null, null), /sample/i);
  assert.throws(() => transitionRehearsal(initialRehearsalState(), { type: 'run', sample: 'external' }), /sample/i);
  assert.throws(() => transitionRehearsal(initialRehearsalState(), { type: 'publish' }), /event/i);
  assert.throws(() => transitionRehearsal(initialRehearsalState(), { type: 'choose-policy', policy: 'omit-claim' }), /run/i);
});
