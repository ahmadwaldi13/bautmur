import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import ShopDetails from '@/components/ShopDetails'
import { getProductDetails } from '@/components/Common/getProductDetails'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; slug: string }>
}): Promise<Metadata> {
  const { id } = await params
  const product = await getProductDetails(id)

  if (!product) {
    return { title: 'Product Not Found' }
  }

  return {
    title: `${product.nama_barang}`,
    description:
      product.deskripsi || `Detail untuk produk ${product.nama_barang}`,
    icons: {
      icon: '/logo-page.png',
    },
  }
}

const ProductDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string; slug: string }>
}) => {
  const { id } = await params

  const productData = await getProductDetails(id)

  if (!productData) {
    notFound()
  }

  return (
    <main>
      <ShopDetails product={productData} />
    </main>
  )
}

export default ProductDetailPage
