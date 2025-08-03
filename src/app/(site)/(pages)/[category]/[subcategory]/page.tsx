'use client'
import { notFound } from 'next/navigation'
import { use } from 'react'
import Breadcrumb from '@/components/Common/Breadcrumb'
import Products from '@/components/Products'
import productData from '@/components/Categories/categories'
import jmarketData from '@/components/JMarket/jmarketData'

const getCategoryTitle = (slug: string) =>
  jmarketData.find((cat) => cat.slug === slug)?.title || slug
const getProductCategory = (slug: string) =>
  productData.find((p) => p.categorySlug === slug)

type PageProps = {
  params: Promise<{
    category: string
    subcategory: string
  }>
}

const ProductSubcategoryPage = ({ params }: PageProps) => {
  // Gunakan React.use() untuk unwrap Promise di client component
  const { category: categorySlug, subcategory: subcategorySlug } = use(params)

  const categoryTitle = getCategoryTitle(categorySlug)
  const productInfo = getProductCategory(subcategorySlug)

  if (!productInfo || !categoryTitle) {
    notFound()
  }

  const products = productInfo.products || []

  const breadcrumbPages = [
    { title: 'Home', path: '/' },
    { title: 'Products', path: '/products' },
    { title: categoryTitle, path: `/${categorySlug}` },
    {
      title: productInfo.categoryName,
      path: `/${subcategorySlug}`,
    },
  ]

  return (
    <>
      <Breadcrumb title={productInfo.categoryName} pages={breadcrumbPages} />
      <Products products={products} />
    </>
  )
}

export default ProductSubcategoryPage
