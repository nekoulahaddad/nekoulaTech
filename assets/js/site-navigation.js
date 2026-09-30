const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");
const COMPACT_NAV_QUERY = "(max-width: 1250px)";

/** @param {boolean} shouldRestoreFocus */
function closeNavigation(shouldRestoreFocus) {
  if (!(menuButton instanceof HTMLButtonElement)) return;
  if (!(navigation instanceof HTMLElement)) return;
  if (!navigation.classList.contains("open")) return;
  navigation.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  if (shouldRestoreFocus) menuButton.focus();
}

/** @param {MouseEvent} event */
function handleNavigationClick(event) {
  if (!(event.target instanceof Element)) return;
  if (!event.target.closest("a[href^='#']")) return;
  closeNavigation(false);
}

/** @param {KeyboardEvent} event */
function handleNavigationKey(event) {
  if (event.key !== "Escape") return;
  closeNavigation(true);
}

function initializeNavigation() {
  if (!(navigation instanceof HTMLElement)) return;
  navigation.addEventListener("click", handleNavigationClick);
  document.addEventListener("keydown", handleNavigationKey);
  window.matchMedia(COMPACT_NAV_QUERY).addEventListener("change", () => {
    closeNavigation(false);
  });
}

initializeNavigation();
