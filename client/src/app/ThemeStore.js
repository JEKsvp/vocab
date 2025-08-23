export const Themes = {
  LIGHT: {api: "LIGHT", display: "Light"},
  DARK: {api: "DARK", display: "Dark"}
}

export const ThemeStore = {
  getTheme() {
    const localStorageTheme = localStorage.getItem("THEME")
    return localStorageTheme ? Themes[localStorageTheme] : Themes.DARK
  },

  setTheme(theme) {
    localStorage.setItem("THEME", theme.api)
  }
}