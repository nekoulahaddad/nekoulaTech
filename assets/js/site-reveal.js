const REVEAL_OPTIONS = { threshold: 0.08, rootMargin: "0px 0px -24px 0px" };
const REVEAL_SELECTOR = [
  ".hero-copy", ".hero-panel article", ".metrics article", ".section-heading",
  ".cards > .card", ".portfolio-card", ".member-card", ".process-step", ".contact-card",
].join(", ");

/** @param {IntersectionObserverEntry[]} entries @param {IntersectionObserver} observer */
function revealVisibleElements(entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    observer.unobserve(entry.target);
  });
}

function initializeReveal() {
  if (!("IntersectionObserver" in window)) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const elements = document.querySelectorAll(REVEAL_SELECTOR);
  const observer = new IntersectionObserver(revealVisibleElements, REVEAL_OPTIONS);
  document.querySelectorAll(".section.reveal").forEach((section) => {
    section.classList.remove("reveal");
  });
  document.documentElement.classList.add("has-reveal");
  elements.forEach((element) => {
    element.classList.add("reveal");
    observer.observe(element);
  });
}

initializeReveal();
