// components/LandscapePromoPopup.tsx
'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { popupAds } from './popupAds'

export default function LandscapePromoPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isClosed, setIsClosed] = useState(false)
  const pathname = usePathname()

  // Ambil produk yang statusnya true (untuk promo)
  const promoProducts = popupAds.filter((product) => product.status === true)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Hanya tampil di halaman home dan jika ada produk promo
    if (pathname === '/' && promoProducts.length > 0 && mounted && !isClosed) {
      const timer = setTimeout(() => {
        setIsVisible(true)
        setTimeout(() => setIsAnimating(true), 50)
      }, 2500)

      return () => clearTimeout(timer)
    }
  }, [pathname, promoProducts, mounted, isClosed])

  // Auto slide setiap 5 detik
  useEffect(() => {
    if (isVisible && promoProducts.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % promoProducts.length)
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [isVisible, promoProducts.length])

  const closePopup = () => {
    setIsAnimating(false)
    setTimeout(() => {
      setIsVisible(false)
      setIsClosed(true)
    }, 300)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + promoProducts.length) % promoProducts.length
    )
  }

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + promoProducts.length) % promoProducts.length
    )
  }

  // Jika bukan halaman home, tidak ada produk promo, atau tidak visible, return null
  if (pathname !== '/' || promoProducts.length === 0 || !isVisible || !mounted)
    return null

  const currentProduct = promoProducts[currentSlide]

  // Hitung harga promo berdasarkan persentase
  const calculatePromoPrice = (normalPrice: number, promoPercent: string) => {
    const percent = parseInt(promoPercent.replace('%', ''))
    const discount = (normalPrice * percent) / 100
    return normalPrice - discount
  }

  // Hitung hemat berapa
  const calculateSavings = (normalPrice: number, promoPercent: string) => {
    const percent = parseInt(promoPercent.replace('%', ''))
    return (normalPrice * percent) / 100
  }

  // Format rupiah
  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
      .format(amount)
      .replace('IDR', 'Rp')
  }

  const promoPrice = calculatePromoPrice(
    currentProduct.price_normal,
    currentProduct.persen_promo
  )
  const savings = calculateSavings(
    currentProduct.price_normal,
    currentProduct.persen_promo
  )

  // Render menggunakan portal ke document.body
  return createPortal(
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black transition-all duration-300`}
      style={{
        zIndex: 999999,
        backgroundColor: isAnimating
          ? 'rgba(0, 0, 0, 0.6)'
          : 'rgba(0, 0, 0, 0)',
      }}
    >
      {/* Container Utama Popup */}
      <div
        className={`relative rounded-2xl shadow-2xl w-full mx-4 overflow-hidden transform transition-all duration-300 ${
          isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }
        /* Default: Mobile Portrait (xs-sm) */
        max-w-xs h-auto py-8 px-4 flex flex-col items-center justify-center text-center
        /* Tablet (md) */
        md:max-w-4xl md:h-[300px] md:py-0 md:px-0 md:flex-row md:text-left
        /* Desktop (lg) - Penyesuaian Ukuran Kembali */
        lg:max-w-6xl lg:h-96
        `}
        style={{
          zIndex: 1000000,
          background:
            'linear-gradient(135deg, #1d4ed8 0%, #1e40af 50%, #1e3a8a 100%)',
        }}
      >
        {/* Tombol Tutup */}
        <button
          onClick={closePopup}
          className="absolute top-2 right-2 z-20 w-7 h-7 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-all duration-200
          md:top-3 md:right-3 md:w-8 md:h-8
          lg:top-4 lg:right-4 lg:w-8 lg:h-8" // Ukuran dan posisi tombol tutup di desktop
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Konten Utama - Mobile: Kolom, Tablet/Desktop: Baris */}
        <div className="flex flex-col md:flex-row h-full w-full">
          {/* Sisi Kanan - Gambar Produk (Mobile: Atas, Tablet/Desktop: Kanan) */}
          <div className="w-full md:w-1/3 relative bg-white/10 backdrop-blur-sm flex items-center justify-center p-4 md:p-0">
            {/* Panah Navigasi - Hanya jika ada beberapa produk */}
            {promoProducts.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 bg-white/30 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-white hover:bg-white/40
                  md:left-3
                  lg:left-4" // Posisi panah navigasi di desktop
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <button
                  onClick={nextSlide}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 bg-white/30 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-white hover:bg-white/40
                  md:right-3
                  lg:right-4" // Posisi panah navigasi di desktop
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </>
            )}

            {/* Gambar Produk */}
            <div className="relative mb-4 md:mb-0">
              <Image
                src={currentProduct.path}
                alt={currentProduct.name}
                width={200} // Ukuran lebih kecil untuk mobile
                height={200} // Ukuran lebih kecil untuk mobile
                className="w-48 h-48 object-cover rounded-xl shadow-2xl border-4 border-white/20
                md:w-[200px] md:h-[200px]
                lg:w-[280px] lg:h-[280px]" // Ukuran gambar di desktop (kembali ke ukuran aslinya)
              />

              {/* Badge Diskon */}
              <div className="absolute -top-3 -right-3 bg-white text-red px-3 py-1 rounded-full font-bold shadow-lg text-sm">
                -{currentProduct.persen_promo}
              </div>
            </div>

            {/* Indikator Slide */}
            {promoProducts.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {promoProducts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide ? 'bg-white w-6' : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Sisi Kiri - Info Produk (Mobile: Bawah, Tablet/Desktop: Kiri) */}
          <div
            className="w-full md:w-2/3 p-4 md:p-8 flex flex-col justify-center bg-black/20 backdrop-blur-sm text-center md:text-left
          lg:p-12"
          >
            {' '}
            {/* Padding di desktop */}
            {/* Header Sederhana */}
            <h2
              className="text-white/80 text-base md:text-base mb-1 md:mb-1
            lg:text-lg lg:mb-2"
            >
              {' '}
              {/* Ukuran teks di desktop */}
              {currentProduct.name}
            </h2>
            <h1
              className="text-3xl md:text-3xl font-bold text-white mb-4 md:mb-3 drop-shadow-lg
            lg:text-5xl lg:mb-6"
            >
              {' '}
              {/* Ukuran teks di desktop */}
              {currentProduct.promo_name.toUpperCase()}
            </h1>
            {/* Deskripsi Sederhana */}
            <p
              className="text-white/90 text-sm md:text-sm mb-4 md:mb-5 max-w-lg mx-auto md:mx-0
            lg:text-lg lg:mb-8"
            >
              {' '}
              {/* Ukuran teks di desktop */}
              {currentProduct.description}
            </p>
            {/* Harga */}
            <div
              className="mb-4 md:mb-5
            lg:mb-8"
            >
              {' '}
              {/* Margin di desktop */}
              <div
                className="flex items-baseline space-x-2 md:space-x-2 mb-1 md:mb-1 justify-center md:justify-start
              lg:space-x-4 lg:mb-2"
              >
                {' '}
                {/* Spasi dan margin di desktop */}
                <span
                  className="text-2xl md:text-2xl font-bold text-white drop-shadow-lg
                lg:text-3xl"
                >
                  {' '}
                  {/* Ukuran teks di desktop */}
                  {formatRupiah(promoPrice)}
                </span>
                <span
                  className="text-base md:text-base text-white/70 line-through
                lg:text-xl"
                >
                  {' '}
                  {/* Ukuran teks di desktop */}
                  {formatRupiah(currentProduct.price_normal)}
                </span>
              </div>
              <p
                className="text-white/90 font-medium text-sm md:text-xs
              lg:text-base"
              >
                {' '}
                {/* Ukuran teks di desktop */}
                Hemat {formatRupiah(savings)} ({currentProduct.persen_promo})
              </p>
            </div>
            {/* Tombol */}
            <div className="space-y-4">
              {/* Tombol "View Detail" */}
              <div>
                <Link
                  href={`/products/${currentProduct.id}`}
                  className="inline-block bg-white text-blue-700 hover:bg-gray-100 px-6 py-3 rounded-lg text-base font-bold transition-all duration-200 shadow-lg transform hover:scale-105 no-underline
                  md:px-6 md:py-3 md:text-base
                  lg:px-8 lg:py-4 lg:text-lg" // Ukuran tombol di desktop
                  onClick={closePopup}
                >
                  View Detail
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
