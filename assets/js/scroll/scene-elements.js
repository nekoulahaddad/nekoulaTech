import { SCROLL_EFFECTS } from "./constants.js";
import { createAnchors } from "./math.js";

/** @returns {import("./types.js").SceneNodes | null} */
export function findSceneNodes() {
  const section = document.querySelector("#how-we-work");
  const list = document.querySelector(".process-steps");
  const counter = document.querySelector(".process-count");
  const header = document.querySelector(".site-header");
  const steps = Array.from(document.querySelectorAll(".process-step"));
  const cards = Array.from(document.querySelectorAll(".process-card"));
  const elements = [section, list, counter, header, ...steps, ...cards];
  if (!elements.every((element) => element instanceof HTMLElement)) return null;
  if (steps.length === 0 || steps.length !== cards.length) return null;
  return /** @type {import("./types.js").SceneNodes} */ ({
    section, list, counter, header, steps, cards,
  });
}

/** @param {import("./types.js").SceneNodes} nodes @returns {import("./types.js").SceneGeometry} */
export function measureScene(nodes) {
  const stickyTop = nodes.header.offsetHeight + SCROLL_EFFECTS.headerGap;
  nodes.section.style.setProperty("--scene-top", `${stickyTop}px`);
  const style = getComputedStyle(nodes.list);
  const nextStep = nodes.steps[1];
  const gap = nextStep === undefined ? 0 : Number.parseFloat(getComputedStyle(nextStep).marginTop);
  const padding = Number.parseFloat(style.paddingTop);
  const start = nodes.list.getBoundingClientRect().top + window.scrollY + padding;
  const heights = nodes.steps.map((step) => step.offsetHeight);
  return {
    anchors: createAnchors(heights, start, gap),
    stickyTop,
    viewportHeight: window.innerHeight,
  };
}

/** @param {import("./types.js").SceneNodes} nodes @returns {void} */
export function resetScene(nodes) {
  nodes.section.style.removeProperty("--scene-progress");
  nodes.section.style.removeProperty("--scene-top");
  nodes.counter.textContent = "01";
  nodes.cards.forEach((card) => {
    card.style.removeProperty("--stack-scale");
    card.style.removeProperty("--stack-lift");
    card.style.removeProperty("--stack-angle");
    card.classList.remove("is-current");
  });
}
