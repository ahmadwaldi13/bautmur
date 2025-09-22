'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ProductItem from '@/components/Common/ProductItem'
import SkeletonGridItem from './SkeletonGridItem'
import { useTranslation } from 'react-i18next'

const TOKEN = process.env.NEXT_PUBLIC_API_TOKEN
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE

const RecentlyViewdItems = ({ primaryCategoryId, currentProductId }) => {
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { t } = useTranslation()

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!primaryCategoryId) {
        setLoading(false)
        return
      }

      setLoading(true)
      try {
        const relatedApiUrl = `${apiBaseUrl}/api/v1/website/barangs/jmarket/${primaryCategoryId}?limit=9`
        const relatedResponse = await axios.get(relatedApiUrl, {
          headers: { Authorization: `Bearer ${TOKEN}` },
        })

        let related = (relatedResponse.data.data ?? []).filter(
          (p) => p.id !== currentProductId
        )

        let finalProducts = related.slice(0, 8)

        if (finalProducts.length < 8) {
          const fallbackApiUrl = `${apiBaseUrl}/api/v1/website/barangs?limit=20`

          const fallbackResponse = await axios.get(fallbackApiUrl, {
            headers: { Authorization: `Bearer ${TOKEN}` },
          })

          const existingIds = new Set(finalProducts.map((p) => p.id))
          existingIds.add(currentProductId)

          const fallbackProducts = (fallbackResponse.data.data ?? []).filter(
            (p) => !existingIds.has(p.id)
          )

          finalProducts = [...finalProducts, ...fallbackProducts].slice(0, 8)
        }

        setRelatedProducts(finalProducts)
      } catch (error) {
        console.error('Gagal mengambil produk terkait:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRelatedProducts()
  }, [primaryCategoryId, currentProductId])

  if (!loading && relatedProducts.length === 0) {
    return null
  }

  return (
    <section className="overflow-hidden pt-17.5">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0 pb-15 border-b border-gray-3">
        <div className="mb-10">
          <h2 className="font-semibold text-xl xl:text-heading-5 text-dark">
            {t('shopDetailsPage.relatedProducts')}
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-7.5">
          {loading
            ? Array.from({ length: 8 }).map((_, index) => (
                <SkeletonGridItem key={`skeleton-${index}`} />
              ))
            : relatedProducts.map((item) => (
                <ProductItem item={item} key={item.id} />
              ))}
        </div>
      </div>
    </section>
  )
}

export default RecentlyViewdItems
