import { createTitleLines, measureTitleLines } from "./title-lines.js";

/** @param {HTMLElement} title @returns {{ update: () => void, reset: () => void }} */
export function createHeroTitle(title) {
  let previousText = "";
  let previousKey = "";
  return {
    update() {
      const text = title.textContent?.trim() ?? "";
      if (text.length === 0) return;
      const key = getTitleKey(title, text);
      const hasLines = title.firstElementChild?.classList.contains("hero-title-line") === true;
      if (key === previousKey && hasLines) return;
      const hasEnteringLines = title.querySelector(".is-entering") !== null;
      const shouldAnimate = text !== previousText || hasEnteringLines;
      const lines = measureTitleLines(title, text);
      title.replaceChildren(createTitleLines(lines, shouldAnimate));
      previousText = text;
      previousKey = key;
    },
    reset() {
      title.textContent = title.textContent?.trim() ?? "";
      previousText = "";
      previousKey = "";
    },
  };
}

/** @param {HTMLElement} title @param {string} text @returns {string} */
function getTitleKey(title, text) {
  const style = getComputedStyle(title);
  return [title.clientWidth, style.font, style.letterSpacing, document.fonts.status, text].join("|");
}
