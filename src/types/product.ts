export type Product = {
  title: string
  reviews: number
  price: number
  discountedPrice: number
  id: number
  imgs?: {
    thumbnails: string[]
    previews: string[]
  }
}

export interface Category {
  id: number
  nama_kategori: string
  kode_kategori: string
  warna_badge: string
}

export interface Bahan {
  id: number
  nama: string
}

// Definisikan tipe Product agar sesuai dengan API
export interface ProductDetail {
  id: number
  nama_barang: string // Bukan 'title'
  harga: number // Bukan 'price'
  image_url: string // Bukan 'img'
  deskripsi: string | null
  kategori?: Category
  bahan?: Bahan
  discountedPrice?: number
  reviews?: number
}
