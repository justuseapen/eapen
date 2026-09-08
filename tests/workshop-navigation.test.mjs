import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const source = (await readFile(new URL('../scripts/workshop-navigation.js', import.meta.url), 'utf8'))
  .replace('export function initCaseNavigation', 'function initCaseNavigation');
const paths = ['/work/1t-home.html', '/work/tradecraft.html', '/work/pavlok.html'];
const deferred = () => {
  let resolve, reject;
  const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
};
const flush = async () => { for (let i = 0; i < 12; i += 1) await Promise.resolve(); };

// These small DOM/history facades exercise observable request and navigation
// behavior. Native dialog focus trapping, layout, and scroll restoration still
// require the real-browser checks described in the workshop plan.
class Element {
  constructor(tag = 'div', attrs = {}) {
    this.tagName = tag;
    this.attrs = { ...attrs };
    this.children = [];
    this.listeners = new Map();
    this.textContent = '';
    this.classList = { contains: name => this.className.split(' ').includes(name) };
  }
  get className() { return this.attrs.class || ''; }
  set className(value) { this.attrs.class = value; }
  setAttribute(name, value) { this.attrs[name] = value; }
  getAttribute(name) { return this.attrs[name] ?? null; }
  hasAttribute(name) { return name in this.attrs; }
  removeAttribute(name) { delete this.attrs[name]; }
  matches(selector) {
    if (selector.startsWith('.')) return this.classList.contains(selector.slice(1));
    const [tag] = selector.split('[');
    return (!tag || tag === this.tagName) && [...selector.matchAll(/\[([^\]]+)\]/g)].every(([, attr]) => this.hasAttribute(attr));
  }
  querySelectorAll(selector) { return this.children.flatMap(child => [...(child.matches(selector) ? [child] : []), ...child.querySelectorAll(selector)]); }
  querySelector(selector) { return this.querySelectorAll(selector)[0] || null; }
  closest(selector) { return this.matches(selector) ? this : this.parentElement?.closest(selector); }
  append(...children) { for (const child of children) { child.remove(); child.parentElement = this; this.children.push(child); } }
  before(node) { node.remove(); node.parentElement = this.parentElement; this.parentElement.children.splice(this.parentElement.children.indexOf(this), 0, node); }
  after(node) { node.remove(); node.parentElement = this.parentElement; this.parentElement.children.splice(this.parentElement.children.indexOf(this) + 1, 0, node); }
  remove() { if (this.parentElement) { const siblings = this.parentElement.children; siblings.splice(siblings.indexOf(this), 1); this.parentElement = null; } }
  replaceChildren(...children) { this.children.forEach(child => { child.parentElement = null; }); this.children = []; this.textContent = ''; this.append(...children); }
  focus(options) { this.focusCalls = [...(this.focusCalls || []), options]; }
  addEventListener(type, listener) { this.listeners.set(type, [...(this.listeners.get(type) || []), listener]); }
  dispatch(type, event = {}) { for (const listener of this.listeners.get(type) || []) listener(event); }
}

