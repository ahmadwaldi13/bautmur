/** @type {import('next').NextConfig} */
const nextConfig = {
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
