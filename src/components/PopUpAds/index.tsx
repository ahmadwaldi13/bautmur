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
    setCurrentSlide((prev) => (prev + 1) % promoProducts.length)
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
      {/* Extra Wide Landscape Container - Responsive */}
      <div
        className={`relative rounded-2xl shadow-2xl w-full mx-4 overflow-hidden transform transition-all duration-300 ${
          isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }
        /* Mobile (xs) */
        max-w-sm h-auto
        /* Tablet (md) */
        md:max-w-4xl md:h-80
        /* Desktop (lg) */
        lg:max-w-6xl lg:h-96
        `}
        style={{
          zIndex: 1000000,
          background:
            'linear-gradient(135deg, #1d4ed8 0%, #1e40af 50%, #1e3a8a 100%)',
        }}
      >
        {/* Close button - Responsive */}
        <button
          onClick={closePopup}
          className="absolute top-2 right-2 md:top-4 md:right-4 z-20 w-6 h-6 md:w-8 md:h-8 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-all duration-200"
        >
          <svg
            className="w-3 h-3 md:w-4 md:h-4"
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

        {/* Main Content - Wide Landscape Layout */}
        <div className="flex h-full">
          {/* Left Side - Product Info */}
          <div className="w-2/3 p-12 flex flex-col justify-center bg-black/20 backdrop-blur-sm">
            {/* Simple Header */}
            <h2 className="text-white/80 text-lg mb-2">
              {currentProduct.name}
            </h2>

            <h1 className="text-5xl font-bold text-white mb-6 drop-shadow-lg">
              {currentProduct.promo_name.toUpperCase()}
            </h1>

            {/* Simple Description */}
            <p className="text-white/90 text-lg mb-8 max-w-lg">
              {currentProduct.description}
            </p>

            {/* Price - Clean Layout */}
            <div className="mb-8">
              <div className="flex items-baseline space-x-4 mb-2">
                <span className="text-3xl font-bold text-white drop-shadow-lg">
                  {formatRupiah(promoPrice)}
                </span>
                <span className="text-xl text-white/70 line-through">
                  {formatRupiah(currentProduct.price_normal)}
                </span>
              </div>
              <p className="text-white/90 font-medium">
                Hemat {formatRupiah(savings)} ({currentProduct.persen_promo})
              </p>
            </div>

            {/* Buttons */}
            <div className="space-y-4">
              {/* View Detail Link styled as Button */}
              <div>
                <Link
                  href={`/products/${currentProduct.id}`}
                  className="inline-block bg-white text-blue-700 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-bold transition-all duration-200 shadow-lg transform hover:scale-105 no-underline"
                  onClick={closePopup}
                >
                  View Detail
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side - Product Image */}
          <div className="w-1/3 relative bg-white/10 backdrop-blur-sm flex items-center justify-center">
            {/* Navigation Arrows - Only if multiple products */}
            {promoProducts.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 bg-white/30 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-white hover:bg-white/40"
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
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 bg-white/30 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-white hover:bg-white/40"
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

            {/* Simple Product Image */}
            <div className="relative">
              <Image
                src={currentProduct.path}
                alt={currentProduct.name}
                width={280}
                height={280}
                className="w-70 h-70 object-cover rounded-xl shadow-2xl border-4 border-white/20"
              />

              {/* Discount Badge */}
              <div className="absolute -top-3 -right-3 bg-red-500 text-red bg-white px-3 py-1 rounded-full font-bold shadow-lg">
                -{currentProduct.persen_promo}
              </div>
            </div>

            {/* Simple Slide Indicators */}
            {promoProducts.length > 1 && (
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
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
        </div>

        {/* Simple Dismiss - Responsive */}
        <button
          onClick={closePopup}
          className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 text-white/80 hover:text-white text-xs md:text-sm underline"
        >
          Tutup
        </button>
      </div>
    </div>,
    document.body
  )
}
