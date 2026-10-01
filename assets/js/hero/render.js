/** @param {import("./types.js").HeroNodes} nodes @param {import("./types.js").HeroFrame} frame @returns {void} */
export function renderHeroFrame(nodes, frame) {
  const style = nodes.section.style;
  style.setProperty("--hero-progress", String(frame.progress));
  style.setProperty("--title-scale", String(frame.titleScale));
  style.setProperty("--copy-lift", `${frame.copyLift}px`);
  style.setProperty("--orbit-rotation", `${frame.orbitRotation}deg`);
  style.setProperty("--orbit-scale", String(frame.orbitScale));
  style.setProperty("--orbit-opacity", String(frame.orbitOpacity));
  style.setProperty("--cue-opacity", String(frame.cueOpacity));
  nodes.cards.forEach((card, index) => {
    const cardFrame = frame.cards[index];
    if (cardFrame === undefined) return;
    card.style.setProperty("--card-opacity", String(cardFrame.opacity));
    card.style.setProperty("--card-lift", `${cardFrame.lift}px`);
    card.style.setProperty("--card-scale", String(cardFrame.scale));
    card.style.setProperty("--card-angle", `${cardFrame.angle}deg`);
    card.style.setProperty("--card-blur", `${cardFrame.blur}px`);
  });
}
