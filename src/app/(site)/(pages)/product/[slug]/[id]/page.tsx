import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import ShopDetails from '@/components/ShopDetails'
import { getProductDetails } from '@/components/Common/getProductDetails' // <-- Impor dari file baru kita

// Fungsi untuk metadata dinamis, memanggil fungsi yang sama
export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const product = await getProductDetails(params.id)

  if (!product) {
    return { title: 'Product Not Found' }
  }

  return {
    title: `${product.nama_barang} | Sinar Terang`,
    description:
      product.deskripsi || `Detail untuk produk ${product.nama_barang}`,
  }
}

// Komponen Halaman yang sangat bersih
const ProductDetailPage = async ({ params }: { params: { id: string } }) => {
  // 1. Ambil data
  const productData = await getProductDetails(params.id)

  // 2. Handle jika data tidak ada
  if (!productData) {
    notFound()
  }

  // 3. Render komponen tampilan dengan data sebagai prop
  return (
    <main>
      <ShopDetails product={productData} />
    </main>
  )
}

export default ProductDetailPage
