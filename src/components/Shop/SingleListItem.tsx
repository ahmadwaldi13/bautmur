'use client'
import React from 'react'

import { ProductDetail } from '@/types/product'
import { useModalContext } from '@/app/context/QuickViewModalContext'
import { updateQuickView } from '@/redux/features/quickView-slice'
import { addItemToCart } from '@/redux/features/cart-slice'
import { addItemToWishlist } from '@/redux/features/wishlist-slice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import Link from 'next/link'
import Image from 'next/image'

const SingleListItem = ({ item }: { item: ProductDetail }) => {
  const { openModal } = useModalContext()
  const dispatch = useDispatch<AppDispatch>()

  // update the QuickView state
  const handleQuickViewUpdate = () => {
    dispatch(updateQuickView({ ...item }))
  }

  // add to cart
  // const handleAddToCart = () => {
  //   dispatch(
  //     addItemToCart({
  //       ...item,
  //       quantity: 1,
  //     })
  //   )
  // }

  // const handleItemToWishList = () => {
  //   dispatch(
  //     addItemToWishlist({
  //       ...item,
  //       status: 'available',
  //       quantity: 1,
  //     })
  //   )
  // }

  return (
    <div className="group rounded-lg bg-white shadow-1">
      <div className="flex">
        <div className="shadow-list relative overflow-hidden flex items-center justify-center max-w-[270px] w-full sm:min-h-[270px] p-4">
          <Image src={item.image_url} alt="" width={250} height={250} />

          <div className="absolute left-0 bottom-0 translate-y-full w-full flex items-center justify-center gap-2.5 pb-5 ease-linear duration-200 group-hover:translate-y-0">
            <button
              onClick={() => {
                openModal()
                handleQuickViewUpdate()
              }}
              className="inline-flex font-medium text-custom-sm py-[7px] px-5 rounded-[5px] bg-blue text-white ease-out duration-200 hover:bg-blue-dark"
            >
              View
            </button>
          </div>
        </div>

        <div className="w-full flex flex-col gap-5 sm:flex-row sm:items-center justify-center sm:justify-between py-5 px-4 sm:px-7.5 lg:pl-11 lg:pr-12">
          <div>
            <h3 className="font-medium text-dark ease-out duration-200 hover:text-blue mb-1.5">
              <Link href="/shop-details"> {item.nama_barang} </Link>
            </h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleListItem
