'use client'
import React from 'react'
import { Product } from '@/types/product'
import { useModalContext } from '@/app/context/QuickViewModalContext'
import { updateQuickView } from '@/redux/features/quickView-slice'
import { addItemToCart } from '@/redux/features/cart-slice'
import { addItemToWishlist } from '@/redux/features/wishlist-slice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import Link from 'next/link'
import Image from 'next/image'

const SingleGridItem = ({ item }: { item: any }) => {
  const { openModal } = useModalContext()

  const dispatch = useDispatch<AppDispatch>()

  // update the QuickView state
  const handleQuickViewUpdate = () => {
    dispatch(updateQuickView({ ...item }))
  }

  // add to cart
  const handleAddToCart = () => {
    dispatch(
      addItemToCart({
        ...item,
        quantity: 1,
      })
    )
  }

  const handleItemToWishList = () => {
    dispatch(
      addItemToWishlist({
        ...item,
        status: 'available',
        quantity: 1,
      })
    )
  }

  return (
    <div className="group">
      <div className="relative overflow-hidden flex items-center justify-center rounded-lg bg-white shadow-1 min-h-[270px] mb-4">
        <Image src={item.image_url} alt="" width={250} height={250} />

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

      <h3 className="font-medium text-dark ease-out duration-200 hover:text-[#FB4141] mb-1.5">
        <Link
          href={`/product/${item.nama_barang
            .toLowerCase()
            .replace(/\s+/g, '-')}/${item.id}`}
        >
          {' '}
          {item.nama_barang}{' '}
        </Link>
      </h3>

      <span className="flex items-center gap-2 font-medium text-lg">
        <span className="text-dark">
          Rp{item.harga?.toLocaleString('id-ID')}
        </span>
        {/* <span className="text-dark-4 line-through">
          Rp {item.discountedPrice?.toLocaleString('id-ID')}
        </span> */}
      </span>
    </div>
  )
}

export default SingleGridItem
