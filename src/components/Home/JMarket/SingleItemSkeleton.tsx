import React from 'react'

const SingleItemSkeleton = () => {
  return (
    <div className="rounded-lg shadow-md overflow-hidden animate-pulse">
      {/* Placeholder untuk Gambar */}
      {/* Menggunakan rasio aspek yang sama persis dengan SingleItem */}
      <div className="w-full bg-gray-300 aspect-[40/34]"></div>

      {/* Placeholder untuk Teks */}
      <div className="p-5 bg-white">
        {/* Balok abu-abu untuk meniru baris judul */}
        <div className="h-5 w-3/4 mx-auto bg-gray-300 rounded"></div>
      </div>
    </div>
  )
}

export default SingleItemSkeleton
