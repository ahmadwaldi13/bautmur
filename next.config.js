/** @type {import('next').NextConfig} */
const nextConfig = {
  // i18n: {
  //   locales: ['id', 'en', 'zh'],
  //   defaultLocale: 'id',
  //   localeDetection: false,
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.bautmur.id',
        pathname: '/storage/**',
      },
      {
        protocol: 'http',
        hostname: 'api.bautmur.id',
        pathname: '/storage/**',
      },
    ],
  },
}

module.exports = nextConfig
