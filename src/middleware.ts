import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from './i18n'

export default createMiddleware({
  // Locale default yang akan ditampilkan saat URL tidak memiliki prefix
  defaultLocale: defaultLocale,

  // Daftar semua locale yang didukung
  locales: locales,

  // Konfigurasi KUNCI untuk URL default tanpa prefix
  localePrefix: {
    mode: 'as-needed',
  },
})

export const config = {
  // Matcher untuk menjalankan middleware pada semua path kecuali aset statis dan API
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
