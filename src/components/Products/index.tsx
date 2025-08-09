'use client'
import React, { useState, useEffect } from 'react'

// Import komponen-komponen UI Anda
import CustomSelect from './CustomSelect'
import CategoryDropdown from './CategoryDropdown'
import GenderDropdown from './GenderDropdown'
import SingleGridItem from '../Shop/SingleGridItem'
import SingleListItem from '../Shop/SingleListItem'

const ShopWithSidebar = ({ products }) => {
  const [productStyle, setProductStyle] = useState('grid')
  const [productSidebar, setProductSidebar] = useState(false)
  const [stickyMenu, setStickyMenu] = useState(false)

  const itemsWithDuplicateKey = products.filter((p) => p.id === 12)

  if (itemsWithDuplicateKey.length > 1) {
    console.error(
      'DEBUG: DITEMUKAN PRODUK DUPLIKAT DENGAN ID 12!',
      itemsWithDuplicateKey
    )
  }

  // =================================================================
  // START: STATE DAN LOGIKA UNTUK PAGINATION
  // =================================================================
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 9 // Tentukan berapa produk per halaman. Sesuaikan jika perlu.

  // Kalkulasi untuk menentukan item mana yang akan ditampilkan
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem)

  // Kalkulasi jumlah total halaman
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE)

  // Fungsi untuk mengubah halaman
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
    window.scrollTo(0, 0) // Scroll ke atas setiap ganti halaman
  }
  // =================================================================
  // END: STATE DAN LOGIKA UNTUK PAGINATION
  // =================================================================

  useEffect(() => {
    const handleStickyMenu = () => {
      if (window.scrollY >= 80) setStickyMenu(true)
      else setStickyMenu(false)
    }
    window.addEventListener('scroll', handleStickyMenu)

    function handleClickOutside(event) {
      if (!event.target.closest('.sidebar-content')) {
        setProductSidebar(false)
      }
    }
    if (productSidebar)
      document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [productSidebar])

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
    // ... data lainnya
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
    // ... data lainnya
  ]

  return (
    <>
      <section className="overflow-hidden relative pb-20 pt-5 lg:pt-20 xl:pt-28 bg-[#f3f4f6]">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex gap-7.5">
            {/* Sidebar */}
            <div
              className={`sidebar-content fixed xl:z-1 z-9999 left-0 top-0 xl:translate-x-0 xl:static max-w-[310px] xl:max-w-[270px] w-full ease-out duration-200 ${
                productSidebar
                  ? 'translate-x-0 bg-white p-5 h-screen overflow-y-auto'
                  : '-translate-x-full'
              }`}
            >
              {/* Konten Sidebar Anda ... */}
              <button
                onClick={() => setProductSidebar(!productSidebar)}
                aria-label="button for product sidebar toggle"
                className={`xl:hidden absolute -right-12.5 sm:-right-8 flex items-center justify-center w-8 h-8 rounded-md bg-white shadow-1 ${
                  stickyMenu
                    ? 'lg:top-20 sm:top-34.5 top-35'
                    : 'lg:top-24 sm:top-39 top-37'
                }`}
              >
                {/* SVG Icon */}
              </button>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col gap-6">
                  <div className="bg-white shadow-1 rounded-lg py-4 px-5">
                    <div className="flex items-center justify-between">
                      <p>Filters:</p>
                      <button className="text-blue">Clean All</button>
                    </div>
                  </div>
                  <CategoryDropdown categories={jmarket} />
                  <GenderDropdown genders={subJmarket} />
                </div>
              </form>
            </div>

            {/* Konten Utama Toko */}
            <div className="xl:max-w-[870px] w-full">
              <div className="rounded-lg bg-white shadow-1 pl-3 pr-2.5 py-2.5 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap items-center gap-4">
                    <CustomSelect options={options} />
                    <p>
                      {/* UPDATE: Teks jumlah produk dinamis */}
                      Showing{' '}
                      <span className="text-dark font-medium">
                        {indexOfFirstItem + 1}-
                        {Math.min(indexOfLastItem, products.length)}
                      </span>{' '}
                      of <span className="font-medium">{products.length}</span>{' '}
                      Products
                    </p>
                  </div>
                  {/* Tombol Grid/List ... */}
                </div>
              </div>

              {/* Grid/List Produk */}
              <div
                className={`${
                  productStyle === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-7.5 gap-y-9'
                    : 'flex flex-col gap-7.5'
                }`}
              >
                {/* UPDATE: Gunakan 'currentItems' untuk render produk */}
                {currentItems &&
                  currentItems.map(
                    (
                      item // Anda bahkan tidak perlu 'key' dari map lagi
                    ) =>
                      productStyle === 'grid' ? (
                        <SingleGridItem item={item} key={item.id} />
                      ) : (
                        <SingleListItem item={item} key={item.id} />
                      )
                  )}
              </div>

              {/* UPDATE: Tombol pagination dinamis */}
              <div className="flex justify-center mt-15">
                <div className="bg-white shadow-1 rounded-md p-2">
                  <ul className="flex items-center">
                    {/* Tombol Previous */}
                    <li>
                      <button
                        aria-label="pagination left"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="flex items-center justify-center w-8 h-9 ease-out duration-200 rounded-[3px] hover:text-white hover:bg-blue disabled:text-gray-400 disabled:cursor-not-allowed"
                      >
                        {/* SVG Left Arrow */}
                        <svg
                          className="fill-current"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                        >
                          <path d="M12.1782 16.1156C12.0095 16.1156 11.8407 16.0594 11.7282 15.9187L5.37197 9.45C5.11885 9.19687 5.11885 8.80312 5.37197 8.55L11.7282 2.08125C11.9813 1.82812 12.3751 1.82812 12.6282 2.08125C12.8813 2.33437 12.8813 2.72812 12.6282 2.98125L6.72197 9L12.6563 15.0187C12.9095 15.2719 12.9095 15.6656 12.6563 15.9187C12.4876 16.0312 12.347 16.1156 12.1782 16.1156Z" />
                        </svg>
                      </button>
                    </li>

                    {/* Loop untuk Nomor Halaman */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (pageNumber) => (
                        <li key={pageNumber}>
                          <button
                            onClick={() => handlePageChange(pageNumber)}
                            className={`flex py-1.5 px-3.5 duration-200 rounded-[3px] ${
                              currentPage === pageNumber
                                ? 'bg-blue text-white'
                                : 'hover:text-white hover:bg-blue'
                            }`}
                          >
                            {pageNumber}
                          </button>
                        </li>
                      )
                    )}

                    {/* Tombol Next */}
                    <li>
                      <button
                        aria-label="pagination right"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="flex items-center justify-center w-8 h-9 ease-out duration-200 rounded-[3px] hover:text-white hover:bg-blue disabled:text-gray-400 disabled:cursor-not-allowed"
                      >
                        {/* SVG Right Arrow */}
                        <svg
                          className="fill-current"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                        >
                          <path d="M5.82197 16.1156C5.65322 16.1156 5.5126 16.0594 5.37197 15.9469C5.11885 15.6937 5.11885 15.3 5.37197 15.0469L11.2782 9L5.37197 2.98125C5.11885 2.72812 5.11885 2.33437 5.37197 2.08125C5.6251 1.82812 6.01885 1.82812 6.27197 2.08125L12.6282 8.55C12.8813 8.80312 12.8813 9.19687 12.6282 9.45L6.27197 15.9187C6.15947 16.0312 5.99072 16.1156 5.82197 16.1156Z" />
                        </svg>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ShopWithSidebar
