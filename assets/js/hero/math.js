import { clampProgress, getProgress } from "../scroll/math.js";
import { HERO_MOTION } from "./constants.js";

/** @param {number} progress @returns {number} */
function easeOut(progress) {
  return 1 - Math.pow(1 - progress, 3);
}

/** @param {number} progress @param {number} index @returns {import("./types.js").CardFrame} */
export function getHeroCardFrame(progress, index) {
  const start = HERO_MOTION.cardStart + index * HERO_MOTION.cardStagger;
  const reveal = easeOut(getProgress(progress - start, HERO_MOTION.cardDuration));
  const remaining = 1 - reveal;
  return {
    opacity: reveal,
    lift: remaining * HERO_MOTION.cardLift,
    scale: 1 - remaining * HERO_MOTION.cardScale,
    angle: remaining * HERO_MOTION.cardAngle,
    blur: remaining * HERO_MOTION.cardBlur,
  };
}

/** @param {number} progress @param {number} cardCount @returns {import("./types.js").HeroFrame} */
export function getHeroFrame(progress, cardCount) {
  const value = clampProgress(progress);
  const titleProgress = easeOut(getProgress(value - HERO_MOTION.titleStart, HERO_MOTION.titleDuration));
  const orbitProgress = easeOut(getProgress(value, HERO_MOTION.cardStart + HERO_MOTION.cardDuration * cardCount));
  const cueProgress = getProgress(value - HERO_MOTION.cueFadeStart, HERO_MOTION.cueFadeDuration);
  return {
    progress: value,
    titleScale: 1 - titleProgress * HERO_MOTION.titleScale,
    copyLift: -titleProgress * HERO_MOTION.copyLift,
    orbitRotation: value * HERO_MOTION.orbitRotation,
    orbitScale: 1 + orbitProgress * HERO_MOTION.orbitScale,
    orbitOpacity: 1 - orbitProgress * HERO_MOTION.orbitFade,
    cueOpacity: 1 - cueProgress,
    cards: Array.from({ length: cardCount }, (_, index) => getHeroCardFrame(value, index)),
  };
}
