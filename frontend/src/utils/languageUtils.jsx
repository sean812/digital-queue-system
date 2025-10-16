import { LANGUAGES } from './constants.js'

export const getLanguageName = (code) => {
  const lang = LANGUAGES.find(l => l.code === code)
  return lang ? lang.name : 'English'
}

export const getLanguageFlag = (code) => {
  const lang = LANGUAGES.find(l => l.code === code)
  return lang ? lang.flag : '🇺🇸'
}