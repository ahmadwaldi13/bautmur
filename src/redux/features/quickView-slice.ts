// File: redux/features/quickView-slice.ts (Versi Perbaikan)

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProductDetail } from '@/types/product' // Impor tipe yang sudah benar

// Definisikan tipe untuk state, menggunakan tipe Product
type InitialState = {
  value: ProductDetail | null // Gunakan null untuk menandakan tidak ada produk yang dipilih
}

// State awal sekarang null
const initialState: InitialState = {
  value: null,
}

export const quickViewSlice = createSlice({
  name: 'quickView',
  initialState,
  reducers: {
    // Action ini sekarang secara eksplisit menerima payload dengan tipe Product
    updateQuickView: (state, action: PayloadAction<ProductDetail>) => {
      // Langsung ganti 'value' dengan produk lengkap dari payload
      state.value = action.payload
    },

    resetQuickView: (state) => {
      // Kembalikan ke null
      state.value = null
    },
  },
})

export const { updateQuickView, resetQuickView } = quickViewSlice.actions
export default quickViewSlice.reducer
