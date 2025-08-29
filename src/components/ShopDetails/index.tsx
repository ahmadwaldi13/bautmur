'use client'
import React, { use, useEffect, useState } from 'react'
import Breadcrumb from '../Common/Breadcrumb'
import Image from 'next/image'
import RecentlyViewdItems from './RecentlyViewd'
import { usePreviewSlider } from '@/app/context/PreviewSliderContext'
import axios from 'axios'

const TOKEN = process.env.NEXT_PUBLIC_API_TOKEN

const ShopDetails = ({ product }) => {
  const { openPreviewModal } = usePreviewSlider()
  const [previewImg, setPreviewImg] = useState(0)

  const [activeTab, setActiveTab] = useState('tabOne')

  const [activePromo, setActivePromo] = useState(null)
  const [isPromoLoading, setIsPromoLoading] = useState(true)

  // useEffect untuk memeriksa promo (logika ini tetap sama)
  useEffect(() => {
    const checkPromo = async () => {
      if (!product) return
      setIsPromoLoading(true)
      try {
        const API_URL = `http://api.bautmur.id/api/v1/website/promos/banner`
        const response = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${TOKEN}` },
        })

        const promoData = response.data.data

        if (promoData && promoData.banner_active) {
          const promoItem = promoData.items.find(
            (item) => item.barang_id === product.id
          )
          if (promoItem) {
            // Log hanya akan jalan SEKALI setiap kali promo baru ditemukan
            console.log('DATA PROMO DITEMUKAN DAN DISIMPAN:', promoItem)
            setActivePromo({
              ...promoItem,
              settings: promoData.settings,
            })
          }
        }
      } catch (error) {
        console.error('Gagal memeriksa data promo:', error)
      } finally {
        setIsPromoLoading(false)
      }
    }

    checkPromo()
  }, [product])

  const tabs = [
    {
      id: 'tabOne',
      title: 'Additional Information',
    },
  ]

  const isValidProduct = (prod) => {
    return (
      prod &&
      prod.nama_barang &&
      prod.nama_barang.trim() !== '' &&
      prod.id !== 0 &&
      prod.image_url
    )
  }

  const handlePreviewSlider = () => {
    openPreviewModal()
  }
  if (!isValidProduct(product)) {
    return (
      <>
        <div className="text-center py-20">
          <p>Please add product</p>
          <p className="text-sm text-gray-500 mt-2">
            No valid product data found
          </p>
        </div>
      </>
    )
  }

  const breadcrumbPages = [
    { title: 'Home', path: '/' },
    { title: 'Products', path: '/products' },
  ]

  if (product.j_markets && product.j_markets.length > 0) {
    const primaryCategory = product.j_markets[0]
    const categorySlug = primaryCategory.nama.toLowerCase().replace(/\s+/g, '-')

    breadcrumbPages.push({
      title: primaryCategory.nama,
      path: `/products/${categorySlug}/${primaryCategory.id}`,
    })
  }

  breadcrumbPages.push({
    title: product.nama_barang,
    path: `/product/${product.slug}/${product.id}`,
  })

  const primaryCategoryId = product.j_markets?.[0]?.id
  const currentProductId = product.id

  return (
    <>
      <Breadcrumb title={'product detail'} pages={breadcrumbPages} />
      {product.title === '' ? (
        'Please add product'
      ) : (
        <>
          <section className="overflow-hidden relative pb-20 pt-24 md:pt-28 lg:pt-32">
            <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
              <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-17.5">
                <div className="lg:max-w-[570px] w-full">
                  <div className="lg:min-h-[512px] rounded-lg shadow-1 bg-gray-2 p-4 sm:p-7.5 relative flex items-center justify-center">
                    <div>
                      <button
                        onClick={handlePreviewSlider}
                        aria-label="button for zoom"
                        className="gallery__Image w-11 h-11 rounded-[5px] bg-gray-1 shadow-1 flex items-center justify-center ease-out duration-200 text-dark hover:text-blue absolute top-4 lg:top-6 right-4 lg:right-6 z-50"
                      >
                        <svg
                          className="fill-current"
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M9.11493 1.14581L9.16665 1.14581C9.54634 1.14581 9.85415 1.45362 9.85415 1.83331C9.85415 2.21301 9.54634 2.52081 9.16665 2.52081C7.41873 2.52081 6.17695 2.52227 5.23492 2.64893C4.31268 2.77292 3.78133 3.00545 3.39339 3.39339C3.00545 3.78133 2.77292 4.31268 2.64893 5.23492C2.52227 6.17695 2.52081 7.41873 2.52081 9.16665C2.52081 9.54634 2.21301 9.85415 1.83331 9.85415C1.45362 9.85415 1.14581 9.54634 1.14581 9.16665L1.14581 9.11493C1.1458 7.43032 1.14579 6.09599 1.28619 5.05171C1.43068 3.97699 1.73512 3.10712 2.42112 2.42112C3.10712 1.73512 3.97699 1.43068 5.05171 1.28619C6.09599 1.14579 7.43032 1.1458 9.11493 1.14581ZM16.765 2.64893C15.823 2.52227 14.5812 2.52081 12.8333 2.52081C12.4536 2.52081 12.1458 2.21301 12.1458 1.83331C12.1458 1.45362 12.4536 1.14581 12.8333 1.14581L12.885 1.14581C14.5696 1.1458 15.904 1.14579 16.9483 1.28619C18.023 1.43068 18.8928 1.73512 19.5788 2.42112C20.2648 3.10712 20.5693 3.97699 20.7138 5.05171C20.8542 6.09599 20.8542 7.43032 20.8541 9.11494V9.16665C20.8541 9.54634 20.5463 9.85415 20.1666 9.85415C19.787 9.85415 19.4791 9.54634 19.4791 9.16665C19.4791 7.41873 19.4777 6.17695 19.351 5.23492C19.227 4.31268 18.9945 3.78133 18.6066 3.39339C18.2186 3.00545 17.6873 2.77292 16.765 2.64893ZM1.83331 12.1458C2.21301 12.1458 2.52081 12.4536 2.52081 12.8333C2.52081 14.5812 2.52227 15.823 2.64893 16.765C2.77292 17.6873 3.00545 18.2186 3.39339 18.6066C3.78133 18.9945 4.31268 19.227 5.23492 19.351C6.17695 19.4777 7.41873 19.4791 9.16665 19.4791C9.54634 19.4791 9.85415 19.787 9.85415 20.1666C9.85415 20.5463 9.54634 20.8541 9.16665 20.8541H9.11494C7.43032 20.8542 6.09599 20.8542 5.05171 20.7138C3.97699 20.5693 3.10712 20.2648 2.42112 19.5788C1.73512 18.8928 1.43068 18.023 1.28619 16.9483C1.14579 15.904 1.1458 14.5696 1.14581 12.885L1.14581 12.8333C1.14581 12.4536 1.45362 12.1458 1.83331 12.1458ZM20.1666 12.1458C20.5463 12.1458 20.8541 12.4536 20.8541 12.8333V12.885C20.8542 14.5696 20.8542 15.904 20.7138 16.9483C20.5693 18.023 20.2648 18.8928 19.5788 19.5788C18.8928 20.2648 18.023 20.5693 16.9483 20.7138C15.904 20.8542 14.5696 20.8542 12.885 20.8541H12.8333C12.4536 20.8541 12.1458 20.5463 12.1458 20.1666C12.1458 19.787 12.4536 19.4791 12.8333 19.4791C14.5812 19.4791 15.823 19.4777 16.765 19.351C17.6873 19.227 18.2186 18.9945 18.6066 18.6066C18.9945 18.2186 19.227 17.6873 19.351 16.765C19.4777 15.823 19.4791 14.5812 19.4791 12.8333C19.4791 12.4536 19.787 12.1458 20.1666 12.1458Z"
                            fill=""
                          />
                        </svg>
                      </button>

                      <Image
                        src={product.image_url || '/images/placeholder.png'}
                        alt={product.nama_barang || 'image'}
                        width={400}
                        height={400}
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  </div>

                  {/* ?  &apos;border-blue &apos; :  &apos;border-transparent&apos; */}
                  <div className="flex flex-wrap sm:flex-nowrap gap-4.5 mt-6 p-3">
                    <button
                      onClick={() => setPreviewImg(product.id)}
                      key={product.id}
                      className={`flex items-center justify-center w-15 sm:w-25 h-15 sm:h-25 overflow-hidden rounded-lg bg-gray-2 shadow-1 ease-out duration-200 border-2 hover:border-blue border-blue`}
                    >
                      <Image
                        width={50}
                        height={50}
                        src={product.image_url || '/images/placeholder.png'}
                        alt="thumbnail"
                        className="w-full h-auto object-contain"
                      />
                    </button>
                  </div>
                </div>

                {/* <!-- product content --> */}
                <div className="max-w-[539px] w-full">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="font-semibold text-xl sm:text-2xl xl:text-custom-3 text-dark">
                      {product.nama_barang}
                    </h2>

                    {!isPromoLoading && activePromo && (
                      <div className="inline-flex font-medium text-custom-sm text-white bg-blue rounded py-0.5 px-2.5">
                        {parseInt(activePromo.persentase_diskon)}% OFF
                      </div>
                    )}
                  </div>

                  <h3 className="font-medium text-custom-1 mb-4.5">
                    {!isPromoLoading && activePromo ? (
                      <>
                        {/* Tampilan JIKA ADA PROMO */}
                        <span className="text-dark font-bold">
                          Rp{' '}
                          {parseInt(activePromo.harga_promo).toLocaleString(
                            'id-ID'
                          )}
                        </span>
                        <span className="line-through text-gray-500 ml-3">
                          Rp{' '}
                          {parseInt(activePromo.harga_asal).toLocaleString(
                            'id-ID'
                          )}
                        </span>
                      </>
                    ) : (
                      <>
                        {/* Tampilan JIKA TIDAK ADA PROMO */}
                        <span className="text-dark font-bold">
                          Rp {product.harga?.toLocaleString('id-ID')}
                        </span>
                      </>
                    )}
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.3589 8.35863C13.603 8.11455 13.603 7.71882 13.3589 7.47475C13.1149 7.23067 12.7191 7.23067 12.4751 7.47475L8.75033 11.1995L7.5256 9.97474C7.28152 9.73067 6.8858 9.73067 6.64172 9.97474C6.39764 10.2188 6.39764 10.6146 6.64172 10.8586L8.30838 12.5253C8.55246 12.7694 8.94819 12.7694 9.19227 12.5253L13.3589 8.35863Z"
                          fill="#3C50E0"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10.0003 1.04169C5.05277 1.04169 1.04199 5.05247 1.04199 10C1.04199 14.9476 5.05277 18.9584 10.0003 18.9584C14.9479 18.9584 18.9587 14.9476 18.9587 10C18.9587 5.05247 14.9479 1.04169 10.0003 1.04169ZM2.29199 10C2.29199 5.74283 5.74313 2.29169 10.0003 2.29169C14.2575 2.29169 17.7087 5.74283 17.7087 10C17.7087 14.2572 14.2575 17.7084 10.0003 17.7084C5.74313 17.7084 2.29199 14.2572 2.29199 10Z"
                          fill="#3C50E0"
                        />
                      </svg>
                      <span className="text-gray-700">
                        Free delivery information available
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.3589 8.35863C13.603 8.11455 13.603 7.71882 13.3589 7.47475C13.1149 7.23067 12.7191 7.23067 12.4751 7.47475L8.75033 11.1995L7.5256 9.97474C7.28152 9.73067 6.8858 9.73067 6.64172 9.97474C6.39764 10.2188 6.39764 10.6146 6.64172 10.8586L8.30838 12.5253C8.55246 12.7694 8.94819 12.7694 9.19227 12.5253L13.3589 8.35863Z"
                          fill="#3C50E0"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10.0003 1.04169C5.05277 1.04169 1.04199 5.05247 1.04199 10C1.04199 14.9476 5.05277 18.9584 10.0003 18.9584C14.9479 18.9584 18.9587 14.9476 18.9587 10C18.9587 5.05247 14.9479 1.04169 10.0003 1.04169ZM2.29199 10C2.29199 5.74283 5.74313 2.29169 10.0003 2.29169C14.2575 2.29169 17.7087 5.74283 17.7087 10C17.7087 14.2572 14.2575 17.7084 10.0003 17.7084C5.74313 17.7084 2.29199 14.2572 2.29199 10Z"
                          fill="#3C50E0"
                        />
                      </svg>
                      <span className="text-gray-700">
                        Detailed product specifications
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.3589 8.35863C13.603 8.11455 13.603 7.71882 13.3589 7.47475C13.1149 7.23067 12.7191 7.23067 12.4751 7.47475L8.75033 11.1995L7.5256 9.97474C7.28152 9.73067 6.8858 9.73067 6.64172 9.97474C6.39764 10.2188 6.39764 10.6146 6.64172 10.8586L8.30838 12.5253C8.55246 12.7694 8.94819 12.7694 9.19227 12.5253L13.3589 8.35863Z"
                          fill="#3C50E0"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10.0003 1.04169C5.05277 1.04169 1.04199 5.05247 1.04199 10C1.04199 14.9476 5.05277 18.9584 10.0003 18.9584C14.9479 18.9584 18.9587 14.9476 18.9587 10C18.9587 5.05247 14.9479 1.04169 10.0003 1.04169ZM2.29199 10C2.29199 5.74283 5.74313 2.29169 10.0003 2.29169C14.2575 2.29169 17.7087 5.74283 17.7087 10C17.7087 14.2572 14.2575 17.7084 10.0003 17.7084C5.74313 17.7084 2.29199 14.2572 2.29199 10Z"
                          fill="#3C50E0"
                        />
                      </svg>
                      <span className="text-gray-700">
                        Product information and care guide
                      </span>
                    </div>
                    {product.diskripsi ?? (
                      <div className="mt-6">
                        <div className="bg-gray-100/70 rounded-lg">
                          <h6 className="font-semibold text-lg text-dark mb-2 mt-3">
                            Description
                          </h6>
                          <div className="prose prose-sm sm:prose-base max-w-none text-gray-700 leading-relaxed">
                            <p>{product.deskripsi}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="overflow-hidden bg-gray-2 py-20">
            <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
              {/* <!--== tab header start ==--> */}
              <div className="flex flex-wrap items-center bg-white rounded-[10px] shadow-1 gap-5 xl:gap-12.5 py-4.5 px-4 sm:px-6">
                {tabs.map((item, key) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(item.id)}
                    className={`font-medium lg:text-lg ease-out duration-200 hover:text-blue relative before:h-0.5 before:bg-blue before:absolute before:left-0 before:bottom-0 before:ease-out before:duration-200 hover:before:w-full ${
                      activeTab === item.id
                        ? 'text-blue before:w-full'
                        : 'text-dark before:w-0'
                    }`}
                  >
                    {item.title}
                  </button>
                ))}
              </div>

              {/* <!-- tab content two start --> */}
              <div>
                <div
                  className={`rounded-xl bg-white shadow-1 p-4 sm:p-6 mt-10 ${
                    activeTab === 'tabOne' ? 'block' : 'hidden'
                  }`}
                >
                  {/* */}
                  <div className="rounded-md even:bg-gray-1 flex py-4 px-4 sm:px-5">
                    <div className="max-w-[450px] min-w-[140px] w-full">
                      <p className="text-sm sm:text-base text-dark">Bahan</p>
                    </div>
                    <div className="w-full">
                      <p className="text-sm sm:text-base text-dark">
                        {product.bahan?.nama || '-'}
                      </p>
                    </div>
                  </div>

                  {/* */}
                  <div className="rounded-md even:bg-gray-1 flex py-4 px-4 sm:px-5">
                    <div className="max-w-[450px] min-w-[140px] w-full">
                      <p className="text-sm sm:text-base text-dark">Drat</p>
                    </div>
                    <div className="w-full">
                      <p className="text-sm sm:text-base text-dark">
                        {product.drat || '-'}
                      </p>
                    </div>
                  </div>

                  {/* */}
                  <div className="rounded-md even:bg-gray-1 flex py-4 px-4 sm:px-5">
                    <div className="max-w-[450px] min-w-[140px] w-full">
                      <p className="text-sm sm:text-base text-dark">Kemasan</p>
                    </div>
                    <div className="w-full">
                      <p className="text-sm sm:text-base text-dark">
                        {product.kemasan?.join(', ') || '-'}
                      </p>
                    </div>
                  </div>

                  {/* */}
                  <div className="rounded-md even:bg-gray-1 flex py-4 px-4 sm:px-5">
                    <div className="max-w-[450px] min-w-[140px] w-full">
                      <p className="text-sm sm:text-base text-dark">Kategori</p>
                    </div>
                    <div className="w-full">
                      <p className="text-sm sm:text-base text-dark">
                        {product.kategori?.nama_kategori || '-'}
                      </p>
                    </div>
                  </div>

                  {/* */}
                  <div className="rounded-md even:bg-gray-1 flex py-4 px-4 sm:px-5">
                    <div className="max-w-[450px] min-w-[140px] w-full">
                      <p className="text-sm sm:text-base text-dark">Jenis</p>
                    </div>
                    <div className="w-full">
                      <p className="text-sm sm:text-base text-dark">
                        {product.jenis?.nama || '-'}
                      </p>
                    </div>
                  </div>

                  {/* --- BARU: Menambahkan J-Market --- */}
                  <div className="rounded-md even:bg-gray-1 flex py-4 px-4 sm:px-5">
                    <div className="max-w-[450px] min-w-[140px] w-full">
                      <p className="text-sm sm:text-base text-dark">J-Market</p>
                    </div>
                    <div className="w-full">
                      <p className="text-sm sm:text-base text-dark">
                        {product.j_markets
                          ?.map((market) => market.nama)
                          .join(', ') || '-'}
                      </p>
                    </div>
                  </div>

                  {/* --- BARU: Menambahkan Sub J-Market --- */}
                  <div className="rounded-md even:bg-gray-1 flex py-4 px-4 sm:px-5">
                    <div className="max-w-[450px] min-w-[140px] w-full">
                      <p className="text-sm sm:text-base text-dark">
                        Sub J-Market
                      </p>
                    </div>
                    <div className="w-full">
                      <p className="text-sm sm:text-base text-dark">
                        {product.sub_j_markets
                          ?.map((sub) => sub.nama)
                          .join(', ') || '-'}
                      </p>
                    </div>
                  </div>

                  {/* */}
                  <div className="rounded-md even:bg-gray-1 flex py-4 px-4 sm:px-5">
                    <div className="max-w-[450px] min-w-[140px] w-full">
                      <p className="text-sm sm:text-base text-dark">Kunci</p>
                    </div>
                    <div className="w-full">
                      <p className="text-sm sm:text-base text-dark">
                        {product.kunci || '-'}
                      </p>
                    </div>
                  </div>

                  {/* */}
                  <div className="rounded-md even:bg-gray-1 flex py-4 px-4 sm:px-5">
                    <div className="max-w-[450px] min-w-[140px] w-full">
                      <p className="text-sm sm:text-base text-dark">SKU</p>
                    </div>
                    <div className="w-full">
                      <p className="text-sm sm:text-base text-dark">
                        {product.sku || '-'}
                      </p>
                    </div>
                  </div>

                  {/* */}
                  <div className="rounded-md even:bg-gray-1 flex py-4 px-4 sm:px-5">
                    <div className="max-w-[450px] min-w-[140px] w-full">
                      <p className="text-sm sm:text-base text-dark">
                        Nama Lain/Referensi
                      </p>
                    </div>
                    <div className="w-full">
                      <p className="text-sm sm:text-base text-dark">
                        {product.referensi || '-'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <RecentlyViewdItems
            primaryCategoryId={primaryCategoryId}
            currentProductId={product.id}
          />
        </>
      )}
    </>
  )
}

export default ShopDetails