function setup({ animation = false } = {}) {
  const document = new Element();
  const window = new Element();
  const gallery = new Element();
  const dialog = new Element('dialog');
  const content = new Element();
  const closeButton = new Element('button', { class: 'dialog-close' });
  const status = new Element();
  const links = paths.map((path, i) => {
    const link = new Element('a', { 'data-case': '' });
    link.href = `https://example.test${path}`;
    const heading = new Element('h3');
    heading.textContent = ['1T Home', 'TradeCraft', 'Pavlok'][i];
    link.append(heading, new Element('span', { class: 'case-loading' }));
    return link;
  });
  gallery.append(...links);
  dialog.append(closeButton, content);
  document.append(gallery, dialog, status);
  document.title = 'The workshop';
  document.getElementById = id => ({ 'case-dialog': dialog, 'case-content': content, 'navigation-status': status })[id];
  document.createElement = tag => new Element(tag);
  document.importNode = article => article;
  dialog.open = false;
  dialog.showModal = () => { dialog.open = true; };
  dialog.close = () => { dialog.open = false; };
  const animations = [];
  if (animation) content.animate = () => {
    const reveal = { cancelCalls: 0, cancel() { this.cancelCalls += 1; }, finished: Promise.resolve() };
    animations.push(reveal);
    return reveal;
  };
  const motion = new Element();
  motion.matches = false;
  const location = { origin: 'https://example.test', href: 'https://example.test/#work', assigned: [], assign(url) { this.assigned.push(url); } };
  const entries = [{ state: null, url: location.href }];
  let cursor = 0;
  const history = {
    get state() { return entries[cursor].state; },
    backCalls: 0,
    replaceState(state, _, url) { entries[cursor] = { state, url }; location.href = url; },
    pushState(state, _, url) { entries.splice(cursor + 1); entries.push({ state, url }); cursor += 1; location.href = url; },
    back() { this.backCalls += 1; },
    traverse(delta) { cursor += delta; location.href = entries[cursor].url; window.dispatch('popstate', { state: this.state }); },
  };
  const requests = [];
  const timers = new Map();
  let nextTimer = 0;
  const scrolls = [];
  const context = {
    document, window, history, location, URL, AbortController, scrollY: 460,
    scrollTo: position => scrolls.push(position),
    matchMedia: () => motion,
    setTimeout: (callback, delay) => { timers.set(++nextTimer, { callback, delay }); return nextTimer; },
    clearTimeout: id => timers.delete(id),
    fetch: (url, options) => { const pending = deferred(); requests.push({ url, ...options, ...pending }); return pending.promise; },
    DOMParser: class {
      parseFromString(value) {
        const data = JSON.parse(value);
        const article = data.article === false ? null : new Element('article', { 'data-case-article': '' });
        if (article && data.heading !== false) { const heading = new Element('h1'); heading.textContent = data.title; article.append(heading); }
        return { title: data.title, querySelector: () => article };
      }
    },
  };
  vm.runInNewContext(`${source}\ninitCaseNavigation();`, context);
  function click(link, extra = {}) {
    const event = { target: link, button: 0, preventDefault() { this.defaultPrevented = true; }, ...extra };
    document.dispatch('click', event);
    return event;
  }
  function respond(index, data = {}) { requests[index].resolve({ ok: true, text: async () => JSON.stringify({ title: `Case ${index}`, ...data }) }); }
  return { document, window, dialog, content, closeButton, status, links, gallery, history, entries, location, requests, timers, scrolls, motion, animations, context, click, respond };
}

test('pending selection leaves history alone, exposes a sibling direct link, and reuses a duplicate request', async () => {
  const app = setup();
  app.click(app.links[0]);
  app.click(app.links[0]);
  assert.equal(app.requests.length, 1);
  assert.equal(app.entries.length, 1);
  assert.equal(app.dialog.open, false);
  assert.equal(app.links[0].getAttribute('aria-busy'), 'true');
  assert.equal(app.status.textContent, 'Opening 1T Home…');
  const direct = app.links[0].parentElement.querySelector('.direct-case-link');
  assert.equal(direct.href, app.links[0].href);
  assert.equal(direct.parentElement, app.links[0].parentElement);
  assert.equal(app.gallery.children.length, 3);
  const event = app.click(direct);
  assert.equal(event.defaultPrevented, undefined, 'direct navigation keeps its native default action');
  assert.equal(app.requests[0].signal.aborted, true);
  app.respond(0);
  await flush();
  assert.equal(app.dialog.open, false, 'an abandoned request cannot open after the direct link is followed');
  assert.equal(app.location.assigned.length, 0);
});

test('a stale successful response cannot replace the latest selection or add a history entry', async () => {
  const app = setup();
  app.click(app.links[0]);
  app.click(app.links[1]);
  assert.equal(app.requests[0].signal.aborted, true);
  app.respond(1, { title: 'TradeCraft' });
  await flush();
  app.respond(0, { title: 'Stale 1T Home' });
  await flush();
  assert.equal(app.document.title, 'TradeCraft');
  assert.equal(app.content.querySelector('h1').textContent, 'TradeCraft');
  assert.equal(app.entries.length, 2);
  assert.equal(app.location.href, app.links[1].href);
  assert.equal(app.location.assigned.length, 0);
});

test('failures and malformed articles follow the ordinary case URL without adding an empty dialog', async t => {
  for (const failure of ['network', 'http', 'article', 'heading']) {
    await t.test(failure, async () => {
      const app = setup();
      app.click(app.links[0]);
      if (failure === 'network') app.requests[0].reject(new Error('offline'));
      else if (failure === 'http') app.requests[0].resolve({ ok: false, status: 503 });
      else app.respond(0, { [failure]: false });
      await flush();
      assert.deepEqual(app.location.assigned, [app.links[0].href]);
      assert.equal(app.dialog.open, false);
      assert.equal(app.entries.length, 1);
      assert.equal(app.links[0].hasAttribute('aria-busy'), false);
    });
  }
});

