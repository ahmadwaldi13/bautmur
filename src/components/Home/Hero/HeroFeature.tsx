import React from 'react'
import Image from 'next/image'

const featureData = [
  {
    img: '/images/icons/material.svg', // Rekomendasi: Icon yang menggambarkan kualitas bahan/logam
    title: 'Material Premium',
    description: 'Baja pilihan & anti-korosi',
  },
  {
    img: '/images/icons/precision.svg', // Rekomendasi: Icon presisi, penggaris, atau kaliber
    title: 'Ukuran Akurat',
    description: 'Standar ISO & DIN',
  },
  {
    img: '/images/icons/durability.svg', // Rekomendasi: Icon tameng, kekuatan, atau roda gigi
    title: 'Daya Tahan Tinggi',
    description: 'Tahan beban berat & ekstrem',
  },
  {
    img: '/images/icons/variety.svg', // Rekomendasi: Icon katalog, variasi, atau tiga baut berbeda
    title: 'Varian Terlengkap',
    description: 'Ribuan jenis baut',
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
