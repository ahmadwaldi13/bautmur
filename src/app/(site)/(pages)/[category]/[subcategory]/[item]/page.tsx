// import { notFound } from 'next/navigation'
// import Breadcrumb from '@/components/Common/Breadcrumb'
// import productData from '@/components/Categories/categories'
// import jmarketData from '@/components/JMarket/jmarketData'

// // Helper functions
// const getCategoryTitle = (slug: string) =>
//   jmarketData.find((cat) => cat.slug === slug)?.title || slug
// const getProductCategory = (slug: string) =>
//   productData.find((p) => p.categorySlug === slug)

// type PageProps = {
//   params: {
//     category: string
//     subcategory: string
//     item: string
//   }
// }

// const FinalProductPage = ({ params }: PageProps) => {
//   const {
//     category: categorySlug,
//     subcategory: subcategorySlug,
//     item: itemSlug,
//   } = params

//   // Mencari data sampai ke level-3
//   const categoryTitle = getCategoryTitle(categorySlug)
//   const productCategory = getProductCategory(subcategorySlug)
//   const itemDetails = productCategory?.subCategories.find(
//     (i) => i.slug === itemSlug
//   )

//   if (!categoryTitle || !productCategory || !itemDetails) {
//     notFound()
//   }

//   const breadcrumbPages = [
//     { title: 'Home', path: '/' },
//     { title: categoryTitle, path: `/${categorySlug}` },
//     { title: 'Products', path: '/jmarket' },
//     {
//       title: productCategory.categoryName,
//       path: `/${categorySlug}/${subcategorySlug}`,
//     },
//     {
//       title: itemDetails.name,
//       path: `/${categorySlug}/${subcategorySlug}/${itemSlug}`,
//     },
//   ]

//   return (
//     <>
//       <Breadcrumb title={itemDetails.name} pages={breadcrumbPages} />
//       <section className="py-20">
//         <div className="max-w-[1170px] w-full mx-auto px-4">
//           <h1 className="text-4xl font-bold mb-4">
//             Daftar Produk untuk {itemDetails.name}
//           </h1>
//           <p className="text-xl text-gray-600 mb-8">
//             Kategori: {categoryTitle} &gt; {productCategory.categoryName}
//           </p>
//           <div className="bg-gray-100 p-8 rounded-lg">
//             <h3 className="text-2xl font-bold">Segera Hadir</h3>
//             <p className="mt-4">
//               (Di sini Anda akan menampilkan daftar produk akhir yang sesuai
//               dengan {itemDetails.name})
//             </p>
//           </div>
//         </div>
//       </section>
//     </>
//   )
// }

// export default FinalProductPage
