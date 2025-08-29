import React from 'react'
import HeroCarousel from './HeroCarousel'
import HeroFeature from './HeroFeature'
import Image from 'next/image'

const Hero = () => {
  return (
    <>
      <section className="overflow-hidden pt-55 pb-0 md:pt-44 md:pb-5 lg:pb-6 lg:pt-32 xl:pt-52 bg-[#E5EAF4]">
        {/* Kontainer ini sekarang memiliki padding responsif */}
        <div className="max-w-[1170px] w-full mx-auto px-0 md:px-4">
          <div className="flex flex-wrap">
            {' '}
            {/* Menghapus gap-5 untuk layout yang lebih rapat jika diperlukan */}
            <div className="w-full">
              {/* Sudut membulat sekarang hanya aktif di tablet ke atas */}
              <div className="relative z-1 bg-white overflow-hidden md:rounded-[10px]">
                <HeroCarousel />
              </div>
            </div>
          </div>
        </div>
      </section>
      <HeroFeature />
    </>
  )
}

export default Hero
