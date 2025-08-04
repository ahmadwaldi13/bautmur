import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Breadcrumb from '../Common/Breadcrumb'
import data from './jmarketData'

const breadcrumbData = [
  { title: 'Home', path: '/' },
  { title: 'products', path: '/products' },
]

const JMarket = () => {
  return (
    <>
      <Breadcrumb title={'products'} pages={breadcrumbData} />

      <section className="overflow-hidden bg-gray-2 py-20">
        <div className="mx-auto w-full max-w-[1170px] px-4 sm:px-8 xl:px-0">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((jmarket) => (
              <Link
                key={jmarket.id}
                href={`/${jmarket.slug}`}
                className="group transform rounded-lg bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative flex h-39 items-center justify-center overflow-hidden rounded-t-lg bg-gray-100">
                  <Image
                    src={jmarket.img}
                    alt={jmarket.title}
                    fill
                    // 👇 PERBAIKAN 1: Mengubah 'object-contain' menjadi 'object-cover'
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                {/* 👇 PERBAIKAN 2: Menambahkan 'text-center' untuk menengahkan judul */}
                <div className="p-3 text-center">
                  <h6 className="text-xl font-bold text-dark transition-colors duration-300 group-hover:text-[#FB4141]">
                    {jmarket.title}
                  </h6>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default JMarket
