// 'use client'
// import { Swiper, SwiperSlide } from 'swiper/react'
// import { useCallback, useRef, useEffect } from 'react'
// import data from './jmarketData'
// import Image from 'next/image'

// // Import Swiper styles
// import 'swiper/css/navigation'
// import 'swiper/css'
// import SingleItem from './SingleItem'

// const JMarket = () => {
//   const sliderRef = useRef(null)

//   const handlePrev = useCallback(() => {
//     if (!sliderRef.current) return
//     sliderRef.current.swiper.slidePrev()
//   }, [])

//   const handleNext = useCallback(() => {
//     if (!sliderRef.current) return
//     sliderRef.current.swiper.slideNext()
//   }, [])

//   useEffect(() => {
//     if (sliderRef.current) {
//       sliderRef.current.swiper.init()
//     }
//   }, [])

//   return (
//     <section className="overflow-hidden pt-17.5">
//       <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0 pb-15 border-b border-gray-3">
//         <div className="swiper categories-carousel common-carousel">
//           {/* <!-- section title --> */}
//           <div className="mb-10 flex items-center justify-between">
//             <div>
//               <span className="flex items-center gap-2.5 font-medium text-dark mb-1.5">
//                 <svg
//                   width="20"
//                   height="20"
//                   viewBox="0 0 20 20"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <g clipPath="url(#clip0_834_7356)">
//                     <path
//                       d="M3.94024 13.4474C2.6523 12.1595 2.00832 11.5155 1.7687 10.68C1.52908 9.84449 1.73387 8.9571 2.14343 7.18231L2.37962 6.15883C2.72419 4.66569 2.89648 3.91912 3.40771 3.40789C3.91894 2.89666 4.66551 2.72437 6.15865 2.3798L7.18213 2.14361C8.95692 1.73405 9.84431 1.52927 10.6798 1.76889C11.5153 2.00851 12.1593 2.65248 13.4472 3.94042L14.9719 5.46512C17.2128 7.70594 18.3332 8.82635 18.3332 10.2186C18.3332 11.6109 17.2128 12.7313 14.9719 14.9721C12.7311 17.2129 11.6107 18.3334 10.2184 18.3334C8.82617 18.3334 7.70576 17.2129 5.46494 14.9721L3.94024 13.4474Z"
//                       stroke="#3C50E0"
//                       strokeWidth="1.5"
//                     />
//                     <circle
//                       cx="7.17245"
//                       cy="7.39917"
//                       r="1.66667"
//                       transform="rotate(-45 7.17245 7.39917)"
//                       stroke="#3C50E0"
//                       strokeWidth="1.5"
//                     />
//                     <path
//                       d="M9.61837 15.4164L15.4342 9.6004"
//                       stroke="#3C50E0"
//                       strokeWidth="1.5"
//                       strokeLinecap="round"
//                     />
//                   </g>
//                   <defs>
//                     <clipPath id="clip0_834_7356">
//                       <rect width="20" height="20" fill="white" />
//                     </clipPath>
//                   </defs>
//                 </svg>
//                 J Market
//               </span>
//               <h2 className="font-semibold text-xl xl:text-heading-5 text-dark">
//                 Browse by J Market
//               </h2>
//             </div>

//             <div className="flex items-center gap-3">
//               <button onClick={handlePrev} className="swiper-button-prev">
//                 <svg
//                   className="fill-current"
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     clipRule="evenodd"
//                     d="M15.4881 4.43057C15.8026 4.70014 15.839 5.17361 15.5694 5.48811L9.98781 12L15.5694 18.5119C15.839 18.8264 15.8026 19.2999 15.4881 19.5695C15.1736 19.839 14.7001 19.8026 14.4306 19.4881L8.43056 12.4881C8.18981 12.2072 8.18981 11.7928 8.43056 11.5119L14.4306 4.51192C14.7001 4.19743 15.1736 4.161 15.4881 4.43057Z"
//                     fill=""
//                   />
//                 </svg>
//               </button>

