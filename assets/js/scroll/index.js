import { DEPTH_QUERY, REDUCED_MOTION_QUERY, SCENE_QUERY } from "./constants.js";
import { createProcessScene } from "./scene.js";
import { createScrollScheduler } from "./scheduler.js";
import { createViewportEffects } from "./viewport.js";

const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY);
const sceneViewport = window.matchMedia(SCENE_QUERY);
const depthViewport = window.matchMedia(DEPTH_QUERY);
const scene = createProcessScene();
const viewport = createViewportEffects();

/** @returns {import("./types.js").ScrollGeometry} */
function measureExperience() {
  return { scene: scene?.measure() ?? null, viewport: viewport.measure() };
}

/** @param {import("./types.js").ScrollGeometry} geometry @returns {void} */
function renderExperience(geometry) {
  if (reducedMotion.matches) return;
  const scrollY = window.scrollY;
  viewport.render(geometry.viewport, scrollY);
  scene?.render(geometry.scene, scrollY);
}

const loop = createScrollScheduler(measureExperience, renderExperience);

function configureExperience() {
  const hasMotion = !reducedMotion.matches;
  const hasDepth = hasMotion && depthViewport.matches;
  const hasScene = hasMotion && sceneViewport.matches;
  document.documentElement.classList.toggle("has-scroll-fx", hasMotion);
  document.documentElement.classList.toggle("has-depth-fx", hasDepth);
  scene?.configure(hasScene);
  loop.invalidate();
}

function initializeScrollExperience() {
  window.addEventListener("scroll", loop.request, { passive: true });
  window.addEventListener("resize", loop.invalidate, { passive: true });
  window.addEventListener("load", loop.invalidate, { once: true });
  window.addEventListener("pageshow", loop.invalidate);
  reducedMotion.addEventListener("change", configureExperience);
  sceneViewport.addEventListener("change", configureExperience);
  depthViewport.addEventListener("change", configureExperience);
  if ("ResizeObserver" in window) {
    const observer = new ResizeObserver(loop.invalidate);
    observer.observe(document.body);
  }
  if (document.fonts) document.fonts.addEventListener("loadingdone", loop.invalidate);
  configureExperience();
}

initializeScrollExperience();
