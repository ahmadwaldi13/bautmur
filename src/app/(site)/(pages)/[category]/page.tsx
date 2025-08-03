'use client'
import { use } from 'react'
import { notFound } from 'next/navigation'
import Breadcrumb from '@/components/Common/Breadcrumb'
import jmarketData from '@/components/JMarket/jmarketData'
// Import komponen baru kita
import SubCategoryCard from '@/components/Cards/SubCategoryCard'

const getCategoryDetails = (slug: string) =>
  jmarketData.find((c) => c.slug === slug)

type PageProps = {
  params: Promise<{ category: string }>
}

const SubCategoryListPage = ({ params }: PageProps) => {
  const { category: categorySlug } = use(params)
  const categoryDetails = getCategoryDetails(categorySlug)

  if (!categoryDetails) {
    notFound()
  }

  const breadcrumbPages = [
    { title: 'Home', path: '/' },
    { title: 'Products', path: '/jmarket' },
    { title: categoryDetails.title, path: `/${categorySlug}` },
  ]

  const subCategories = categoryDetails.data || []

  return (
    <>
      <Breadcrumb title={categoryDetails.title} pages={breadcrumbPages} />

      <section className="py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          {subCategories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {subCategories.map((sub) => (
                // Panggil komponen di sini, jauh lebih bersih!
                <SubCategoryCard
                  key={sub.id}
                  name={sub.name}
                  slug={sub.slug}
                  categorySlug={categorySlug}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              Tidak ada kategori produk untuk {categoryDetails.title}.
            </p>
          )}
        </div>
      </section>
    </>
  )
}

export default SubCategoryListPage
