'use client'

const AllProductDropdown = ({ onViewAll, isActive }) => {
  return (
    <div className="bg-white shadow-1 rounded-lg">
      <div className="flex flex-col gap-3 py-6 pl-6 pr-5.5">
        <button
          onClick={onViewAll}
          className={`${
            isActive ? 'text-red' : ''
          } group flex items-center justify-between ease-out duration-200 hover:text-red w-full`}
        >
          <div className="flex items-center gap-2">
            <div
              className={`cursor-pointer flex items-center justify-center rounded w-4 h-4 border ${
                isActive ? 'border-red bg-red' : 'bg-white border-gray-3'
              }`}
            >
              <svg
                className={isActive ? 'block' : 'hidden'}
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.33317 2.5L3.74984 7.08333L1.6665 5"
                  stroke="white"
                  strokeWidth="1.94437"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span>All Products</span>
          </div>
        </button>
      </div>
    </div>
  )
}

export default AllProductDropdown
