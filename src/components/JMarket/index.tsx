'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import axios from 'axios'
import Breadcrumb from '../Common/Breadcrumb'
import { useTranslation } from 'react-i18next'

interface DisplayJMarketItem {
  id: number
  nama: string
  image_url: string
  url: string
  deskripsi: string
}

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE

const API_URL = `${apiBaseUrl}/api/v1/website/jmarkets`
const TOKEN = process.env.NEXT_PUBLIC_API_TOKEN

const JMarket = () => {
  const { t } = useTranslation()

  const breadcrumbData = [
    { title: t('breadcrumb.home'), path: '/' },
    { title: t('breadcrumb.products'), path: '/products' },
  ]

  const [jmarkets, setJmarkets] = useState<DisplayJMarketItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!TOKEN) {
      setError('API Token tidak ditemukan di environment variables.')
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
        })

        const result = response.data

        if (result.success && Array.isArray(result.data)) {
          const transformedData: DisplayJMarketItem[] = result.data.map(
            (apiItem: any) => ({
              id: apiItem.id,
              nama: apiItem.nama,
              image_url: apiItem.image_url,
              url: apiItem.nama.replace(/\s+/g, '-').toLowerCase(),
              deskripsi: apiItem.deskripsi,
            })
          )
          setJmarkets(transformedData)
        } else {
          throw new Error('Format data dari API tidak sesuai')
        }
      } catch (err: any) {
        console.error('Terjadi kesalahan saat fetch JMarket:', err)
        if (axios.isAxiosError(err)) {
          setError(
            err.response?.data?.message ||
              err.message ||
              'Gagal terhubung ke server.'
          )
        } else {
          setError(err.message || 'Terjadi kesalahan yang tidak diketahui')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchJMarkets()
  }, [])

  const renderContent = () => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Skeleton Loader Sederhana */}
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="rounded-lg bg-white shadow-md">
              <div className="h-39 w-full animate-pulse rounded-t-lg bg-gray-300"></div>
              <div className="p-3">
                <div className="mx-auto h-6 w-3/4 animate-pulse rounded bg-gray-300"></div>
              </div>
            </div>
          ))}
        </div>
      )
    }

    // 2. Tampilan saat ERROR
    if (error) {
      return (
        <div className="text-center text-red-500">
          <p>{t('jmarketPage.errorTitle')}</p>
          <p>{error}</p>
        </div>
      )
    }

    // 3. Tampilan jika DATA KOSONG
    if (jmarkets.length === 0) {
      return (
        <div className="text-center text-gray-600">
          <p>{t('jmarketPage.emptyMessage')}</p>
        </div>
      )
    }

    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {jmarkets.map((jmarket) => (
          <Link
            key={jmarket.id}
            href={`/products/${jmarket.url}/${jmarket.id}`}
            className="group transform rounded-lg bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="relative flex h-39 items-center justify-center overflow-hidden rounded-t-lg bg-gray-100">
              <Image
                src={jmarket.image_url || '/images/products2/default.jpg'}
                alt={jmarket.nama || 'default'}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>

            <div className="p-3 text-center">
              <h6 className="text-xl font-bold text-dark transition-colors duration-300 group-hover:text-[#FB4141]">
                {t(`jmarkets.${jmarket.nama}`)}
              </h6>
            </div>
          </Link>
        ))}
      </div>
    )
  }

  return (
    <>
      <Breadcrumb title={t('breadcrumb.products')} pages={breadcrumbData} />
      <section className="overflow-hidden bg-gray-2 py-20">
        <div className="mx-auto w-full max-w-[1170px] px-4 sm:px-8 xl:px-0">
          {renderContent()}
        </div>
      </section>
    </>
  )
}

export default JMarket
