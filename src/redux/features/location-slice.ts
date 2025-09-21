import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type LocationState = {
  selectedLocation: string
}

const initialState: LocationState = {
  selectedLocation: 'Karapitan', // Lokasi default saat pertama kali buka
}

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    // Ini adalah "action" yang akan kita panggil untuk mengubah lokasi
    changeLocation: (state, action: PayloadAction<string>) => {
      state.selectedLocation = action.payload
    },
  },
})

// Ekspor action agar bisa digunakan di komponen lain
export const { changeLocation } = locationSlice.actions

// Ekspor reducer untuk didaftarkan di store
export default locationSlice.reducer
