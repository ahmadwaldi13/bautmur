import ShopWithSidebar from '@/components/Products'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Products Page',
  description: 'This is JMarket Page for NextCommerce Template',
  icons: {
    icon: '/logo-page.png', // Path relatif dari folder public
  },
}

const CategoryProductListPage = async ({
  params,
}: {
  params: Promise<{ slug: string; id: string }>
}) => {
  const { slug, id } = await params

  return (
    <>
      {/* Hapus pemanggilan <Breadcrumb> dari sini.
        Cukup panggil <ShopWithSidebar> dan berikan props yang diperlukan.
      */}
      <ShopWithSidebar
        categoryId={id}
        breadcrumbSlug={slug}
        breadcrumbId={id}
      />
    </>
  )
}

export default CategoryProductListPage