test('three-second timeout includes the response body even when it ignores abort', async () => {
  const app = setup();
  const body = deferred();
  app.click(app.links[0]);
  app.requests[0].resolve({ ok: true, text: () => body.promise });
  await flush();
  assert.equal([...app.timers.values()][0].delay, 3000);
  for (const timer of [...app.timers.values()]) timer.callback();
  await flush();
  assert.deepEqual(app.location.assigned, [app.links[0].href]);
  assert.equal(app.requests[0].signal.aborted, true);
  body.resolve(JSON.stringify({ title: 'Too late' }));
  await flush();
  assert.equal(app.dialog.open, false);
  assert.equal(app.entries.length, 1);
  assert.equal(app.location.assigned.length, 1);
});

test('a superseded failure cannot send the visitor away from the latest successful case', async () => {
  const app = setup();
  app.click(app.links[0]);
  app.click(app.links[2]);
  app.respond(1, { title: 'Pavlok' });
  await flush();
  app.requests[0].reject(new Error('late failure'));
  await flush();
  assert.equal(app.document.title, 'Pavlok');
  assert.equal(app.dialog.open, true);
  assert.equal(app.location.assigned.length, 0);
});

test('ordinary fragment navigation cancels pending case selection without taking over focus or scrolling', async () => {
  const app = setup();
  app.click(app.links[0]);
  const offer = new Element('a');
  offer.href = 'https://example.test/#offers';
  const event = app.click(offer);
  assert.equal(event.defaultPrevented, undefined);
  app.requests[0].reject(new Error('abort'));
  await flush();
  assert.equal(app.location.assigned.length, 0);
  assert.equal(app.status.textContent, '');
  app.window.dispatch('popstate', { state: null });
  assert.equal(app.scrolls.length, 0);
  assert.equal(app.links[0].focusCalls, undefined);
});

test('Back, Forward, and repeated Close restore the original case link, title, and scroll without refetching', async () => {
  const app = setup();
  app.click(app.links[1]);
  app.respond(0, { title: 'TradeCraft' });
  await flush();
  assert.equal(app.dialog.open, true);
  assert.equal(app.closeButton.focusCalls.length, 1);
  app.history.traverse(-1);
  assert.equal(app.dialog.open, false);
  assert.equal(app.document.title, 'The workshop');
  assert.equal(app.scrolls.at(-1).top, 460);
  assert.equal(app.links[1].focusCalls.length, 1);
  app.history.traverse(1);
  await flush();
  assert.equal(app.dialog.open, true);
  assert.equal(app.document.title, 'TradeCraft');
  assert.equal(app.requests.length, 1, 'Forward uses the successfully loaded canonical article');
  app.closeButton.dispatch('click');
  app.closeButton.dispatch('click');
  assert.equal(app.history.backCalls, 1);
  app.history.traverse(-1);
  assert.equal(app.dialog.open, false);
  assert.equal(app.links[1].focusCalls.length, 2);
});

test('modified, targeted, and download links retain ordinary behavior', () => {
  const app = setup();
  for (const modifier of ['metaKey', 'ctrlKey', 'shiftKey', 'altKey']) assert.equal(app.click(app.links[0], { [modifier]: true }).defaultPrevented, undefined);
  app.links[0].target = '_blank';
  assert.equal(app.click(app.links[0]).defaultPrevented, undefined);
  app.links[0].target = '';
  app.links[0].setAttribute('download', 'story.html');
  assert.equal(app.click(app.links[0]).defaultPrevented, undefined);
  assert.equal(app.requests.length, 0);
});

test('optional animation failure does not undo successful navigation', async () => {
  const app = setup();
  app.content.animate = () => { throw new Error('animation unavailable'); };
  app.click(app.links[0]);
  app.respond(0);
  await flush();
  assert.equal(app.dialog.open, true);
  assert.equal(app.entries.length, 2);
  assert.equal(app.location.assigned.length, 0);
});

test('hiding the page or enabling reduced motion cancels an active reveal', async () => {
  const app = setup({ animation: true });
  app.click(app.links[0]);
  app.respond(0);
  await flush();
  app.document.hidden = true;
  app.document.dispatch('visibilitychange');
  assert.equal(app.animations[0].cancelCalls, 1);
  app.motion.matches = true;
  app.motion.dispatch('change');
  assert.equal(app.animations[0].cancelCalls, 2);
  assert.equal(app.dialog.open, true);
});

test('leaving the page clears pending UI so a restored page is usable', async () => {
  const app = setup();
  app.click(app.links[0]);
  app.window.dispatch('pagehide');
  assert.equal(app.links[0].hasAttribute('aria-busy'), false);
  assert.equal(app.document.querySelector('.direct-case-link'), null);
  app.respond(0);
  await flush();
  assert.equal(app.dialog.open, false);
  assert.equal(app.location.assigned.length, 0);
  app.click(app.links[0]);
  assert.equal(app.requests.length, 2);
});
