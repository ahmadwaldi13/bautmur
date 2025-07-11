'use client'

import React from 'react'
import Image from 'next/image'

const Partnership = ({ partnershipImage }) => {
  if (!partnershipImage || partnershipImage.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No partnership images available</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl p-6 ">
      {/* Images Grid - Responsive: Mobile: 1, Tablet: 3, Desktop: 5 per row */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {partnershipImage.map((item, index) => (
          <div key={item.id} className="group text-center w-full">
            {/* Image without box */}
            <div className="w-full h-24 md:h-28 lg:h-32 mx-auto mb-3">
              <Image
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                src={item.path}
                alt={item.name}
                width={200}
                height={120}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 20vw"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Partnership
