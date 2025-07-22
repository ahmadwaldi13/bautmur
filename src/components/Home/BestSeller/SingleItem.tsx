'use client'
import React from 'react'
import { Product } from '@/types/product'
// Hapus impor yang tidak lagi digunakan untuk QuickView
import { useModalContext } from '@/app/context/QuickViewModalContext'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import { updateQuickView } from '@/redux/features/quickView-slice'
import Image from 'next/image'
import Link from 'next/link'

const SingleItem = ({ item }: { item: Product }) => {
  // Hapus penggunaan useModalContext dan useDispatch karena tidak lagi diperlukan
  const { openModal } = useModalContext()
  const dispatch = useDispatch<AppDispatch>()

  // Hapus fungsi handleQuickViewUpdate
  const handleQuickViewUpdate = () => {
    dispatch(updateQuickView({ ...item }))
  }

  return (
    <div className="group">
      <div className="relative overflow-hidden rounded-lg bg-[#F6F7FB] min-h-[403px]">
        <div className="text-center px-4 py-7.5">
          <h3 className="font-medium text-dark ease-out duration-200 hover:text-blue mb-1.5">
            <Link href="/shop-details"> {item.title} </Link>
          </h3>

          <span className="flex items-center justify-center gap-2 font-medium text-lg">
            <span className="text-dark">Showcase Item</span>
          </span>
        </div>

        <div className="flex justify-center items-center">
          <Image
            src={item.imgs.previews[0]}
            alt={item.title || 'Product image'}
            width={280}
            height={280}
          />
        </div>

        {/* --- Button "View Details" yang muncul dari bawah --- */}
        <div className="absolute bottom-0 left-0 w-full translate-y-full flex justify-center p-4 ease-linear duration-300 group-hover:translate-y-0">
          <button
            onClick={() => {
              openModal()
              handleQuickViewUpdate()
            }}
            className="inline-flex font-medium text-custom-sm py-[7px] px-5 rounded-[5px] bg-blue text-white ease-out duration-200 hover:bg-blue-dark"
          >
            View Detail
          </button>
        </div>
        {/* --- Akhir Button "View Details" --- */}
      </div>
    </div>
  )
}

export default SingleItem
