// components/LandscapePromoPopup.tsx
'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { popupAds } from './popupAds'
import axios from 'axios'
import CountdownTimer from './CountDownTimer'

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE

const API_URL = `${apiBaseUrl}/api/v1/website/promos/banner`
const TOKEN = process.env.NEXT_PUBLIC_API_TOKEN

export default function LandscapePromoPopup() {
  const [promoProducts, setPromoProducts] = useState<any>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [popupSettings, setPopupSettings] = useState<any | null>(null)

  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isClosed, setIsClosed] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (!TOKEN) {
      setError('API Token tidak ditemukan.')
      setLoading(false)
      return
    }

    const fetchPopupPromos = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${TOKEN}` },
        })

        const apiData = response.data.data

        if (
          apiData.banner_active &&
          apiData.items &&
          apiData.items.length > 0
        ) {
          setPopupSettings(apiData.settings)

          const transformedProducts = apiData.items.map((item) => ({
            ...item,
            id: item.barang_id,
            name: item.nama_barang,
            path: item.image_url,
            price_normal: parseFloat(item.harga_asal),
            persen_promo: `${parseInt(item.persentase_diskon)}%`,
            promo_name: apiData.settings.banner_title,
            description:
              item.promo_keterangan || apiData.settings.banner_description,
          }))

          setPromoProducts(transformedProducts)
        } else {
          setPopupSettings(null) //
          setPromoProducts([])
        }
      } catch (err: any) {
        setError(err.message || 'Gagal mengambil data popup promo.')
        console.error('Fetch Popup Promo Error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPopupPromos()
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (pathname === '/' && promoProducts.length > 0 && mounted && !isClosed) {
      const timer = setTimeout(() => {
        setIsVisible(true)
        setTimeout(() => setIsAnimating(true), 50)
      }, 2500)

      return () => clearTimeout(timer)
    }
  }, [pathname, promoProducts, mounted, isClosed])

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

  if (
    pathname !== '/' ||
    promoProducts.length === 0 ||
    !popupSettings ||
    !isVisible ||
    !mounted
  )
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

  const slug = currentProduct.nama_barang.toLowerCase().replace(/\s+/g, '-')

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
          background: `linear-gradient(135deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 100%), ${popupSettings.banner_color}`,
        }}
      >
        {/* Tombol Tutup */}
        <button
          onClick={closePopup}
          className="absolute top-2 right-2 z-20 w-7 h-7 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-all duration-200
          md:top-3 md:right-3 md:w-8 md:h-8
          lg:top-4 lg:right-4 lg:w-8 lg:h-8"
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

        <div className="flex flex-col md:flex-row h-full w-full">
          <div className="w-full md:w-1/3 relative bg-white/10 backdrop-blur-sm flex items-center justify-center p-4 md:p-0">
            {promoProducts.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 bg-white/30 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-white hover:bg-white/40
                  md:left-3
                  lg:left-4"
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

            <div className="relative mb-4 md:mb-0">
              <Image
                src={currentProduct.path}
                alt={currentProduct.name}
                width={200}
                height={200}
                className="w-48 h-48 object-cover rounded-xl shadow-2xl border-4 border-white/20
                md:w-[200px] md:h-[200px]
                lg:w-[280px] lg:h-[280px]"
              />

              <div className="absolute -top-3 -right-3 bg-white text-red px-3 py-1 rounded-full font-bold shadow-lg text-sm">
                -{currentProduct.persen_promo}
              </div>
            </div>

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
          <div
            className="w-full md:w-2/3 p-4 md:p-8 flex flex-col justify-center bg-black/20 backdrop-blur-sm text-center md:text-left
          lg:p-12"
          >
            {' '}
            <h2
              className="text-white/80 text-base md:text-base mb-1 md:mb-1
            lg:text-lg lg:mb-2"
            >
              {' '}
              {currentProduct.name}
            </h2>
            <h1
              className="text-3xl md:text-3xl font-bold text-white mb-4 md:mb-3 drop-shadow-lg
            lg:text-5xl lg:mb-6
            flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2"
            >
              <span>{currentProduct.promo_name.toUpperCase()}</span>
              {currentProduct.time_remaining?.expires_at && (
                <CountdownTimer
                  expiryTimestamp={currentProduct.time_remaining.expires_at}
                />
              )}
            </h1>
            <p
              className="text-white/90 text-sm md:text-sm mb-4 md:mb-5 max-w-lg mx-auto md:mx-0
            lg:text-lg lg:mb-8"
            >
              {' '}
              {currentProduct.description}
            </p>
            <div
              className="mb-4 md:mb-5
            lg:mb-8"
            >
              {' '}
              <div
                className="flex items-baseline space-x-2 md:space-x-2 mb-1 md:mb-1 justify-center md:justify-start
              lg:space-x-4 lg:mb-2"
              >
                {' '}
                <span
                  className="text-2xl md:text-2xl font-bold text-white drop-shadow-lg
                lg:text-3xl"
                >
                  {' '}
                  {formatRupiah(promoPrice)}
                </span>
                <span
                  className="text-base md:text-base text-white/70 line-through
                lg:text-xl"
                >
                  {' '}
                  {formatRupiah(currentProduct.price_normal)}
                </span>
              </div>
              <p
                className="text-white/90 font-medium text-sm md:text-xs
              lg:text-base"
              >
                {' '}
                Hemat {formatRupiah(savings)} ({currentProduct.persen_promo})
              </p>
            </div>
            <div className="space-y-4">
              <div>
                `
                <Link
                  href={`/product/${slug}/${currentProduct.id}`}
                  className="inline-block bg-white text-blue-700 hover:bg-gray-100 px-6 py-3 rounded-lg text-base font-bold transition-all duration-200 shadow-lg transform hover:scale-105 no-underline
                  md:px-6 md:py-3 md:text-base
                  lg:px-8 lg:py-4 lg:text-lg"
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
