'use client'
import React, { useState, useEffect } from 'react'

// Import komponen-komponen UI Anda
import CustomSelect from './CustomSelect'
import CategoryDropdown from './CategoryDropdown'
import GenderDropdown from './GenderDropdown'
import SizeDropdown from './SizeDropdown'
import ColorsDropdwon from './ColorsDropdwon'
import PriceDropdown from './PriceDropdown'
import SingleGridItem from '../Shop/SingleGridItem'
import SingleListItem from '../Shop/SingleListItem'
// import shopData from '../Shop/shopData' // <-- 2. Hapus atau komentari import data statis

//                  👇 1. Menerima 'products' sebagai prop
const ShopWithSidebar = ({ products }) => {
  const [productStyle, setProductStyle] = useState('grid')
  const [productSidebar, setProductSidebar] = useState(false)
  const [stickyMenu, setStickyMenu] = useState(false)

  // Semua state dan useEffect lainnya bisa tetap sama
  useEffect(() => {
    const handleStickyMenu = () => {
      if (window.scrollY >= 80) setStickyMenu(true)
      else setStickyMenu(false)
    }
    window.addEventListener('scroll', handleStickyMenu)

    function handleClickOutside(event: MouseEvent) {
      if (!(event.target as HTMLElement).closest('.sidebar-content')) {
        setProductSidebar(false)
      }
    }
    if (productSidebar)
      document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [productSidebar])

  // Data untuk filter bisa dibiarkan statis untuk sementara
  const options = [
    { label: 'Latest Products', value: '0' },
    { label: 'Best Selling', value: '1' },
    { label: 'Old Products', value: '2' },
  ]
  const jmarket = [
    {
      name: 'Kontraktor',
      products: 10,
    },
    {
      name: 'Manufaktur',
      products: 5,
    },
    {
      name: 'Toko',
      products: 15,
    },
    {
      name: 'Bengkel',
      products: 4,
    },
    {
      name: 'Subagen',
      products: 2,
    },
  ]
  const subJmarket = [
    {
      name: 'Aluminium',
      products: 10,
    },
    {
      name: 'Kaca',
      products: 12,
    },
    {
      name: 'Besi',
      products: 11,
    },
    {
      name: 'Spare Part',
      products: 20,
    },
    {
      name: 'Bangunan',
      products: 30,
    },
  ]

  return (
    <>
      {/* 3. Breadcrumb dihapus dari sini, karena akan dikelola oleh Halaman Induk */}
      <section className="overflow-hidden relative pb-20 pt-5 lg:pt-20 xl:pt-28 bg-[#f3f4f6]">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex gap-7.5">
            {/* */}
            <div
              className={`sidebar-content fixed xl:z-1 z-9999 left-0 top-0 xl:translate-x-0 xl:static max-w-[310px] xl:max-w-[270px] w-full ease-out duration-200 ${
                productSidebar
                  ? 'translate-x-0 bg-white p-5 h-screen overflow-y-auto'
                  : '-translate-x-full'
              }`}
            >
              {/* Tombol Toggle Sidebar... */}
              <button
                onClick={() => setProductSidebar(!productSidebar)}
                aria-label="button for product sidebar toggle"
                className={`xl:hidden absolute -right-12.5 sm:-right-8 flex items-center justify-center w-8 h-8 rounded-md bg-white shadow-1 ${
                  stickyMenu
                    ? 'lg:top-20 sm:top-34.5 top-35'
                    : 'lg:top-24 sm:top-39 top-37'
                }`}
              >
                <svg
                  className="fill-current"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.0068 3.44714C10.3121 3.72703 10.3328 4.20146 10.0529 4.5068L5.70494 9.25H20C20.4142 9.25 20.75 9.58579 20.75 10C20.75 10.4142 20.4142 10.75 20 10.75H4.00002C3.70259 10.75 3.43327 10.5742 3.3135 10.302C3.19374 10.0298 3.24617 9.71246 3.44715 9.49321L8.94715 3.49321C9.22704 3.18787 9.70147 3.16724 10.0068 3.44714Z"
                    fill=""
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M20.6865 13.698C20.5668 13.4258 20.2974 13.25 20 13.25L4.00001 13.25C3.5858 13.25 3.25001 13.5858 3.25001 14C3.25001 14.4142 3.5858 14.75 4.00001 14.75L18.2951 14.75L13.9472 19.4932C13.6673 19.7985 13.6879 20.273 13.9932 20.5529C14.2986 20.8328 14.773 20.8121 15.0529 20.5068L20.5529 14.5068C20.7539 14.2876 20.8063 13.9703 20.6865 13.698Z"
                    fill=""
                  />
                </svg>
              </button>

              <form onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col gap-6">
                  <div className="bg-white shadow-1 rounded-lg py-4 px-5">
                    <div className="flex items-center justify-between">
                      <p>Filters:</p>
                      <button className="text-blue">Clean All</button>
                    </div>
                  </div>
                  {/* ... Filter-filter Anda ... */}
                  <CategoryDropdown categories={jmarket} />
                  <GenderDropdown genders={subJmarket} />
                  {/* <SizeDropdown /> */}
                  {/* <ColorsDropdwon /> */}
                  {/* <PriceDropdown /> */}
                </div>
              </form>
            </div>
            {/* */}

            {/* */}
            <div className="xl:max-w-[870px] w-full">
              <div className="rounded-lg bg-white shadow-1 pl-3 pr-2.5 py-2.5 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap items-center gap-4">
                    <CustomSelect options={options} />
                    <p>
                      {/* 👇 5. Jumlah produk dibuat dinamis */}
                      Showing{' '}
                      <span className="text-dark">
                        {products.length} of {products.length}
                      </span>{' '}
                      Products
                    </p>
                  </div>
                  {/* ... Tombol Grid/List ... */}
                </div>
              </div>

              {/* */}
              <div
                className={`${
                  productStyle === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-7.5 gap-y-9'
                    : 'flex flex-col gap-7.5'
                }`}
              >
                {/* 👇 4. Gunakan 'products' dari props untuk me-render daftar */}
                {products &&
                  products.map((item, key) =>
                    productStyle === 'grid' ? (
                      <SingleGridItem item={item} key={key} />
                    ) : (
                      <SingleListItem item={item} key={key} />
                    )
                  )}
              </div>

              {/* ... Pagination ... */}
            </div>
            {/* */}
          </div>
        </div>
      </section>
    </>
  )
}

export default ShopWithSidebar
