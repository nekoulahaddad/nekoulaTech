import { getProgress } from "../scroll/math.js";
import { findHeroNodes, measureHero, resetHero } from "./elements.js";
import { getHeroFrame } from "./math.js";
import { renderHeroFrame } from "./render.js";
import { createHeroTitle } from "./title.js";

/** @returns {import("./types.js").HeroController | null} */
export function createHeroScene() {
  const nodes = findHeroNodes();
  if (nodes === null) return null;
  const title = createHeroTitle(nodes.title);
  let state = { isPinned: false, hasMotion: false };
  return {
    configure(shouldPin, hasMotion) {
      state = { isPinned: shouldPin && hasMotion, hasMotion };
      nodes.section.classList.toggle("is-hero-scene", state.isPinned);
      nodes.section.classList.toggle("has-hero-motion", hasMotion);
      if (state.isPinned) nodes.cards.forEach((card) => card.classList.add("visible"));
      if (!state.isPinned) resetHero(nodes);
      if (!hasMotion) title.reset();
    },
    measure() {
      if (!state.hasMotion) return null;
      const geometry = state.isPinned ? measureHero(nodes) : null;
      title.update();
      return geometry;
    },
    render(geometry, scrollY) {
      if (geometry === null) return;
      const progress = getProgress(scrollY - geometry.start, geometry.range);
      renderHeroFrame(nodes, getHeroFrame(progress, nodes.cards.length));
    },
  };
}
