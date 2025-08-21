export const Languages = {
  SERBIAN: {api: "SERBIAN", display: "SRB"},
  ENGLISH: {api: "ENGLISH", display: "EN"}
}

export const LanguageStore = {
  getLanguage() {
    const localStorageLanguage = localStorage.getItem("LANGUAGE")
    return localStorageLanguage ? Languages[localStorageLanguage] : Languages.ENGLISH
  },

  setLanguage(language) {
    localStorage.setItem("LANGUAGE", language.api)
  }
}
