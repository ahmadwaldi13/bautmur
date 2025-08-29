import Link from 'next/link'
import React from 'react'

type SubCategoryCardProps = {
  name: string
  slug: string
  categorySlug: string
}

const SubCategoryCard = ({
  name,
  slug,
  categorySlug,
}: SubCategoryCardProps) => {
  return (
    <Link
      href={`/${categorySlug}/${slug}`}
      className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="relative h-32 overflow-hidden rounded-t-lg bg-gray-100 flex items-center justify-center">
        {/* Anda bisa menambahkan prop untuk gambar di sini jika ada */}
        <span className="text-gray-400 text-center p-4">
          Gambar untuk {name}
        </span>
      </div>
      <div className="p-6">
        <h6 className="text-xl font-bold text-dark mb-2 group-hover:text-blue transition-colors duration-300">
          {name}
        </h6>
      </div>
    </Link>
  )
}

export default SubCategoryCard
