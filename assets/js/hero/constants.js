export const HERO_QUERY = "(min-width: 900px) and (min-height: 560px)";
export const HERO_STYLE_PROPERTIES = Object.freeze([
  "--hero-sticky-top", "--hero-stage-height", "--hero-scroll-distance",
  "--hero-progress", "--title-scale", "--copy-lift", "--orbit-rotation",
  "--orbit-scale", "--orbit-opacity", "--cue-opacity",
]);
export const HERO_MOTION = Object.freeze({
  scrollScreens: 0.9,
  titleStart: 0.02,
  titleDuration: 0.36,
  titleScale: 0.1,
  copyLift: 24,
  cardStart: 0.1,
  cardStagger: 0.18,
  cardDuration: 0.22,
  cardLift: 100,
  cardScale: 0.1,
  cardAngle: 12,
  cardBlur: 6,
  orbitRotation: 48,
  orbitScale: 0.16,
  orbitFade: 0.86,
  cueFadeStart: 0.7,
  cueFadeDuration: 0.2,
  lineDelay: 90,
  lineTolerance: 2,
});
