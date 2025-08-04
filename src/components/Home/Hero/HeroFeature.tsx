import React from 'react'
import Image from 'next/image'

const featureData = [
  {
    img: '/images/icons/product.svg',
    title: 'STOK',
    description: 'Stok Lengkap',
  },
  {
    img: '/images/icons/service.svg',
    title: 'LAYANAN',
    description:
      'Layanan Pelanggan Responsif Melalui Telepon, Email, dan WhatsAap',
  },
  {
    img: '/images/icons/pengalaman.svg',
    title: 'PENGALAMAN',
    description:
      'Berpengalaman Puluhan Tahun dalam memasok proyek, supplier industri, dll',
  },
  {
    img: '/images/icons/pengiriman.svg',
    title: 'PENGIRIMAN',
    description: 'Pengiriman Gratis* (Area Bandung)',
  },
  {
    img: '/images/icons/kecepatan.svg',
    title: 'KECEPATAN',
    description: 'Kecepatan Dalam Pelayanan',
  },
  {
    img: '/images/icons/pengemasan.svg',
    title: 'PENGEMASAN',
    description: 'Pengemasan Rapi untuk Luar Pulau',
  },
  {
    img: '/images/icons/kualitas.svg',
    title: 'KUALITAS',
    description: 'Kualitas Produk Terjamin ',
  },
  {
    img: '/images/icons/team.svg',
    title: 'TIM',
    description: 'Memiliki Tim Profesional',
  },
]

const HeroFeature = () => {
  return (
    <section className="overflow-hidden">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8 mt-10">
          {featureData.map((item, key) => (
            <div
              className="flex items-center gap-4 bg-red-dark p-4 rounded-lg shadow-md min-h-[80px]"
              key={key}
            >
              <div className="flex-shrink-0">
                <Image
                  src={item.img}
                  alt={item.description}
                  width={40}
                  height={41}
                  className="[filter:brightness(0)_invert(1)]"
                />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-xs text-white leading-relaxed">
                  {item.description}
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
