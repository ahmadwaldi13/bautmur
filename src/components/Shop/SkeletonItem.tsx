const SkeletonItem = () => {
  return (
    // Strukturnya meniru div terluar dari SingleGridItem Anda
    <div className="bg-white rounded-lg shadow-1 p-4">
      {/* Placeholder untuk Gambar */}
      <div className="relative overflow-hidden flex items-center justify-center rounded-lg bg-gray-300 animate-pulse min-h-[270px] mb-4"></div>

      {/* Placeholder untuk Judul Produk */}
      <div className="h-6 w-4/5 bg-gray-300 animate-pulse rounded-md mb-2"></div>

      {/* Placeholder untuk Harga */}
      <div className="h-5 w-1/2 bg-gray-300 animate-pulse rounded-md"></div>
    </div>
  )
}

export default SkeletonItem
