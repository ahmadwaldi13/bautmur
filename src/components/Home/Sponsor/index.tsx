'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Import Swiper dan CSS-nya
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

const Sponsors = () => {
  const sponsors = [
    {
      id: 1,
      imageSrc: '/images/sponsors/ast.webp',
      alt: 'ast',
    },
    {
      id: 2,
      imageSrc: '/images/sponsors/eterna.webp',
      alt: 'eterna',
    },
    {
      id: 3,
      imageSrc: '/images/sponsors/nikko.webp',
      alt: 'nikko',
    },
    {
      id: 4,
      imageSrc: '/images/sponsors/iprix.webp',
      alt: 'iprix',
    },
    {
      id: 5,
      imageSrc: '/images/sponsors/klinik.webp',
      alt: 'klinik',
    },
    {
      id: 6,
      imageSrc: '/images/sponsors/kobe-steel.webp',
      alt: 'kobe-steel',
    },
    {
      id: 7,
      imageSrc: '/images/sponsors/lion.webp',
      alt: 'lion',
    },
    {
      id: 8,
      imageSrc: '/images/sponsors/lotus.webp',
      alt: 'lotus',
    },
    {
      id: 9,
      imageSrc: '/images/sponsors/marabu.webp',
      alt: 'marabu',
    },
    {
      id: 10,
      imageSrc: '/images/sponsors/merika.webp',
      alt: 'merika',
    },
    {
      id: 11,
      imageSrc: '/images/sponsors/protech.webp',
      alt: 'protech',
    },
    {
      id: 12,
      imageSrc: '/images/sponsors/sip.webp',
      alt: 'sip',
    },
    {
      id: 13,
      imageSrc: '/images/sponsors/solid.webp',
      alt: 'solid',
    },
    {
      id: 14,
      imageSrc: '/images/sponsors/suttontools.webp',
      alt: 'suttontools',
    },
    {
      id: 15,
      imageSrc: '/images/sponsors/tms.webp',
      alt: 'tms',
    },
    {
      id: 16,
      imageSrc: '/images/sponsors/toho.webp',
      alt: 'toho',
    },
    {
      id: 17,
      imageSrc: '/images/sponsors/unison.webp',
      alt: 'unison',
    },
    {
      id: 18,
      imageSrc: '/images/sponsors/wd-40.webp',
      alt: 'wd-40',
    },
    {
      id: 19,
      imageSrc: '/images/sponsors/wd.webp',
      alt: 'wd',
    },
    {
      id: 20,
      imageSrc: '/images/sponsors/wowo.webp',
      alt: 'wowo',
    },
  ]

  return (
    <section className="overflow-hidden pt-15">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="">
          <div className="swiper testimonial-carousel common-carousel p-5">
            {/* <!-- section title --> */}
            <div className="mb-10 flex items-center justify-between">
              <div>
                <span className="flex items-center gap-2.5 font-medium text-dark mb-1.5">
                  <Image
                    src="/images/icons/icon-08.svg"
                    alt="icon"
                    width={17}
                    height={17}
                  />
                  Partners
                </span>
                <h2 className="font-semibold text-xl xl:text-heading-5 text-dark">
                  Our Trusted Partners
                </h2>
              </div>
            </div>
            <div className="relative">
              <Swiper
                modules={[Autoplay]}
                slidesPerView={2} // 2 kolom di mobile
                spaceBetween={20}
                loop={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 3, // 3 kolom di tablet kecil
                    spaceBetween: 25,
                  },
                  768: {
                    slidesPerView: 4, // 4 kolom di tablet
                    spaceBetween: 30,
                  },
                  1024: {
                    slidesPerView: 5, // 5 kolom di desktop
                    spaceBetween: 35,
                  },
                }}
                className="w-full"
              >
                {sponsors.map((sponsor) => (
                  <SwiperSlide key={sponsor.id}>
                    <div className="bg-white rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
                      <div className="aspect-square relative">
                        <Image
                          src={sponsor.imageSrc}
                          alt={sponsor.alt}
                          fill
                          className="object-contain"
                          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Sponsors
