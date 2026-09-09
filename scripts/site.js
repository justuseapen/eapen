import { initWorkshopDemo } from "./workshop-demo.js";
import { initCaseNavigation } from "./workshop-navigation.js";

const demoHost = document.getElementById("workflow-stage");
const demo = demoHost ? initWorkshopDemo(demoHost) : null;
if (demo)
  demoHost.querySelector(".workflow-fallback")?.setAttribute("hidden", "");
initCaseNavigation();
