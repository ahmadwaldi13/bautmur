// 'use client'
// import { Swiper, SwiperSlide } from 'swiper/react'
// import { Autoplay, Pagination } from 'swiper/modules'
// import React from 'react'
// import { useState, useEffect } from 'react'
// import axios from 'axios'
// import 'swiper/css/pagination'
// import 'swiper/css'

// // Import data
// import { carousel } from './Carousel'

// const API_URL = 'http://localhost:8000/api/v1/website/banners'
// const requestParams = {
//   limit: 6,
// }
// const TOKEN = process.env.NEXT_PUBLIC_API_TOKEN

// const HeroCarousel = () => {
//   const [hero, setHero] = useState<any>([])
//   const [loading, setLoading] = useState<boolean>(true)
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     if (!TOKEN) {
//       setError('API Token tidak ditemukan.')
//       setLoading(false)
//       return
//     }

//     const fetchJMarkets = async () => {
//       try {
//         setLoading(true)
//         setError(null)

//         const response = await axios.get(API_URL, {
//           headers: {
//             Authorization: `Bearer ${TOKEN}`,
//             'Content-Type': 'application/json',
//           },
//           params: requestParams,
//         })

//         const results = response.data

//         if (results && Array.isArray(results.data)) {
//           setHero(results.data)
//         } else {
//           console.error(
//             "Struktur data API tidak sesuai, properti 'data' tidak ditemukan atau bukan array.",
//             results
//           )
//           setHero([])
//         }
//       } catch (err: any) {
//         console.error('Terjadi kesalahan saat fetch new product:', err)
//         if (axios.isAxiosError(err)) {
//           if (err.response?.status === 401) {
//             setError('Otorisasi gagal. Token Anda mungkin tidak valid.')
//           } else {
//             setError(err.response?.data?.message || err.message)
//           }
//         } else {
//           setError('Terjadi kesalahan yang tidak diketahui')
//         }
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchJMarkets()
//   }, [])

//   return (
//     <Swiper
//       spaceBetween={0}
//       centeredSlides={true}
//       autoplay={{
//         delay: 4000,
//         disableOnInteraction: false,
//       }}
//       pagination={{
//         clickable: true,
//       }}
//       modules={[Autoplay, Pagination]}
//       className="hero-carousel"
//       loop={true}
//       speed={800}
//     >
//       {carousel.map((item) => (
//         <SwiperSlide key={item.id}>
//           <div
//             className="hero-slide"
//             style={{
//               backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${item.path})`,
//             }}
//           ></div>
//         </SwiperSlide>
//       ))}
//     </Swiper>
//   )
// }

// export default HeroCarousel

'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperClass } from 'swiper'
import { Pagination } from 'swiper/modules'
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

import 'swiper/css'
import 'swiper/css/pagination'

const HeroCarouselSkeleton = () => {
  return (
    <div
      className="
        w-full animate-pulse bg-gray-300/80 dark:bg-gray-700/80
        aspect-[3/2] md:aspect-[16/9] lg:aspect-[20/9]
      "
    ></div>
  )
}

interface Banner {
  id: number
  title: string
  caption: string
  image: string
  sequence: number
}

const API_URL = 'http://localhost:8000/api/v1/website/banners'
const IMAGE_BASE_URL = 'http://localhost:8000/storage'
const TOKEN = process.env.NEXT_PUBLIC_API_TOKEN

const AUTOPLAY_DELAY = 4000

const HeroCarousel = () => {
  const [hero, setHero] = useState<Banner[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const [swiper, setSwiper] = useState<SwiperClass | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const fetchBanners = async () => {
      setLoading(true)
      try {
        if (!TOKEN) throw new Error('API Token tidak ditemukan')
        const response = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${TOKEN}` },
        })
        if (response.data && Array.isArray(response.data.data)) {
          setHero(response.data.data)
        } else {
          throw new Error('Struktur data API tidak valid')
        }
      } catch (err: any) {
        setError(err.message || 'Gagal mengambil data')
      } finally {
        setLoading(false)
      }
    }
    fetchBanners()
  }, [])

  useEffect(() => {
    if (!swiper || hero.length === 0) return

    const customAutoplay = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        if (!swiper || swiper.destroyed) return

        const nextIndex = (swiper.realIndex + 1) % hero.length
        const nextSlideData = hero[nextIndex]

        const transitionSpeed = nextSlideData?.sequence || 800

        swiper.slideNext(transitionSpeed)
      }, AUTOPLAY_DELAY)
    }

    customAutoplay()

    swiper.on('slideChange', customAutoplay)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (swiper) swiper.off('slideChange', customAutoplay)
    }
  }, [swiper, hero])

  if (loading) {
    return <HeroCarouselSkeleton />
  }

  if (error) {
    return (
      <div className="hero-carousel-error">
        <p>Error: {error}</p>
      </div>
    )
  }

  return (
    <Swiper
      spaceBetween={0}
      centeredSlides={true}
      pagination={{ clickable: true }}
      modules={[Pagination]}
      className="hero-carousel"
      loop={true}
      onSwiper={setSwiper}
    >
      {hero.map((item) => (
        <SwiperSlide key={item.id}>
          <div
            className="hero-slide"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${IMAGE_BASE_URL}/${item.image})`,
            }}
          ></div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default HeroCarousel
