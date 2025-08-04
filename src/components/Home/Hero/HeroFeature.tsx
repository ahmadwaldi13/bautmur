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
    <div className="max-w-[1060px] w-full mx-auto px-4 sm:px-8 xl:px-0">
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-x-8 mt-10">
        {featureData.map((item, key) => (
          <div className="flex items-center gap-4" key={key}>
            <Image src={item.img} alt="icons" width={40} height={41} />

            <div>
              <h3 className="font-medium text-lg text-dark">{item.title}</h3>
              <p className="text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HeroFeature
