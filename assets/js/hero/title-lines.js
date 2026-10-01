import { HERO_MOTION } from "./constants.js";

/** @typedef {{ text: string, top: number }} MeasuredLine */

/** @param {HTMLElement} title @param {string} text @returns {readonly MeasuredLine[]} */
export function measureTitleLines(title, text) {
  const node = document.createTextNode(text);
  title.replaceChildren(node);
  const range = document.createRange();
  const words = Array.from(text.matchAll(/\S+/gu));
  return words.reduce((lines, word) => {
    range.setStart(node, word.index);
    range.setEnd(node, word.index + word[0].length);
    const top = range.getBoundingClientRect().top;
    return appendWord(lines, word[0], top);
  }, /** @type {readonly MeasuredLine[]} */ ([]));
}

/** @param {readonly MeasuredLine[]} lines @param {string} word @param {number} top @returns {readonly MeasuredLine[]} */
function appendWord(lines, word, top) {
  const last = lines[lines.length - 1];
  const isSameLine = last !== undefined && Math.abs(last.top - top) < HERO_MOTION.lineTolerance;
  if (!isSameLine) return [...lines, { text: word, top }];
  return [...lines.slice(0, -1), { text: `${last.text} ${word}`, top }];
}

/** @param {readonly MeasuredLine[]} lines @param {boolean} shouldAnimate @returns {DocumentFragment} */
export function createTitleLines(lines, shouldAnimate) {
  const fragment = document.createDocumentFragment();
  lines.forEach((line, index) => {
    const outer = document.createElement("span");
    const inner = document.createElement("span");
    outer.className = "hero-title-line";
    inner.className = "hero-title-line-inner";
    if (shouldAnimate) inner.classList.add("is-entering");
    inner.addEventListener("animationend", () => inner.classList.remove("is-entering"), { once: true });
    inner.style.setProperty("--line-delay", `${index * HERO_MOTION.lineDelay}ms`);
    inner.textContent = line.text;
    outer.append(inner);
    fragment.append(outer);
    if (index < lines.length - 1) fragment.append(" ");
  });
  return fragment;
}
