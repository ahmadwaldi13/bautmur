import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'

// Daftar semua locale yang didukung aplikasi Anda
export const locales = ['en', 'id', 'zh']

// Tentukan locale default Anda
export const defaultLocale = 'id'

export default getRequestConfig(async ({ locale }) => {
  // Validasi bahwa `locale` yang masuk adalah salah satu yang kita dukung
  if (!locales.includes(locale as any)) {
    notFound()
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  }
})
