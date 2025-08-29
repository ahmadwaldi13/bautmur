// File: SingleItem.js (Versi BARU untuk Grid)
import { JMarket, DisplayJMarketItem } from '@/types/jmarket'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const SingleItem = ({ item }: { item: DisplayJMarketItem }) => {
  return (
    item.is_active && (
      <Link
        href={item.url}
        className="group block overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
      >
        {/* --- PERUBAHAN UKURAN DI SINI --- */}
        {/* Container utama untuk gambar. Dibuat 'relative'. */}
        {/* 'aspect-[40/34]' untuk mendapatkan rasio 400x340. */}
        <div className="relative w-full bg-gray-200 aspect-[40/34]">
          <Image
            src={item.image_url}
            alt={item.nama}
            fill
            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        {/* Bagian judul dipindahkan ke bawah dengan padding dan style kartu */}
        <div className="p-5 text-center bg-white">
          <h3 className="font-semibold text-lg text-dark transition-colors duration-300 group-hover:text-[#FB4141]">
            {item.nama}
          </h3>
        </div>
      </Link>
    )
  )
}

export default SingleItem
