// import React from "react";
// import Image from "next/image";

// const PromoBanner = () => {
//   return (
//     <section className="overflow-hidden py-20">
//       <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
//         {/* <!-- promo banner big --> */}
//         <div className="relative z-1 overflow-hidden rounded-lg bg-[#F5F5F7] py-12.5 lg:py-17.5 xl:py-22.5 px-4 sm:px-7.5 lg:px-14 xl:px-19 mb-7.5">
//           <div className="max-w-[550px] w-full">
//             <span className="block font-medium text-xl text-dark mb-3">
//               Apple iPhone 14 Plus
//             </span>

//             <h2 className="font-bold text-xl lg:text-heading-4 xl:text-heading-3 text-dark mb-5">
//               UP TO 30% OFF
//             </h2>

//             <p>
//               iPhone 14 has the same superspeedy chip that’s in iPhone 13 Pro,
//               A15 Bionic, with a 5‑core GPU, powers all the latest features.
//             </p>

//             <a
//               href="#"
//               className="inline-flex font-medium text-custom-sm text-white bg-blue py-[11px] px-9.5 rounded-md ease-out duration-200 hover:bg-blue-dark mt-7.5"
//             >
//               Buy Now
//             </a>
//           </div>

//           <Image
//             src="/images/promo/promo-01.png"
//             alt="promo img"
//             className="absolute bottom-0 right-4 lg:right-26 -z-1"
//             width={274}
//             height={350}
//           />
//         </div>

//         <div className="grid gap-7.5 grid-cols-1 lg:grid-cols-2">
//           {/* <!-- promo banner small --> */}
//           <div className="relative z-1 overflow-hidden rounded-lg bg-[#DBF4F3] py-10 xl:py-16 px-4 sm:px-7.5 xl:px-10">
//             <Image
//               src="/images/promo/promo-02.png"
//               alt="promo img"
//               className="absolute top-1/2 -translate-y-1/2 left-3 sm:left-10 -z-1"
//               width={241}
//               height={241}
//             />

//             <div className="text-right">
//               <span className="block text-lg text-dark mb-1.5">
//                 Foldable Motorised Treadmill
//               </span>

//               <h2 className="font-bold text-xl lg:text-heading-4 text-dark mb-2.5">
//                 Workout At Home
//               </h2>

//               <p className="font-semibold text-custom-1 text-teal">
//                 Flat 20% off
//               </p>

//               <a
//                 href="#"
//                 className="inline-flex font-medium text-custom-sm text-white bg-teal py-2.5 px-8.5 rounded-md ease-out duration-200 hover:bg-teal-dark mt-9"
//               >
//                 Grab Now
//               </a>
//             </div>
//           </div>

//           {/* <!-- promo banner small --> */}
//           <div className="relative z-1 overflow-hidden rounded-lg bg-[#FFECE1] py-10 xl:py-16 px-4 sm:px-7.5 xl:px-10">
//             <Image
//               src="/images/promo/promo-03.png"
//               alt="promo img"
//               className="absolute top-1/2 -translate-y-1/2 right-3 sm:right-8.5 -z-1"
//               width={200}
//               height={200}
//             />

//             <div>
//               <span className="block text-lg text-dark mb-1.5">
//                 Apple Watch Ultra
//               </span>

//               <h2 className="font-bold text-xl lg:text-heading-4 text-dark mb-2.5">
//                 Up to <span className="text-orange">40%</span> off
//               </h2>

//               <p className="max-w-[285px] text-custom-sm">
//                 The aerospace-grade titanium case strikes the perfect balance of
//                 everything.
//               </p>

//               <a
//                 href="#"
//                 className="inline-flex font-medium text-custom-sm text-white bg-orange py-2.5 px-8.5 rounded-md ease-out duration-200 hover:bg-orange-dark mt-7.5"
//               >
//                 Buy Now
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default PromoBanner;

'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

// 2. Import Swiper dan CSS-nya
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const PromoBanner = () => {
  // 3. Siapkan data untuk carousel langsung di sini
  const newProductData = [
    {
      id: 1,
      imageSrc: '/images/new-product/Modern-New-Product-banner-scaled.jpg',
      alt: 'new product 1',
      href: '/products/phones/iphone-14-plus',
    },
    {
      id: 2,
      imageSrc: '/images/new-product/product-new.png',
      alt: 'new product 2',
      href: '/products/phones/galaxy-s25',
    },
  ]

  return (
    <section className="overflow-hidden py-20">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        {/* 4. Ganti banner statis dengan komponen Swiper Carousel */}
        <div className="relative z-1 overflow-hidden rounded-lg mb-7.5">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            className="aspect-[19/9] w-full rounded-lg overflow-hidden" // Aspect ratio yang lebih lebar
          >
            {newProductData.map((product) => (
              <SwiperSlide key={product.id}>
                <Link
                  href={product.href}
                  className="block w-full h-full relative bg-gradient-to-br from-blue-50 to-purple-50"
                >
                  <Image
                    src={product.imageSrc}
                    alt={product.alt}
                    fill
                    className="object-cover object-center hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/10"></div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Bagian promo banner kecil di bawahnya tidak berubah */}
        {/* <div className="grid gap-7.5 grid-cols-1 lg:grid-cols-2">
          <div className="relative z-1 overflow-hidden rounded-lg bg-[#DBF4F3] py-10 xl:py-16 px-4 sm:px-7.5 xl:px-10">
            <Image
              src="/images/promo/promo-02.png"
              alt="promo img"
              className="absolute top-1/2 -translate-y-1/2 left-3 sm:left-10 -z-1"
              width={241}
              height={241}
            />
            <div className="text-right">
              <span className="block text-lg text-dark mb-1.5">
                Foldable Motorised Treadmill
              </span>
              <h2 className="font-bold text-xl lg:text-heading-4 text-dark mb-2.5">
                Workout At Home
              </h2>
              <p className="font-semibold text-custom-1 text-teal">
                Flat 20% off
              </p>
              <a
                href="#"
                className="inline-flex font-medium text-custom-sm text-white bg-teal py-2.5 px-8.5 rounded-md ease-out duration-200 hover:bg-teal-dark mt-9"
              >
                Grab Now
              </a>
            </div>
          </div>
          
          <div className="relative z-1 overflow-hidden rounded-lg bg-[#FFECE1] py-10 xl:py-16 px-4 sm:px-7.5 xl:px-10">
            <Image
              src="/images/promo/promo-03.png"
              alt="promo img"
              className="absolute top-1/2 -translate-y-1/2 right-3 sm:right-8.5 -z-1"
              width={200}
              height={200}
            />
            <div>
              <span className="block text-lg text-dark mb-1.5">
                Apple Watch Ultra
              </span>
              <h2 className="font-bold text-xl lg:text-heading-4 text-dark mb-2.5">
                Up to <span className="text-orange">40%</span> off
              </h2>
              <p className="max-w-[285px] text-custom-sm">
                The aerospace-grade titanium case strikes the perfect balance of
                everything.
              </p>
              <a
                href="#"
                className="inline-flex font-medium text-custom-sm text-white bg-orange py-2.5 px-8.5 rounded-md ease-out duration-200 hover:bg-orange-dark mt-7.5"
              >
                Buy Now
              </a>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  )
}

export default PromoBanner
