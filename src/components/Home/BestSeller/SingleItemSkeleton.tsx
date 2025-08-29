import React from 'react'

const SingleItemSkeleton = () => {
  return (
    <div className="group animate-pulse">
      <div className="relative overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.1)] rounded-lg bg-[#F6F7FB] min-h-[403px]">
        <div className="text-center px-4 py-7.5">
          <div className="h-5 w-3/4 mx-auto bg-gray-300 rounded"></div>
        </div>

        <div className="flex justify-center items-center">
          <div className="w-[280px] h-[280px] bg-gray-300 rounded-md"></div>
        </div>
      </div>
    </div>
  )
}

export default SingleItemSkeleton
