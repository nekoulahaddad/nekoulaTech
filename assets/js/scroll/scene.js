import { SCROLL_EFFECTS } from "./constants.js";
import { getActiveStep, getSceneProgress, getStackDepth } from "./math.js";
import { findSceneNodes, measureScene, resetScene } from "./scene-elements.js";

/** @returns {import("./types.js").SceneController | null} */
export function createProcessScene() {
  const nodes = findSceneNodes();
  if (nodes === null) return null;
  let isSceneEnabled = false;
  nodes.cards.forEach((card, index) => {
    card.dataset.step = String(index + 1).padStart(2, "0");
  });
  return {
    configure(isEnabled) {
      if (isSceneEnabled === isEnabled) return;
      isSceneEnabled = isEnabled;
      nodes.section.classList.toggle("is-scroll-scene", isEnabled);
      if (isEnabled) {
        nodes.steps.forEach((step) => step.classList.add("visible"));
        return;
      }
      resetScene(nodes);
    },
    measure: () => isSceneEnabled ? measureScene(nodes) : null,
    render: (geometry, scrollY) => {
      if (geometry === null) return;
      renderScene(nodes, geometry, scrollY);
    },
  };
}

/**
 * @param {import("./types.js").SceneNodes} nodes
 * @param {import("./types.js").SceneGeometry} geometry
 * @param {number} scrollY
 * @returns {void}
 */
function renderScene(nodes, geometry, scrollY) {
  const position = scrollY + geometry.stickyTop;
  const progress = getSceneProgress(geometry.anchors, position);
  const activePosition = scrollY + geometry.viewportHeight * SCROLL_EFFECTS.activeThreshold;
  const activeIndex = getActiveStep(geometry.anchors, activePosition);
  const counter = String(activeIndex + 1).padStart(2, "0");
  nodes.section.style.setProperty("--scene-progress", String(progress));
  if (nodes.counter.textContent !== counter) nodes.counter.textContent = counter;
  nodes.cards.forEach((card, index) => {
    const nextAnchor = geometry.anchors[index + 1];
    const distance = geometry.viewportHeight * SCROLL_EFFECTS.overlapDistance;
    const depth = getStackDepth(nextAnchor, position, distance);
    renderStackCard(card, depth, index === activeIndex);
  });
}

/** @param {HTMLElement} card @param {number} depth @param {boolean} isCurrent @returns {void} */
function renderStackCard(card, depth, isCurrent) {
  const scale = 1 - depth * SCROLL_EFFECTS.stackScale;
  const lift = -depth * SCROLL_EFFECTS.stackLift;
  const angle = -depth * SCROLL_EFFECTS.stackAngle;
  card.style.setProperty("--stack-scale", String(scale));
  card.style.setProperty("--stack-lift", `${lift}px`);
  card.style.setProperty("--stack-angle", `${angle}deg`);
  card.classList.toggle("is-current", isCurrent);
}
