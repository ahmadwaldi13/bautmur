import { Product } from '@/types/product'

// Tipe untuk Kategori Produk (Level 2)
export interface ProductCategory {
  id: number
  categoryName: string
  categorySlug: string
  image: string
  products: Product[] // Diubah kembali menjadi 'products'
  jmarket?: any[]
}

// Data yang sudah disesuaikan untuk 3 tingkat
const productData: ProductCategory[] = [
  {
    id: 1,
    categoryName: 'Amplas',
    categorySlug: 'amplas',
    image: '/images/categories/hidrat.jpg',
    // Array ini sekarang berisi produk akhir
    products: [
      {
        title: 'Amplas Kertas',
        reviews: 15,
        price: 1500,
        discountedPrice: 0,
        id: 1,
        imgs: {
          thumbnails: ['/images/products2/amplas-kertas.jpg'],
          previews: ['/images/products2/amplas-kertas.jpg'],
        },
      },
      {
        title: 'Amplas Rol',
        reviews: 5,
        price: 20000,
        discountedPrice: 0,
        id: 2,
        imgs: {
          thumbnails: ['/images/products2/amplas-rol.jpg'],
          previews: ['/images/products2/amplas-rol.jpg'],
        },
      },
      {
        title: 'Amplas Susun',
        reviews: 5,
        price: 13500000,
        discountedPrice: 0,
        id: 3,
        imgs: {
          thumbnails: ['/images/products2/amplas-susun-mollar-molar.jpg'],
          previews: ['/images/products2/amplas-susun-mollar-molar.jpg'],
        },
      },
    ],
  },
  {
    id: 2,
    categoryName: 'Dynaset',
    categorySlug: 'dynaset',
    image: '/images/categories/hidrat.jpg',
    products: [
      {
        title: 'Mur Baja 8.8',
        reviews: 15,
        price: 1000,
        discountedPrice: 0,
        id: 5,
        imgs: {
          thumbnails: [
            '/images/products2/Baut-Mur-Baud-Mur-Baja-Baut-Hex-8.8-HTB-A325.jpg',
          ],
          previews: [
            '/images/products2/Baut-Mur-Baud-Mur-Baja-Baut-Hex-8.8-HTB-A325.jpg',
          ],
        },
      },
      {
        title: 'Baud Baut Mur Stainless 304',
        reviews: 15,
        price: 1000,
        discountedPrice: 0,
        id: 6,
        imgs: {
          thumbnails: [
            '/images/products2/Baut-Mur-Baut-Hex-Baut-Hexagon-Baut-Mur-Stainless-304.jpg',
          ],
          previews: [
            '/images/products2/Baut-Mur-Baut-Hex-Baut-Hexagon-Baut-Mur-Stainless-304.jpg',
          ],
        },
      },
      {
        title: 'Baut Mur Sepeda Baud Seng',
        reviews: 15,
        price: 1000,
        discountedPrice: 0,
        id: 7,
        imgs: {
          thumbnails: [
            '/images/products2/Baut-Mur-Sepeda-Stove-Bolt-Baut-Mur-Seng-Baud-Mur-Kotk.jpg',
          ],
          previews: [
            '/images/products2/Baut-Mur-Sepeda-Stove-Bolt-Baut-Mur-Seng-Baud-Mur-Kotk.jpg',
          ],
        },
      },
      {
        title: 'Mur Flange',
        reviews: 15,
        price: 1000,
        discountedPrice: 0,
        id: 8,
        imgs: {
          thumbnails: [
            '/images/products2/Mur-Flange-Besi-Flange-Nut-Besi-Kuning-1024x1024.jpg',
          ],
          previews: [
            '/images/products2/Mur-Flange-Besi-Flange-Nut-Besi-Kuning-1024x1024.jpg',
          ],
        },
      },
      {
        title: 'Mur Besi Kuning',
        reviews: 15,
        price: 1000,
        discountedPrice: 0,
        id: 9,
        imgs: {
          thumbnails: [
            '/images/products2/Mur-Hex-Hex-Nut-Kuning-Besi-1024x1024.jpg',
          ],
          previews: [
            '/images/products2/Mur-Hex-Hex-Nut-Kuning-Besi-1024x1024.jpg',
          ],
        },
      },
      {
        title: 'Mur JRN (Furniture)',
        reviews: 15,
        price: 1000,
        discountedPrice: 0,
        id: 10,
        imgs: {
          thumbnails: [
            '/images/products2/Mur-JRN-Mur-Knockdown-Furniture-Perabotan.jpg',
          ],
          previews: [
            '/images/products2/Mur-JRN-Mur-Knockdown-Furniture-Perabotan.jpg',
          ],
        },
      },
      {
        title: 'Mur Lock',
        reviews: 15,
        price: 1000,
        discountedPrice: 0,
        id: 11,
        imgs: {
          thumbnails: ['/images/products2/Mur-Lock-Nut-Nut-Cone-Lock-Nut.jpg'],
          previews: ['/images/products2/Mur-Lock-Nut-Nut-Cone-Lock-Nut.jpg'],
        },
      },
      {
        title: 'Mur Nanas (Furniture)',
        reviews: 15,
        price: 1000,
        discountedPrice: 0,
        id: 12,
        imgs: {
          thumbnails: ['/images/products2/Mur-Nanas-Insert-Nut.jpg'],
          previews: ['/images/products2/Mur-Nanas-Insert-Nut.jpg'],
        },
      },
      {
        title: 'Mur Nylon',
        reviews: 15,
        price: 1000,
        discountedPrice: 0,
        id: 13,
        imgs: {
          thumbnails: ['/images/products2/Mur-Nylon-Nylon-Mur-Lock.jpg'],
          previews: ['/images/products2/Mur-Nylon-Nylon-Mur-Lock.jpg'],
        },
      },
      {
        title: 'Mur Topi | Cap Nut',
        reviews: 15,
        price: 1000,
        discountedPrice: 0,
        id: 14,
        imgs: {
          thumbnails: ['/images/products2/Mur-Topi-Cap-Nut-1.jpg'],
          previews: ['/images/products2/Mur-Topi-Cap-Nut-1.jpg'],
        },
      },
    ],
  },
  {
    id: 3,
    categoryName: 'Cable',
    categorySlug: 'cable',
    image: '/images/categories/hidrat.jpg',
    products: [
      {
        title: 'Cable Ties',
        reviews: 15,
        price: 10000,
        discountedPrice: 0,
        id: 4,
        imgs: {
          thumbnails: [
            '/images/products2/cable-ties-kabel-ties-cabel-tie-hitam-putih.jpg',
          ],
          previews: [
            '/images/products2/cable-ties-kabel-ties-cabel-tie-hitam-putih.jpg',
          ],
        },
      },
    ],
  },
]

export default productData
