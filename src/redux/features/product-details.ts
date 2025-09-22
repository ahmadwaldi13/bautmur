import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '@/types/product' // Pastikan tipe Product Anda sudah benar

// 1. Tipe untuk state slice, value bisa berupa Product atau null
type ProductDetailState = {
  value: Product | null
}

// 2. Gunakan null untuk menandakan belum ada produk yang dipilih
const initialState: ProductDetailState = {
  value: null,
}

export const productDetailSlice = createSlice({
  name: 'productDetail', // Nama slice bisa dibuat lebih singkat
  initialState,
  reducers: {
    // 3. Nama action lebih jelas dan menggunakan sintaks Immer yang lebih umum
    setProductDetails: (state, action: PayloadAction<Product>) => {
      state.value = action.payload
    },
    // Tambahkan reducer untuk membersihkan state jika perlu
    clearProductDetails: (state) => {
      state.value = null
    },
  },
})

// 4. Ekspor action yang sudah diganti namanya
export const { setProductDetails, clearProductDetails } =
  productDetailSlice.actions
export default productDetailSlice.reducer
