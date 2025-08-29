export type JMarket = {
  title: string
  id: number
  img: string
  url: string
}

export type DisplayJMarketItem = {
  id: number
  image: string
  image_url: string
  nama: string
  is_active: boolean
  icon: string
  deskripsi: string
  warna_badge: string
  url: string
  created_at?: string
  updated_at?: string
}