//               <button onClick={handleNext} className="swiper-button-next">
//                 <svg
//                   className="fill-current"
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     clipRule="evenodd"
//                     d="M8.51192 4.43057C8.82641 4.161 9.29989 4.19743 9.56946 4.51192L15.5695 11.5119C15.8102 11.7928 15.8102 12.2072 15.5695 12.4881L9.56946 19.4881C9.29989 19.8026 8.82641 19.839 8.51192 19.5695C8.19743 19.2999 8.161 18.8264 8.43057 18.5119L14.0122 12L8.43057 5.48811C8.161 5.17361 8.19743 4.70014 8.51192 4.43057Z"
//                     fill=""
//                   />
//                 </svg>
//               </button>
//             </div>
//           </div>

//           <Swiper
//             ref={sliderRef}
//             breakpoints={{
//               0: {
//                 slidesPerView: 2,
//                 spaceBetween: 16,
//               },
//               1000: {
//                 slidesPerView: 4,
//                 spaceBetween: 20,
//               },
//               1200: {
//                 slidesPerView: 6,
//                 spaceBetween: 24,
//               },
//             }}
//           >
//             {data.map((item, key) => (
//               <SwiperSlide key={key}>
//                 <SingleItem item={item} />
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default JMarket

// File: JMarket.js (Versi BARU tanpa Slider)

// 'use client'
// import React from 'react'
// import data from './jmarketData'
// import SingleItem from './SingleItem'

// //http://localhost:8000//api/v1/website/jmarkets

// const JMarket = () => {
//   // SEMUA LOGIC UNTUK SLIDER (useRef, useCallback, useEffect, handlePrev, handleNext) DIHAPUS

//   return (
//     <>
//       <section className="overflow-hidden pt-15">
//         <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0 pb-15">
//           {/* --- Bagian Judul Tetap Ada --- */}
//           <div className="mb-10">
//             <div>
//               <span className="flex items-center gap-2.5 font-medium text-dark mb-1.5">
//                 <svg
//                   width="20"
//                   height="20"
//                   viewBox="0 0 20 20"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <g clipPath="url(#clip0_834_7356)">
//                     <path
//                       d="M3.94024 13.4474C2.6523 12.1595 2.00832 11.5155 1.7687 10.68C1.52908 9.84449 1.73387 8.9571 2.14343 7.18231L2.37962 6.15883C2.72419 4.66569 2.89648 3.91912 3.40771 3.40789C3.91894 2.89666 4.66551 2.72437 6.15865 2.3798L7.18213 2.14361C8.95692 1.73405 9.84431 1.52927 10.6798 1.76889C11.5153 2.00851 12.1593 2.65248 13.4472 3.94042L14.9719 5.46512C17.2128 7.70594 18.3332 8.82635 18.3332 10.2186C18.3332 11.6109 17.2128 12.7313 14.9719 14.9721C12.7311 17.2129 11.6107 18.3334 10.2184 18.3334C8.82617 18.3334 7.70576 17.2129 5.46494 14.9721L3.94024 13.4474Z"
//                       stroke="#3C50E0"
//                       strokeWidth="1.5"
//                     />
//                     <circle
//                       cx="7.17245"
//                       cy="7.39917"
//                       r="1.66667"
//                       transform="rotate(-45 7.17245 7.39917)"
//                       stroke="#3C50E0"
//                       strokeWidth="1.5"
//                     />
//                     <path
//                       d="M9.61837 15.4164L15.4342 9.6004"
//                       stroke="#3C50E0"
//                       strokeWidth="1.5"
//                       strokeLinecap="round"
//                     />
//                   </g>
//                   <defs>
//                     <clipPath id="clip0_834_7356">
//                       <rect width="20" height="20" fill="white" />
//                     </clipPath>
//                   </defs>
//                 </svg>
//                 J Market
//               </span>
//               <h2 className="font-maven text-xl xl:text-heading-5 text-dark">
//                 Browse by J Market
//               </h2>
//             </div>
//             {/* TOMBOL NAVIGASI SLIDER DIHAPUS */}
//           </div>

