import { HERO_QUERY } from "../hero/constants.js";
import { createHeroScene } from "../hero/controller.js";
import { REDUCED_MOTION_QUERY, SCENE_QUERY } from "./constants.js";
import { createProcessScene } from "./scene.js";
import { createScrollScheduler } from "./scheduler.js";
import { createViewportEffects } from "./viewport.js";

const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY);
const sceneViewport = window.matchMedia(SCENE_QUERY);
const heroViewport = window.matchMedia(HERO_QUERY);
const hero = createHeroScene();
const scene = createProcessScene();
const viewport = createViewportEffects();

/** @returns {import("./types.js").ScrollGeometry} */
function measureExperience() {
  const heroGeometry = hero?.measure() ?? null;
  return { hero: heroGeometry, scene: scene?.measure() ?? null, viewport: viewport.measure() };
}

/** @param {import("./types.js").ScrollGeometry} geometry @returns {void} */
function renderExperience(geometry) {
  if (reducedMotion.matches) return;
  const scrollY = window.scrollY;
  viewport.render(geometry.viewport, scrollY);
  hero?.render(geometry.hero, scrollY);
  scene?.render(geometry.scene, scrollY);
}

const loop = createScrollScheduler(measureExperience, renderExperience);

function configureExperience() {
  const hasMotion = !reducedMotion.matches;
  const hasScene = hasMotion && sceneViewport.matches;
  document.documentElement.classList.toggle("has-scroll-fx", hasMotion);
  hero?.configure(heroViewport.matches, hasMotion);
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
  heroViewport.addEventListener("change", configureExperience);
  const languageObserver = new MutationObserver(loop.invalidate);
  languageObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["lang", "dir"] });
  if ("ResizeObserver" in window) {
    const observer = new ResizeObserver(loop.invalidate);
    observer.observe(document.body);
  }
  if (document.fonts) document.fonts.addEventListener("loadingdone", loop.invalidate);
  configureExperience();
}

initializeScrollExperience();
