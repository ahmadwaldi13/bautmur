/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/storage/**', // Izinkan semua gambar dari folder /storage
      },
    ],
  },
}

module.exports = nextConfig