//           {/* --- PERUBAHAN UTAMA: Mengganti Swiper dengan Grid --- */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {data.map((item) => (
//               // Kita tidak lagi butuh <SwiperSlide>
//               <SingleItem key={item.id} item={item} />
//             ))}
//           </div>
//         </div>
//       </section>
//     </>
//   )
// }

// export default JMarket

'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import SingleItem from './SingleItem'
import SingleItemSkeleton from './SingleItemSkeleton'

interface DisplayJMarketItem {
  id: number
  image: string
  image_url: string
  nama: string
  is_active: boolean
  icon: string
  deskripsi: string
  warna_badge: string
  url: string
  created_at?: string
  updated_at?: string
}

const API_URL = 'http://localhost:8000/api/v1/website/jmarkets'
const TOKEN = process.env.NEXT_PUBLIC_API_TOKEN

const JMarket = () => {
  const [jmarkets, setJmarkets] = useState<DisplayJMarketItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!TOKEN) {
      setError('API Token tidak ditemukan.')
      setLoading(false)
      return
    }

    const fetchJMarkets = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            'Content-Type': 'application/json',
          },
        })

        const result = response.data

        if (result.success && Array.isArray(result.data)) {
          const transformedData: DisplayJMarketItem[] = result.data.map(
            (apiItem: any) => ({
              id: apiItem.id,
              nama: apiItem.nama,
              image: apiItem.image,
              url: `products/${apiItem.nama.replace(/\s/g, '').toLowerCase()}/${
                apiItem.id
              }`,
              image_url: apiItem.image_url,
              is_active: apiItem.is_active,
              icon: apiItem.icon,
              deskripsi: apiItem.deskripsi,
            })
          )

          setJmarkets(transformedData)
        } else {
          throw new Error('Format data dari API tidak sesuai')
        }
      } catch (err: any) {
        console.error('Terjadi kesalahan saat fetch JMarket:', err)
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 401) {
            setError('Otorisasi gagal. Token Anda mungkin tidak valid.')
          } else {
            setError(err.response?.data?.message || err.message)
          }
        } else {
          setError('Terjadi kesalahan yang tidak diketahui')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchJMarkets()
  }, [])

  return (
    <>
      <section className="overflow-hidden pt-15">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0 pb-15">
          <div className="mb-10">
            <div>
              <span className="flex items-center gap-2.5 font-medium text-dark mb-1.5">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_834_7356)">
                    <path
                      d="M3.94024 13.4474C2.6523 12.1595 2.00832 11.5155 1.7687 10.68C1.52908 9.84449 1.73387 8.9571 2.14343 7.18231L2.37962 6.15883C2.72419 4.66569 2.89648 3.91912 3.40771 3.40789C3.91894 2.89666 4.66551 2.72437 6.15865 2.3798L7.18213 2.14361C8.95692 1.73405 9.84431 1.52927 10.6798 1.76889C11.5153 2.00851 12.1593 2.65248 13.4472 3.94042L14.9719 5.46512C17.2128 7.70594 18.3332 8.82635 18.3332 10.2186C18.3332 11.6109 17.2128 12.7313 14.9719 14.9721C12.7311 17.2129 11.6107 18.3334 10.2184 18.3334C8.82617 18.3334 7.70576 17.2129 5.46494 14.9721L3.94024 13.4474Z"
                      stroke="#3C50E0"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx="7.17245"
                      cy="7.39917"
                      r="1.66667"
                      transform="rotate(-45 7.17245 7.39917)"
                      stroke="#3C50E0"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M9.61837 15.4164L15.4342 9.6004"
                      stroke="#3C50E0"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_834_7356">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                J Market
              </span>
              <h2 className="font-maven text-xl xl:text-heading-5 text-dark">
                Browse by J Market
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <SingleItemSkeleton key={index} />
              ))
            ) : error ? (
              <p className="col-span-3 text-center text-red-500">
                Error: {error}
              </p>
            ) : (
              jmarkets.map((item) => <SingleItem key={item.id} item={item} />)
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default JMarket
