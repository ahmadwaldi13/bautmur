'use client'
import React from 'react'
import Image from 'next/image'
import { useModalContext } from '@/app/context/QuickViewModalContext'
import { updateQuickView } from '@/redux/features/quickView-slice'
import { updateproductDetails } from '@/redux/features/product-details'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import Link from 'next/link'

const ProductItem = ({ item }: { item: any }) => {
  const { openModal } = useModalContext()

  const dispatch = useDispatch<AppDispatch>()

  // update the QuickView state
  const handleQuickViewUpdate = () => {
    dispatch(updateQuickView({ ...item }))
  }

  const handleProductDetails = () => {
    dispatch(updateproductDetails({ ...item }))
  }

  const slug = item.nama_barang.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="group ">
      <div className="relative overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.1)] flex items-center justify-center rounded-lg bg-[#F6F7FB] min-h-[270px] mb-4 p-3">
        <Image
          src={item.image_url || '/images/placeholder.png'}
          alt={item.nama_barang || 'Gambar produk default'}
          width={250}
          height={250}
          className="w-full h-auto object-contain"
        />

        <div className="absolute left-0 bottom-0 translate-y-full w-full flex items-center justify-center gap-2.5 pb-5 ease-linear duration-200 group-hover:translate-y-0">
          <button
            onClick={() => {
              openModal()
              handleQuickViewUpdate()
            }}
            className="inline-flex font-medium text-custom-sm py-[7px] px-5 rounded-[5px] bg-[#FB4141] text-white ease-out duration-200 hover:bg-red-dark"
          >
            View
          </button>
        </div>
      </div>

      <h3
        className="font-medium text-dark ease-out duration-200 hover:text-[#FB4141] mb-1.5"
        onClick={() => handleProductDetails()}
      >
        <Link href={`/product/${slug}/${item.id}`}>{item.nama_barang}</Link>
      </h3>

      <span className="flex items-center gap-2 font-medium text-lg">
        <span className="text-dark">
          Rp {item.harga?.toLocaleString('id-ID')}
        </span>
        {/* {item.discountedPrice !== 0 && (
          <span className="text-dark-4 line-through">
            Rp {item.discountedPrice?.toLocaleString('id-ID')}
          </span>
        )} */}
      </span>
    </div>
  )
}

export default ProductItem
