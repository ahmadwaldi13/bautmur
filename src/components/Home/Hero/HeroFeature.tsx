import React from 'react'
import Image from 'next/image'

const featureData = [
  {
    img: '/images/icons/product.svg', // Rekomendasi: Icon yang menggambarkan kualitas bahan/logam
    title: 'PRODUK',
    description: 'Kualitas Produk Terjamin',
  },
  {
    img: '/images/icons/service.svg', // Rekomendasi: Icon presisi, penggaris, atau kaliber
    title: 'LAYANAN',
    description: 'Telpon, Email, dan Whatsapp',
  },
  {
    img: '/images/icons/price.svg', // Rekomendasi: Icon tameng, kekuatan, atau roda gigi
    title: 'HARGA',
    description: 'Harga Yang Bersaing',
  },
  {
    img: '/images/icons/team.svg', // Rekomendasi: Icon katalog, variasi, atau tiga baut berbeda
    title: 'TIM',
    description: 'Tim Yang Profesional',
  },
]

const HeroFeature = () => {
  return (
    <div className="max-w-[1060px] w-full mx-auto px-4 sm:px-8 xl:px-0">
      <div className="flex flex-wrap items-center gap-7.5 xl:gap-12.5 mt-10">
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
