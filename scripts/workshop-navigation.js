const CASE_PATHS = new Set([
  "/work/1t-home.html",
  "/work/tradecraft.html",
  "/work/pavlok.html",
]);

export function initCaseNavigation() {
  const dialog = document.getElementById("case-dialog");
  const content = document.getElementById("case-content");
  const closeButton = dialog?.querySelector(".dialog-close");
  const liveStatus = document.getElementById("navigation-status");
  if (
    !dialog ||
    !content ||
    !closeButton ||
    typeof dialog.showModal !== "function"
  )
    return;
  const cache = new Map();
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  const homeTitle = document.title;
  let controller;
  let requestId = 0;
  let pendingHref;
  let directLink;
  let activeLink;
  let originScroll = scrollY;
  let originHref = location.href;
  let reveal;
  let closing = false;

  history.replaceState(
    { ...history.state, workshop: true, view: "desk", scrollY },
    "",
    location.href,
  );
  // Keep fallback links beside their cards inside a single portfolio grid cell.
  document.querySelectorAll("a[data-case]").forEach((link) => {
    if (link.parentElement.classList.contains("project-entry")) return;
    const wrapper = document.createElement("div");
    wrapper.className = "project-entry";
    link.before(wrapper);
    wrapper.append(link);
  });

  function clearLoading() {
    document.querySelectorAll("[data-case][aria-busy]").forEach((link) => {
      link.removeAttribute("aria-busy");
      link.querySelector(".case-loading")?.replaceChildren();
    });
    directLink?.remove();
    directLink = null;
    pendingHref = null;
    if (liveStatus) liveStatus.textContent = "";
  }

  function cancelRequest() {
    // Invalidate first: abort rejection or an already-resolved body must not navigate.
    requestId += 1;
    controller?.abort();
    controller = null;
    clearLoading();
  }

  function markLoading(link, target) {
    pendingHref = target.href;
    const name = link?.querySelector("h3")?.textContent || "project";
    if (liveStatus) liveStatus.textContent = `Opening ${name}…`;
    if (!link) return;
    link.setAttribute("aria-busy", "true");
    const label = link.querySelector(".case-loading");
    if (label) label.textContent = `Opening ${name}…`;
    // A separate native anchor remains usable throughout the request.
    directLink = document.createElement("a");
    directLink.className = "direct-case-link";
    directLink.href = target.href;
    directLink.textContent = "Open page directly";
    directLink.setAttribute("aria-label", `Open ${name} page directly`);
    link.after(directLink);
  }

  function closeView() {
    closing = false;
    reveal?.cancel();
    if (!dialog.open) return;
    dialog.close();
    document.title = homeTitle;
    scrollTo({
      top: history.state?.scrollY ?? originScroll,
      behavior: "instant",
    });
    activeLink?.focus({ preventScroll: true });
  }

  function requestClose() {
    if (closing) return;
    cancelRequest();
    if (history.state?.workshop && history.state.view === "case") {
      closing = true;
      history.back();
    } else closeView();
  }

  async function loadCase(target, signal) {
    const response = await fetch(target.href, { signal });
    if (!response.ok)
      throw new Error(`Case request failed: ${response.status}`);
    const html = new DOMParser().parseFromString(
      await response.text(),
      "text/html",
    );
    const article = html.querySelector("[data-case-article]");
    if (!article || !article.querySelector("h1"))
      throw new Error("Invalid case article");
    article.querySelectorAll("script").forEach((script) => script.remove());
    return { article, title: html.title };
  }

  async function openCase(url, { link, push = true } = {}) {
    const target = new URL(url, location.origin);
    if (target.origin !== location.origin || !CASE_PATHS.has(target.pathname))
      return;
    if (pendingHref === target.href) return;
    cancelRequest();
    const id = requestId;
    controller = new AbortController();
    const currentController = controller;
    if (link) activeLink = link;
    if (push && !dialog.open) {
      originScroll = scrollY;
      originHref = location.href;
    }
    markLoading(link, target);
    let timeout;
    try {
      let entry = cache.get(target.pathname);
      if (!entry) {
        // Bound the entire response, including a stalled body. The timeout still
        // wins if a fetch implementation or service worker does not honor abort.
        entry = await Promise.race([
          loadCase(target, currentController.signal),
          new Promise((_, reject) => {
            timeout = setTimeout(() => {
              currentController.abort();
              reject(new Error("Case request timed out"));
            }, 3000);
          }),
        ]);
      }
      if (id !== requestId) return;
      cache.set(target.pathname, entry);
      clearTimeout(timeout);
      controller = null;
      clearLoading();
      reveal?.cancel();
      content.replaceChildren(document.importNode(entry.article, true));
      dialog.setAttribute(
        "aria-label",
        entry.article.querySelector("h1").textContent,
      );
      if (push) {
        if (!dialog.open)
          history.replaceState(
            { ...history.state, scrollY: originScroll },
            "",
            originHref,
          );
        history.pushState(
          {
            workshop: true,
            view: "case",
            path: target.href,
            scrollY: originScroll,
          },
          "",
          target.href,
        );
      }
      if (!dialog.open) dialog.showModal();
      dialog.scrollTop = 0;
      document.title = entry.title;
      closeButton.focus({ preventScroll: true });
      // Navigation is complete before optional choreography starts.
      if (
        !motion.matches &&
        !document.hidden &&
        typeof content.animate === "function"
      ) {
        try {
          reveal = content.animate(
            [
              { opacity: 0, transform: "translateY(18px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            { duration: 420, easing: "cubic-bezier(.2,.75,.25,1)" },
          );
          reveal.finished.catch(() => {});
        } catch {
          /* An unavailable animation must not turn a successful load into a navigation failure. */
        }
      }
    } catch {
      if (id !== requestId) return;
      cancelRequest();
      location.assign(target.href);
    } finally {
      clearTimeout(timeout);
    }
  }

  document.addEventListener("click", (event) => {
    const link = event.target.closest?.("a");
    if (
      !link ||
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      link.target ||
      link.hasAttribute("download")
    )
      return;
    const target = new URL(link.href);
    if (
      !link.hasAttribute("data-case") ||
      !CASE_PATHS.has(target.pathname) ||
      target.origin !== location.origin
    ) {
      // Following an offer, a fragment, or the direct link abandons pending work.
      if (pendingHref) cancelRequest();
      return;
    }
    event.preventDefault();
    openCase(target.href, { link });
  });
  closeButton.addEventListener("click", requestClose);
  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    requestClose();
  });
  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom
    )
      requestClose();
  });
  window.addEventListener("popstate", (event) => {
    cancelRequest();
    closing = false;
    if (event.state?.workshop && event.state.view === "case") {
      const target = new URL(event.state.path, location.origin);
      originScroll = event.state.scrollY ?? originScroll;
      activeLink = [...document.querySelectorAll("a[data-case]")].find(
        (link) => new URL(link.href).pathname === target.pathname,
      );
      openCase(target.href, { link: activeLink, push: false });
    } else closeView();
  });
  motion.addEventListener("change", () => {
    if (motion.matches) reveal?.cancel();
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) reveal?.cancel();
  });
  window.addEventListener("pagehide", () => {
    cancelRequest();
    reveal?.cancel();
  });
}
