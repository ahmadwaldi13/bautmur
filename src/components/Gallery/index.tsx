'use client'

import React from 'react'
import Image from 'next/image'
import Breadcrumb from '../Common/Breadcrumb'
import { gallery } from './Gallery'

const Gallery = () => {
  return (
    <>
      <Breadcrumb title={'Gallery'} pages={['Gallery']} />

      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          {/* Gallery Grid - 3 Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {gallery.map((image) => (
              <div
                key={image.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* --- BAGIAN YANG DIPERBAIKI --- */}
                {/* 1. Hapus h-64 sm:h-72 */}
                {/* 2. Tambahkan kelas aspect-ratio, contoh: aspect-[4/3] */}
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src={image.path}
                    alt={image.title}
                    fill
                    className="object-contain" // <-- UBAH INI
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                {/* Anda bisa menambahkan judul atau teks lain di bawah div gambar ini */}
                {/* <div className="p-4">
                  <h3 className="font-bold">{image.title}</h3>
                </div> */}
              </div>
            ))}
          </div>

          {/* Empty state */}
          {gallery.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Tidak ada gambar tersedia</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default Gallery
