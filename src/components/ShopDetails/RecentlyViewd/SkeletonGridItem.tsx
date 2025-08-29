import React from 'react'

const SkeletonGridItem = () => {
  return (
    // Wrapper yang meniru card asli (background, bayangan, sudut, padding)
    // Ini penting agar tata letak grid tidak bergeser saat loading selesai.
    <div className="rounded-lg bg-white shadow-1 p-4">
      {/* Placeholder untuk Gambar */}
      <div className="w-full bg-gray-200 animate-pulse rounded-lg min-h-[270px] mb-4"></div>

      {/* Placeholder untuk Judul Produk */}
      <div className="h-6 w-4/5 bg-gray-200 animate-pulse rounded-md mb-2"></div>

      {/* Placeholder untuk Harga */}
      <div className="h-5 w-1/2 bg-gray-200 animate-pulse rounded-md"></div>
    </div>
  )
}

export default SkeletonGridItem
