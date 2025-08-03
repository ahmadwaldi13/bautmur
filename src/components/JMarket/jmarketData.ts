// Definisi tipe data untuk sub-kategori
export interface SubCategoryInfo {
  id: number
  name: string
  slug: string // slug untuk URL, cth: 'amplas'
  image?: string
}

// Definisi tipe data untuk kategori utama
export interface JMarketCategory {
  id: number
  title: string
  img: string
  slug: string // slug untuk URL, cth: 'kontraktor'
  data?: SubCategoryInfo[]
}

// Data yang sudah diperbaiki
const jmarketData: JMarketCategory[] = [
  {
    title: 'Kontraktor',
    id: 1,
    img: '/images/categories/kontraktor.webp',
    slug: 'kontraktor',
    data: [
      {
        id: 1,
        name: 'Amplas',
        slug: 'amplas',
      },
      {
        id: 5,
        name: 'DYNASET',
        slug: 'dynaset',
        image: '/images/categories/dynaset.jpg',
      },
    ],
  },
  {
    title: 'Manufaktur',
    id: 2,
    img: '/images/categories/manufaktur.webp',
    slug: 'manufaktur',
    data: [
      {
        id: 2,
        name: 'Bearing',
        slug: 'bearing',
        image: '/images/categories/hidrat.jpg',
      },
      {
        id: 3,
        name: 'Khusus',
        slug: 'khusus',
        image: '/images/categories/hidrat.jpg',
      },
      {
        id: 4,
        name: 'Cable',
        slug: 'cable',
        image: '/images/categories/hidrat.jpg',
      },
      {
        id: 5,
        name: 'DYNASET',
        slug: 'dynaset',
        image: '/images/categories/dynaset.jpg',
      },
    ],
  },
  {
    title: 'Toko',
    id: 3,
    img: '/images/categories/hpl.webp',
    slug: 'toko',
    data: [
      {
        id: 1,
        name: 'Amplas',
        slug: 'amplas',
        image: '/images/categories/hidrat.jpg',
      },
      {
        id: 2,
        name: 'Bearing',
        slug: 'bearing',
        image: '/images/categories/hidrat.jpg',
      },
      {
        id: 3,
        name: 'Khusus',
        slug: 'khusus',
        image: '/images/categories/hidrat.jpg',
      },
      {
        id: 4,
        name: 'Cable',
        slug: 'cable',
        image: '/images/categories/hidrat.jpg',
      },
    ],
  },
  {
    title: 'Bengkel',
    id: 4,
    img: '/images/categories/bengkel.webp',
    slug: 'bengkel',
    data: [
      {
        id: 1,
        name: 'Amplas',
        slug: 'amplas',
        image: '/images/categories/hidrat.jpg',
      },
    ],
  },
  {
    title: 'Subagen',
    id: 5,
    img: '/images/categories/aluminium.webp',
    slug: 'subagen',
    // Tidak ada 'data' di sini, dan itu tidak masalah
  },
  {
    title: 'Tools',
    id: 6,
    img: '/images/categories/tools.webp',
    slug: 'tools',
    // Tidak ada 'data' di sini, dan itu tidak masalah
  },
]

export default jmarketData
