import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Pastikan file JSON ini ada di lokasi yang benar
import enTranslation from './locales/en/default.json'
import idTranslation from './locales/id/default.json'
import zhTranslation from './locales/zh/default.json'

const resources = {
  en: {
    translation: enTranslation, // Gunakan 'translation' sebagai namespace default
  },
  id: {
    translation: idTranslation,
  },
  zh: {
    translation: zhTranslation,
  },
}

i18n
  .use(LanguageDetector) // Plugin untuk mendeteksi bahasa browser
  .use(initReactI18next) // Mengikat react-i18next dengan instance i18next
  .init({
    resources,
    fallbackLng: 'id', // Bahasa yang digunakan jika deteksi gagal
    debug: false, // Set ke `false` saat production
    interpolation: {
      escapeValue: false, // React sudah aman dari XSS
    },
    // Opsi untuk LanguageDetector
    detection: {
      order: ['cookie', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['cookie', 'localStorage'],
    },
  })

export default i18n
