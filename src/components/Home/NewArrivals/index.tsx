'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ProductItem from '@/components/Common/ProductItem'
import { useState, useEffect } from 'react'
import axios from 'axios'

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE

const API_URL = `${apiBaseUrl}/api/v1/website/barangs`
const requestParams = {
  limit: 8,
  sort_by: JSON.stringify({ created_at: -1 }),
}
const TOKEN = process.env.NEXT_PUBLIC_API_TOKEN

const NewArrival = () => {
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
        <div className="mb-7 flex items-center justify-between">
          <div>
            <span className="flex items-center gap-2.5 font-medium text-dark mb-1.5">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.11826 15.4622C4.11794 16.6668 5.97853 16.6668 9.69971 16.6668H10.3007C14.0219 16.6668 15.8825 16.6668 16.8821 15.4622M3.11826 15.4622C2.11857 14.2577 2.46146 12.429 3.14723 8.77153C3.63491 6.17055 3.87875 4.87006 4.8045 4.10175M3.11826 15.4622C3.11826 15.4622 3.11826 15.4622 3.11826 15.4622ZM16.8821 15.4622C17.8818 14.2577 17.5389 12.429 16.8532 8.77153C16.3655 6.17055 16.1216 4.87006 15.1959 4.10175M16.8821 15.4622C16.8821 15.4622 16.8821 15.4622 16.8821 15.4622ZM15.1959 4.10175C14.2701 3.33345 12.947 3.33345 10.3007 3.33345H9.69971C7.0534 3.33345 5.73025 3.33345 4.8045 4.10175M15.1959 4.10175C15.1959 4.10175 15.1959 4.10175 15.1959 4.10175ZM4.8045 4.10175C4.8045 4.10175 4.8045 4.10175 4.8045 4.10175Z"
                  stroke="#3C50E0"
                  strokeWidth="1.5"
                />
                <path
                  d="M7.64258 6.66678C7.98578 7.63778 8.91181 8.33345 10.0003 8.33345C11.0888 8.33345 12.0149 7.63778 12.3581 6.66678"
                  stroke="#3C50E0"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              This Week’s
            </span>
            <h2 className="font-maven text-xl xl:text-heading-5 text-dark">
              New Arrivals
            </h2>
          </div>

          <Link
            href="/products"
            className="inline-flex font-medium text-custom-sm py-2.5 px-7 rounded-md border-gray-3 border bg-gray-1 text-dark ease-out duration-200 hover:bg-dark hover:text-white hover:border-transparent"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-7.5 gap-y-9">
          {loading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-300 rounded-lg aspect-[3/4]"></div>
                <div className="mt-2 h-4 w-3/4 bg-gray-300 rounded"></div>
                <div className="mt-1 h-5 w-1/2 bg-gray-300 rounded"></div>
              </div>
            ))
          ) : error ? (
            <p className="col-span-full text-center text-red-500">{error}</p>
          ) : (
            products.map((item: any) => (
              <ProductItem key={item.id} item={item} />
            ))
          )}
        </div>
      </div>
    </section>
  )
}

export default NewArrival
