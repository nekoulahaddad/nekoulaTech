{
  /** @param {string} name @returns {HTMLMetaElement} */
  function getBrowserThemeMeta(name) {
    const existing = document.querySelector(`meta[name="${name}"]`);
    if (existing instanceof HTMLMetaElement) return existing;
    const meta = document.createElement("meta");
    meta.name = name;
    document.head.append(meta);
    return meta;
  }

  /** @returns {void} */
  function syncBrowserTheme() {
    const root = document.documentElement;
    const background = getComputedStyle(root).getPropertyValue("--bg").trim();
    if (background.length === 0) return;
    const scheme = root.dataset.theme === "light" ? "light" : "dark";
    getBrowserThemeMeta("theme-color").content = background;
    getBrowserThemeMeta("color-scheme").content = scheme;
  }

  /** @returns {void} */
  function initializeBrowserTheme() {
    const observer = new MutationObserver(syncBrowserTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    window.addEventListener("pageshow", syncBrowserTheme);
    syncBrowserTheme();
  }

  initializeBrowserTheme();
}
