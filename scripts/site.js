import { initWorkshopDemo } from "./workshop-demo.js";
import { initCaseNavigation } from "./workshop-navigation.js";

const motion = matchMedia("(prefers-reduced-motion: reduce)");
const demoHost = document.getElementById("workflow-stage");
const demo = demoHost ? initWorkshopDemo(demoHost) : null;
if (demo)
  demoHost.querySelector(".workflow-fallback")?.setAttribute("hidden", "");
initCaseNavigation();

const hero = document.querySelector(".hero");
const art = document.querySelector(".hero-art");
let pointerFrame = 0;
let heroVisible = true;
let pointer = { x: 0, y: 0 };
function settlePointer() {
  cancelAnimationFrame(pointerFrame);
  pointerFrame = 0;
  art?.style.removeProperty("--pointer-x");
  art?.style.removeProperty("--pointer-y");
}
function updatePointer() {
  pointerFrame = 0;
  if (!art || motion.matches || !heroVisible || document.hidden) return;
  const box = art.getBoundingClientRect();
  const x = ((pointer.x - box.left) / box.width - 0.5) * 9;
  const y = ((pointer.y - box.top) / box.height - 0.5) * 9;
  art.style.setProperty("--pointer-x", `${x.toFixed(2)}px`);
  art.style.setProperty("--pointer-y", `${y.toFixed(2)}px`);
}
art?.addEventListener("pointermove", (event) => {
  if (event.pointerType !== "mouse" || motion.matches || innerWidth <= 760)
    return;
  pointer = { x: event.clientX, y: event.clientY };
  if (!pointerFrame) pointerFrame = requestAnimationFrame(updatePointer);
});
art?.addEventListener("pointerleave", settlePointer);
motion.addEventListener("change", settlePointer);
function updateHeroLifecycle() {
  hero?.classList.toggle("is-paused", document.hidden || !heroVisible);
  if (document.hidden || !heroVisible) settlePointer();
}
document.addEventListener("visibilitychange", updateHeroLifecycle);
if (hero && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(([entry]) => {
    heroVisible = entry.isIntersecting;
    updateHeroLifecycle();
  });
  observer.observe(hero);
}

window.addEventListener("pagehide", settlePointer);
