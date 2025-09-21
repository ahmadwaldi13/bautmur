'use client'

import React, { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import CustomSelect from './CustomSelect'
import { menuData } from './menuData'
import Dropdown from './Dropdown'
import { useAppSelector } from '@/redux/store'
import { useSelector } from 'react-redux'
import { selectTotalPrice } from '@/redux/features/cart-slice'
import { useCartModalContext } from '@/app/context/CartSidebarModalContext'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
// import i18n from '../../../i18n'
import LanguageSwitcher from './LanguageSwtcher'
import LocationSwitcher from './LocationSwtcher'

const TOKEN = process.env.NEXT_PUBLIC_API_TOKEN
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE

const Header = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const { t } = useTranslation()

  const [searchQuery, setSearchQuery] = useState('')
  const [navigationOpen, setNavigationOpen] = useState(false)
  const [stickyMenu, setStickyMenu] = useState(false)
  const { openCartModal } = useCartModalContext()
  const [isSearching, setIsSearching] = useState(false)

  const [jmarketOptions, setJmarketOptions] = useState([])
  const [selectedJmarket, setSelectedJmarket] = useState('')

  const product = useAppSelector((state) => state.cartReducer.items)
  const totalPrice = useSelector(selectTotalPrice)

  const handleOpenCartModal = () => {
    openCartModal()
  }

  // Sticky menu
  const handleStickyMenu = () => {
    if (window.scrollY >= 80) {
      setStickyMenu(true)
    } else {
      setStickyMenu(false)
    }
  }

  const SpinnerIcon = () => (
    <svg
      className="animate-spin h-5 w-5 text-blue"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  )

  useEffect(() => {
    const fetchJmarketOptions = async () => {
      try {
        const API_URL = `${apiBaseUrl}/api/v1/website/jmarkets`
        const response = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${TOKEN}` },
        })

        const transformedOptions = response.data.data.map((item) => ({
          label: item.nama,
          value: item.id.toString(),
        }))
        setJmarketOptions(transformedOptions)

        if (transformedOptions.length > 0) {
          setSelectedJmarket(transformedOptions[0].value)
        }
      } catch (err) {
        console.error('Gagal mengambil opsi JMarket:', err)
      }
    }
    fetchJmarketOptions()
  }, [])

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const queryParam = new URLSearchParams()
    if (searchQuery.trim()) {
      queryParam.set('q', searchQuery.trim())
    }

    let destinationUrl = ''
    if (selectedJmarket) {
      const selectedOption = jmarketOptions.find(
        (opt) => opt.value === selectedJmarket
      )
      if (selectedOption) {
        const slug = selectedOption.label.replace(/\s+/g, '-').toLowerCase()
        destinationUrl = `/products/${slug}/${selectedJmarket}`
      }
    } else if (pathname.startsWith('/products/')) {
      const pathParts = pathname.split('/')
      if (pathParts.length > 2) {
        destinationUrl = pathname
      }
    }

    if (!destinationUrl) {
      destinationUrl = '/products'
    }

    router.push(`${destinationUrl}?${queryParam.toString()}`)
  }

  useEffect(() => {
    setIsSearching(false)
  }, [pathname, searchParams])

  useEffect(() => {
    window.addEventListener('scroll', handleStickyMenu)
  })

  return (
    <header
      className={`fixed left-0 top-0 w-full z-9999 bg-white transition-all ease-in-out duration-300 ${
        stickyMenu && 'shadow'
      }`}
    >
      <div className="max-w-[1170px] mx-auto px-4 sm:px-7.5 xl:px-0">
        <div
          className={`flex flex-col lg:flex-row gap-5 items-end lg:items-center xl:justify-between ease-out duration-200 ${
            stickyMenu ? 'py-4' : 'py-6'
          }`}
        >
          <div className="xl:w-auto flex-col sm:flex-row w-full flex sm:justify-between sm:items-center gap-5 sm:gap-10">
            <Link className="flex-shrink-0" href="/">
              <Image
                src="/images/logo/sinar-terang-logo.png"
                alt="Logo"
                width={219}
                height={36}
              />
            </Link>
            <div className="max-w-[475px] w-full">
              <form onSubmit={handleSearchSubmit}>
                <div className="flex items-center">
                  <CustomSelect
                    options={jmarketOptions}
                    value={selectedJmarket}
                    onChange={(newValue) => setSelectedJmarket(newValue)}
                  />

                  <div className="relative max-w-[333px] sm:min-w-[333px] w-full">
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 inline-block w-px h-5.5 bg-gray-4"></span>
                    <input
                      onChange={(e) => setSearchQuery(e.target.value)}
                      value={searchQuery}
                      type="search"
                      name="search"
                      id="search"
                      placeholder={t('search.placeholder')}
                      autoComplete="off"
                      className="custom-search w-full rounded-r-[5px] bg-gray-1 !border-l-0 border border-gray-3 py-2.5 pl-4 pr-10 outline-none ease-in duration-200"
                    />

                    <button
                      id="search-btn"
                      aria-label="Search"
                      className="flex items-center justify-center absolute right-3 top-1/2 -translate-y-1/2 ease-in duration-200 hover:text-blue"
                    >
                      {isSearching ? (
                        <SpinnerIcon />
                      ) : (
                        <svg
                          className="fill-current"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17.2687 15.6656L12.6281 11.8969C14.5406 9.28123 14.3437 5.5406 11.9531 3.1781C10.6875 1.91248 8.99995 1.20935 7.19995 1.20935C5.39995 1.20935 3.71245 1.91248 2.44683 3.1781C-0.168799 5.79373 -0.168799 10.0687 2.44683 12.6844C3.71245 13.95 5.39995 14.6531 7.19995 14.6531C8.91558 14.6531 10.5187 14.0062 11.7843 12.8531L16.4812 16.65C16.5937 16.7344 16.7343 16.7906 16.875 16.7906C17.0718 16.7906 17.2406 16.7062 17.3531 16.5656C17.5781 16.2844 17.55 15.8906 17.2687 15.6656ZM7.19995 13.3875C5.73745 13.3875 4.38745 12.825 3.34683 11.7844C1.20933 9.64685 1.20933 6.18748 3.34683 4.0781C4.38745 3.03748 5.73745 2.47498 7.19995 2.47498C8.66245 2.47498 10.0125 3.03748 11.0531 4.0781C13.1906 6.2156 13.1906 9.67498 11.0531 11.7844C10.0406 12.825 8.66245 13.3875 7.19995 13.3875Z"
                            fill=""
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* <!-- header top right --> */}
          <div className="flex w-full lg:w-auto items-center gap-7.5">
            <div className="flex w-full lg:w-auto justify-end items-center gap-5">
              <div className="flex items-center gap-5">
                {/* <nav className="flex items-center gap-2.5">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <ul className="flex xl:items-center flex-col xl:flex-row gap-5 xl:gap-6">
                    {menuLocation.map((menuItem, i) =>
                      menuItem.submenu ? (
                        <DropdownForHead
                          key={i}
                          menuItem={menuItem}
                          stickyMenu={stickyMenu}
                        />
                      ) : (
                        <li
                          key={i}
                          className="group relative before:w-0 before:h-[3px]  before:absolute before:left-0 before:top-0 before:rounded-b-[3px] before:ease-out before:duration-200 hover:before:w-full "
                        >
                          <Link
                            href={menuItem.path}
                            className={`hover:text-blue text-custom-sm font-medium text-dark flex ${
                              stickyMenu ? 'xl:py-4' : 'xl:py-6'
                            }`}
                          >
                            {menuItem.title}
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                </nav> */}

                <nav>
                  <ul className="flex xl:items-center flex-col xl:flex-row gap-5 xl:gap-6">
                    <LocationSwitcher stickyMenu={stickyMenu} />
                  </ul>
                </nav>

                <span className="hidden xl:block w-px h-7.5 bg-gray-4"></span>

                <nav>
                  <ul className="flex xl:items-center flex-col xl:flex-row gap-5 xl:gap-6">
                    <LanguageSwitcher stickyMenu={stickyMenu} />
                  </ul>
                </nav>
              </div>
              <button
                id="Toggle"
                aria-label="Toggler"
                className="xl:hidden block"
                onClick={() => setNavigationOpen(!navigationOpen)}
              >
                <span className="block relative cursor-pointer w-5.5 h-5.5">
                  <span className="du-block absolute right-0 w-full h-full">
                    <span
                      className={`block relative top-0 left-0 bg-dark rounded-sm w-0 h-0.5 my-1 ease-in-out duration-200 delay-[0] ${
                        !navigationOpen && '!w-full delay-300'
                      }`}
                    ></span>
                    <span
                      className={`block relative top-0 left-0 bg-dark rounded-sm w-0 h-0.5 my-1 ease-in-out duration-200 delay-150 ${
                        !navigationOpen && '!w-full delay-400'
                      }`}
                    ></span>
                    <span
                      className={`block relative top-0 left-0 bg-dark rounded-sm w-0 h-0.5 my-1 ease-in-out duration-200 delay-200 ${
                        !navigationOpen && '!w-full delay-500'
                      }`}
                    ></span>
                  </span>

                  <span className="block absolute right-0 w-full h-full rotate-45">
                    <span
                      className={`block bg-dark rounded-sm ease-in-out duration-200 delay-300 absolute left-2.5 top-0 w-0.5 h-full ${
                        !navigationOpen && '!h-0 delay-[0] '
                      }`}
                    ></span>
                    <span
                      className={`block bg-dark rounded-sm ease-in-out duration-200 delay-400 absolute left-0 top-2.5 w-full h-0.5 ${
                        !navigationOpen && '!h-0 dealy-200'
                      }`}
                    ></span>
                  </span>
                </span>
              </button>
              {/* //   <!-- Hamburger Toggle BTN --> */}
            </div>
          </div>
        </div>
        {/* <!-- header top end --> */}
      </div>

      <div className="border-t border-gray-3">
        <div className="max-w-[1170px] mx-auto px-4 sm:px-7.5 xl:px-0">
          <div className="flex items-center justify-between">
            <div
              className={`w-[288px] absolute right-4 top-full xl:static xl:w-auto h-0 xl:h-auto invisible xl:visible xl:flex items-center justify-between ${
                navigationOpen &&
                `!visible bg-white shadow-lg border border-gray-3 !h-auto max-h-[400px] overflow-y-scroll rounded-md p-5`
              }`}
            >
              <nav>
                <ul className="font-maven flex xl:items-center flex-col xl:flex-row gap-5 xl:gap-6">
                  {menuData.map((menuItem, i) =>
                    menuItem.submenu ? (
                      <Dropdown
                        key={i}
                        menuItem={menuItem}
                        stickyMenu={stickyMenu}
                      />
                    ) : (
                      <li
                        key={i}
                        className="group relative before:w-0 before:h-[3px] before:bg-[#FB4141] before:absolute before:left-0 before:top-0 before:rounded-b-[3px] before:ease-out before:duration-200 hover:before:w-full "
                      >
                        <Link
                          href={menuItem.path}
                          className={`hover:text-[#FB4141] text-custom-sm font-medium text-dark flex ${
                            stickyMenu ? 'xl:py-4' : 'xl:py-6'
                          }`}
                        >
                          {t(menuItem.titleKey)}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
