import { HERO_MOTION, HERO_STYLE_PROPERTIES } from "./constants.js";

/** @returns {import("./types.js").HeroNodes | null} */
export function findHeroNodes() {
  const section = document.querySelector("#home");
  const stage = document.querySelector(".hero-stage");
  const title = document.querySelector(".hero-copy h1");
  const header = document.querySelector(".site-header");
  const cards = Array.from(document.querySelectorAll(".hero-panel article"));
  const elements = [section, stage, title, header, ...cards];
  if (!elements.every((element) => element instanceof HTMLElement)) return null;
  if (cards.length === 0) return null;
  return /** @type {import("./types.js").HeroNodes} */ ({ section, stage, title, header, cards });
}

/** @param {import("./types.js").HeroNodes} nodes @returns {import("./types.js").HeroGeometry} */
export function measureHero(nodes) {
  const top = nodes.header.offsetHeight;
  const height = window.innerHeight - top;
  const range = window.innerHeight * HERO_MOTION.scrollScreens;
  nodes.section.style.setProperty("--hero-sticky-top", `${top}px`);
  nodes.section.style.setProperty("--hero-stage-height", `${height}px`);
  nodes.section.style.setProperty("--hero-scroll-distance", `${range}px`);
  return {
    start: nodes.section.getBoundingClientRect().top + window.scrollY - top,
    range,
  };
}

/** @param {import("./types.js").HeroNodes} nodes @returns {void} */
export function resetHero(nodes) {
  HERO_STYLE_PROPERTIES.forEach((property) => nodes.section.style.removeProperty(property));
  nodes.cards.forEach((card) => {
    card.style.removeProperty("--card-opacity");
    card.style.removeProperty("--card-lift");
    card.style.removeProperty("--card-scale");
    card.style.removeProperty("--card-angle");
    card.style.removeProperty("--card-blur");
  });
}
