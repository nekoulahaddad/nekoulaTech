import { SCROLL_EFFECTS } from "./constants.js";
import { getProgress } from "./math.js";

/** @returns {import("./types.js").ViewportController} */
export function createViewportEffects() {
  const hero = document.querySelector("#home");
  const progress = document.querySelector(".scroll-progress");
  return {
    measure: () => measureViewport(hero),
    render: (geometry, scrollY) => {
      if (progress instanceof HTMLElement) {
        const pageProgress = getProgress(scrollY, geometry.scrollRange);
        progress.style.setProperty("--page-progress", String(pageProgress));
      }
      if (!(hero instanceof HTMLElement)) return;
      renderHero(hero, geometry, scrollY);
    },
  };
}

/** @param {Element | null} hero @returns {import("./types.js").ViewportGeometry} */
function measureViewport(hero) {
  const heroHeight = hero instanceof HTMLElement ? hero.offsetHeight : 0;
  return {
    scrollRange: document.documentElement.scrollHeight - window.innerHeight,
    heroHeight,
  };
}

/**
 * @param {HTMLElement} hero
 * @param {import("./types.js").ViewportGeometry} geometry
 * @param {number} scrollY
 * @returns {void}
 */
function renderHero(hero, geometry, scrollY) {
  const style = hero.style;
  const heroProgress = getProgress(scrollY, geometry.heroHeight);
  const copyShift = heroProgress * SCROLL_EFFECTS.heroCopyShift;
  const panelShift = heroProgress * SCROLL_EFFECTS.heroPanelShift;
  const panelAngle = heroProgress * SCROLL_EFFECTS.heroPanelAngle;
  style.setProperty("--hero-copy-shift", `${copyShift}px`);
  style.setProperty("--hero-panel-shift", `${panelShift}px`);
  style.setProperty("--hero-panel-angle", `${panelAngle}deg`);
}
