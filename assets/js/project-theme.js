function restoreProjectTheme() {
  try {
    const savedTheme = localStorage.getItem("site_theme");
    const isLight = savedTheme === "light";
    document.documentElement.dataset.theme = isLight ? "light" : "dark";
  } catch {
    console.warn("Saved theme is unavailable; using the default theme.");
  }
}

restoreProjectTheme();
