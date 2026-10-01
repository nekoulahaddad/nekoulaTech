import { getProgress } from "./math.js";

/** @returns {import("./types.js").ViewportController} */
export function createViewportEffects() {
  const progress = document.querySelector(".scroll-progress");
  return {
    measure: measureViewport,
    render: (geometry, scrollY) => {
      if (progress instanceof HTMLElement) {
        const pageProgress = getProgress(scrollY, geometry.scrollRange);
        progress.style.setProperty("--page-progress", String(pageProgress));
      }
    },
  };
}

/** @returns {import("./types.js").ViewportGeometry} */
function measureViewport() {
  return {
    scrollRange: document.documentElement.scrollHeight - window.innerHeight,
  };
}
