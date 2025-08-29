import Image from 'next/image'
import React from 'react'

// Tentukan props yang dibutuhkan untuk menampilkan satu produk
type ProductCardProps = {
  name: string
  image: string
  specialty?: string // Specialty bisa jadi tidak ada, jadi kita buat opsional
}

const ProductCard = ({ name, image, specialty }: ProductCardProps) => {
  return (
    <div className="group bg-white rounded-lg shadow-md">
      <div className="relative h-48 overflow-hidden rounded-t-lg bg-gray-100">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-6">
        <h6 className="text-xl font-bold text-dark mb-2">{name}</h6>
        {specialty && <p className="text-sm text-gray-600">{specialty}</p>}
      </div>
    </div>
  )
}

export default ProductCard
