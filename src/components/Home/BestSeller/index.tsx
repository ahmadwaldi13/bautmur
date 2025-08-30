'use client'

import { useState, useEffect } from 'react'
import SingleItem from './SingleItem'
import Image from 'next/image'
import Link from 'next/link'
// import shopData from "@/components/Shop/shopData";
import bestSeller from '@/components/Shop/bestSeller'
import axios from 'axios'
import SingleItemSkeleton from './SingleItemSkeleton'

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE

const API_URL = `${apiBaseUrl}/api/v1/website/barangs`
const requestParams = {
  limit: 6,
}
const TOKEN = process.env.NEXT_PUBLIC_API_TOKEN

const BestSeller = () => {
  const [products, setProducts] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!TOKEN) {
      setError('API Token tidak ditemukan.')
      setLoading(false)
      return
    }

    const fetchJMarkets = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            'Content-Type': 'application/json',
          },
          params: requestParams,
        })

        const results = response.data

        if (results && Array.isArray(results.data)) {
          setProducts(results.data)
        } else {
          console.error(
            "Struktur data API tidak sesuai, properti 'data' tidak ditemukan atau bukan array.",
            results
          )
          setProducts([])
        }
      } catch (err: any) {
        console.error('Terjadi kesalahan saat fetch new product:', err)
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 401) {
            setError('Otorisasi gagal. Token Anda mungkin tidak valid.')
          } else {
            setError(err.response?.data?.message || err.message)
          }
        } else {
          setError('Terjadi kesalahan yang tidak diketahui')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchJMarkets()
  }, [])
  return (
    <section className="overflow-hidden pt-15">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        {/* <!-- section title --> */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <span className="flex items-center gap-2.5 font-medium text-dark mb-1.5">
              <Image
                src="/images/icons/icon-07.svg"
                alt="icon"
                width={17}
                height={17}
              />
              This Month
            </span>
            <h2 className="font-maven text-xl xl:text-heading-5 text-dark">
              Best Sellers
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7.5">
          {loading ? (
            // Tampilkan 4 skeleton sesuai limit
            Array.from({ length: 6 }).map((_, index) => (
              <SingleItemSkeleton key={index} />
            ))
          ) : error ? (
            <p className="col-span-full text-center text-red-500">{error}</p>
          ) : (
            products.map((item) => <SingleItem item={item} key={item.id} />)
          )}
        </div>

        <div className="text-center mt-12.5">
          <Link
            href="/products"
            className="inline-flex font-medium text-custom-sm py-3 px-7 sm:px-12.5 rounded-md border-gray-3 border bg-gray-1 text-dark ease-out duration-200 hover:bg-dark hover:text-white hover:border-transparent"
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  )
}

export default BestSeller
