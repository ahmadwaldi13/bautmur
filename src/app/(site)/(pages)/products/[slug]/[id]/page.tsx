import Breadcrumb from '@/components/Common/Breadcrumb'
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

  const breadcrumbPages = [
    { title: 'Home', path: '/' },
    { title: 'Products', path: '/products' },
    { title: slug.replace(/-/g, ' '), path: `/products/${slug}/${id}` },
  ]

  return (
    <>
      <Breadcrumb
        title={slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
        pages={breadcrumbPages}
      />
      <ShopWithSidebar categoryId={id} />
    </>
  )
}

export default CategoryProductListPage
