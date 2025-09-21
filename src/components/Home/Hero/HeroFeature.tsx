'use client'

import React from 'react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

const featureData = [
  {
    img: '/images/icons/product.svg',
    title: 'STOK',
    descriptionKey: 'features.stock',
  },
  {
    img: '/images/icons/service.svg',
    title: 'LAYANAN',
    descriptionKey: 'features.service',
  },
  {
    img: '/images/icons/pengalaman.svg',
    title: 'PENGALAMAN',
    descriptionKey: 'features.experience',
  },
  {
    img: '/images/icons/pengiriman.svg',
    title: 'PENGIRIMAN',
    descriptionKey: 'features.shipping',
  },
  {
    img: '/images/icons/kecepatan.svg',
    title: 'KECEPATAN',
    descriptionKey: 'features.speed',
  },
  {
    img: '/images/icons/pengemasan.svg',
    title: 'PENGEMASAN',
    descriptionKey: 'features.packaging',
  },
  {
    img: '/images/icons/kualitas.svg',
    title: 'KUALITAS',
    descriptionKey: 'features.quality',
  },
  {
    img: '/images/icons/team.svg',
    title: 'TIM',
    descriptionKey: 'features.team',
  },
]

const HeroFeature = () => {
  const { t } = useTranslation() // 3. Panggil hook untuk mendapatkan fungsi `t`

  return (
    <section className="overflow-hidden">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8 mt-10">
          {featureData.map((item, key) => (
            <div
              className="flex items-center gap-4 bg-red-dark p-4 rounded-lg shadow-md min-h-[80px]"
              key={key}
            >
              <div className="w-10 h-10 relative">
                <Image
                  src={item.img}
                  alt={t(item.descriptionKey)} // 4. Terjemahkan juga alt text
                  fill
                  className="object-contain [filter:brightness(0)_invert(1)]"
                />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-xs text-white leading-relaxed">
                  {t(item.descriptionKey)} {/* 5. Ganti di sini */}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeroFeature
