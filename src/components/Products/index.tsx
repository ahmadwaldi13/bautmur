'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CustomSelect from './CustomSelect'
import JmarketDropdown from './JmarketDropdown'
import SingleGridItem from '../Shop/SingleGridItem'
import SingleListItem from '../Shop/SingleListItem'
import CategoryDropdown from './CategoryDropdown'
import SubJmarketDropdown from './SubJmarketDropdown'
import SkeletonItem from '../Shop/SkeletonItem'
import { useSearchParams } from 'next/navigation'

const TOKEN = process.env.NEXT_PUBLIC_API_TOKEN
const ITEMS_PER_PAGE = 9

const ShopWithSidebar = ({ categoryId }) => {
  const searchParams = useSearchParams()

  const searchQuery = searchParams.get('q')

  const [productStyle, setProductStyle] = useState('grid')
  const [productSidebar, setProductSidebar] = useState(false)
  const [stickyMenu, setStickyMenu] = useState(false)

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  const [jmarketOptions, setJmarketOptions] = useState([])
  const [selectedJmarkets, setSelectedJmarkets] = useState<number[]>([])

  const [kategoriOptions, setKategoriOptions] = useState([])
  const [selectedKategoris, setSelectedKategoris] = useState<number[]>([])

  const [subJmarketOptions, setSubJmarketOptions] = useState([])
  const [selectedSubJmarkets, setSelectedSubJmarkets] = useState<number[]>([])

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const jmarketApiUrl = 'http://api.bautmur.id/api/v1/website/jmarkets'
        const kategoriApiUrl = 'http://api.bautmur.id/api/v1/website/kategoris'
        const subJmarketApiUrl =
          'http://api.bautmur.id/api/v1/website/sub-jmarkets'

        const [jmarketResponse, kategoriResponse, subJmarketResponse] =
          await Promise.all([
            axios.get(jmarketApiUrl, {
              headers: { Authorization: `Bearer ${TOKEN}` },
            }),
            axios.get(kategoriApiUrl, {
              headers: { Authorization: `Bearer ${TOKEN}` },
            }),
            axios.get(subJmarketApiUrl, {
              headers: { Authorization: `Bearer ${TOKEN}` },
            }),
          ])

        setJmarketOptions(jmarketResponse.data.data)
        setKategoriOptions(kategoriResponse.data.data)
        setSubJmarketOptions(subJmarketResponse.data.data)
      } catch (err) {
        console.error('Gagal mengambil opsi filter:', err)
      }
    }
    fetchFilterOptions()
  }, [])

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      setError(null)
      try {
        let API_URL = ''
        const filterFields = []

        if (searchQuery) {
          filterFields.push({ nama_barang: { like: searchQuery } })
        }

        if (selectedJmarkets.length > 0) {
          filterFields.push({ j_market_ids: { in: selectedJmarkets } })
        } else if (categoryId) {
          filterFields.push({ j_market_ids: { in: [parseInt(categoryId)] } })
        }
        if (selectedJmarkets.length > 0) {
          filterFields.push({ j_market_ids: { in: selectedJmarkets } })
        }
        if (selectedKategoris.length > 0) {
          filterFields.push({ kategori_ids: { in: selectedKategoris } })
        }
        if (selectedSubJmarkets.length > 0) {
          filterFields.push({ sub_j_market_ids: { in: selectedSubJmarkets } })
        }

        if (filterFields.length > 0) {
          const filterObject = { fields: filterFields, relation: 'and' }
          const encodedFilter = encodeURIComponent(JSON.stringify(filterObject))
          API_URL = `http://api.bautmur.id/api/v1/website/barangs?filter=${encodedFilter}&page=${currentPage}&limit=${ITEMS_PER_PAGE}`
        } else {
          API_URL = `http://api.bautmur.id/api/v1/website/barangs/jmarket/${categoryId}?page=${currentPage}&limit=${ITEMS_PER_PAGE}`
        }

        const response = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${TOKEN}` },
        })

        const responseData = response.data
        setProducts(responseData.data ?? [])
        setTotalPages(responseData.pagination?.last_page ?? 1)
        setTotalItems(responseData.pagination?.total ?? 0)
      } catch (err) {
        setError('Gagal mengambil data produk.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [
    categoryId,
    currentPage,
    selectedJmarkets,
    selectedKategoris,
    selectedSubJmarkets,
    searchQuery,
  ])

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
    window.scrollTo(0, 0)
  }

  // Handler untuk filter JMarket
  const handleJmarketChange = (jmarketId: number) => {
    setSelectedJmarkets((prev) =>
      prev.includes(jmarketId)
        ? prev.filter((id) => id !== jmarketId)
        : [...prev, jmarketId]
    )
    setCurrentPage(1)
  }

  // BARU: Handler untuk filter Kategori
  const handleKategoriChange = (kategoriId: number) => {
    setSelectedKategoris((prev) =>
      prev.includes(kategoriId)
        ? prev.filter((id) => id !== kategoriId)
        : [...prev, kategoriId]
    )
    setCurrentPage(1)
  }

  const handleSubJmarketChange = (subJmarketId: number) => {
    setSelectedSubJmarkets((prev) =>
      prev.includes(subJmarketId)
        ? prev.filter((id) => id !== subJmarketId)
        : [...prev, subJmarketId]
    )
    setCurrentPage(1)
  }

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

  const startItem = (currentPage - 1) * ITEMS_PER_PAGE + 1
  const endItem = Math.min(currentPage * ITEMS_PER_PAGE, totalItems)

  const handleClearFilters = () => {
    setSelectedJmarkets([])
    setSelectedKategoris([])
    setSelectedSubJmarkets([])

    setCurrentPage(1)
  }

  const options = [
    { label: 'Latest Products', value: '0' },
    { label: 'Best Selling', value: '1' },
    { label: 'Old Products', value: '2' },
  ]

  return (
    <>
      <section className="overflow-hidden relative pb-20 pt-5 lg:pt-20 xl:pt-28 bg-[#f3f4f6]">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex gap-7.5">
            <div
              className={`sidebar-content fixed xl:z-1 z-9999 left-0 top-0 xl:translate-x-0 xl:static max-w-[310px] xl:max-w-[270px] w-full ease-out duration-200 ${
                productSidebar
                  ? 'translate-x-0 bg-white p-5 h-screen overflow-y-auto'
                  : '-translate-x-full'
              }`}
            >
              <button
                onClick={() => setProductSidebar(!productSidebar)}
                aria-label="button for product sidebar toggle"
                className={`xl:hidden absolute -right-12.5 sm:-right-8 flex items-center justify-center w-8 h-8 rounded-md bg-white shadow-1 ${
                  stickyMenu
                    ? 'lg:top-24 sm:top-40 top-40' // <-- Angka ditambah
                    : 'lg:top-28 sm:top-44 top-44' // <-- Angka ditambah
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
                      <button
                        type="button"
                        className="text-red"
                        onClick={handleClearFilters}
                      >
                        Clean All
                      </button>
                    </div>
                  </div>
                  <JmarketDropdown
                    jmarkets={jmarketOptions}
                    selectedIds={selectedJmarkets}
                    onJmarketChange={handleJmarketChange}
                  />
                  <CategoryDropdown
                    categories={kategoriOptions}
                    selectedIds={selectedKategoris}
                    onCategoryChange={handleKategoriChange}
                  />
                  <SubJmarketDropdown
                    subJmarkets={subJmarketOptions}
                    selectedIds={selectedSubJmarkets}
                    onSubJmarketChange={handleSubJmarketChange}
                  />
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
                        {startItem}-{endItem}
                      </span>{' '}
                      of <span className="font-medium">{products.length}</span>{' '}
                      Products
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`${
                  productStyle === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-7.5 gap-y-9'
                    : 'flex flex-col gap-7.5'
                }`}
              >
                {loading ? (
                  Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                    <SkeletonItem key={index} />
                  ))
                ) : error ? (
                  <div className="col-span-full text-center text-red-500 bg-white p-10 rounded-lg shadow-md">
                    <h3 className="font-bold text-xl mb-2">
                      Terjadi Kesalahan
                    </h3>
                    <p>{error}</p>
                  </div>
                ) : products.length === 0 ? (
                  <div className="col-span-full text-center text-gray-600 bg-white p-10 rounded-lg shadow-md">
                    <p>Produk tidak ditemukan.</p>
                  </div>
                ) : (
                  products.map((item) =>
                    productStyle === 'grid' ? (
                      <SingleGridItem item={item} key={item.id} />
                    ) : (
                      <SingleListItem item={item} key={item.id} />
                    )
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
                        className="flex items-center justify-center w-8 h-9 ease-out duration-200 rounded-[3px] hover:text-white hover:bg-red-dark disabled:text-gray-400 disabled:cursor-not-allowed"
                      >
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

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (pageNumber) => (
                        <li key={pageNumber}>
                          <button
                            onClick={() => handlePageChange(pageNumber)}
                            className={`flex py-1.5 px-3.5 duration-200 rounded-[3px] ${
                              currentPage === pageNumber
                                ? 'bg-red text-white'
                                : 'hover:text-white hover:bg-red-dark'
                            }`}
                          >
                            {pageNumber}
                          </button>
                        </li>
                      )
                    )}

                    <li>
                      <button
                        aria-label="pagination right"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="flex items-center justify-center w-8 h-9 ease-out duration-200 rounded-[3px] hover:text-white hover:bg-red-dark disabled:text-gray-400 disabled:cursor-not-allowed"
                      >
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
