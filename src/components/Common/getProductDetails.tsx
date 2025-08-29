import axios from 'axios'

const TOKEN = process.env.NEXT_PUBLIC_API_TOKEN

// Fungsi ini sekarang bisa digunakan di mana saja di aplikasi Anda
export const getProductDetails = async (id: string) => {
  if (!id) return null
  try {
    const API_URL = `http://api.bautmur.id/api/v1/website/barangs/${id}`
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    })
    return response.data.data
  } catch (error) {
    console.error(`Gagal mengambil detail untuk produk ID ${id}:`, error)
    return null
  }
}

export const getActivePromoBanner = async () => {
  try {
    const API_URL = `http://api.bautmur.id/api/v1/website/promos/banner`
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    })
    // Kita cek dulu apakah banner aktif sebelum mengembalikan data
    if (response.data.data && response.data.data.banner_active) {
      return response.data.data
    }
    return null // Kembalikan null jika banner tidak aktif
  } catch (error) {
    console.error(`Gagal mengambil data promo banner:`, error)
    return null
  }
}
