'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Breadcrumb from '../Common/Breadcrumb'
import axios from 'axios'
import { useTranslation } from 'react-i18next'

// Tipe data untuk item galeri
interface GalleryItem {
  id: number
  title: string
  image_url: string
  is_active: number
}

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE
const API_URL = `${apiBaseUrl}/api/v1/website/media-gallery`
const TOKEN = process.env.NEXT_PUBLIC_API_TOKEN
const ITEMS_PER_PAGE = 12

const Gallery = () => {
  const { t } = useTranslation()

  const [allGalleryItems, setAllGalleryItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const [currentPage, setCurrentPage] = useState<number>(1)

  const breadcrumbData = [
    { title: t('breadcrumb.home'), path: '/' },
    { title: t('breadcrumb.gallery'), path: '/gallery' },
  ]

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true)
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        })

        const activeItems = response.data.data.filter(
          (item: GalleryItem) => item.is_active === 1
        )

        setAllGalleryItems(activeItems)
      } catch (err) {
        setError('Gagal memuat galeri. Silakan coba lagi nanti.')
        console.error('Error fetching gallery data:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchGallery()
  }, [])

  const totalPages = Math.ceil(allGalleryItems.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentItems = allGalleryItems.slice(startIndex, endIndex)

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
      window.scrollTo(0, 0)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading gallery...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <p>{error}</p>
      </div>
    )
  }

  return (
    <>
      <Breadcrumb title={t('breadcrumb.gallery')} pages={breadcrumbData} />

      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentItems.map((image) => (
              <div
                key={image.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src={image.image_url}
                    alt={image.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              </div>
            ))}
          </div>

          {!loading && allGalleryItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Tidak ada gambar tersedia</p>
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-12 space-x-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white rounded-md shadow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              <span className="text-gray-700">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-white rounded-md shadow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default Gallery
