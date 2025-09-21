'use client'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
const CategoryItem = ({ category, isSelected, onChange }) => {
  const handleSelect = () => {
    onChange(category.id)
  }

  return (
    <button
      className={`${
        isSelected ? 'text-red' : ''
      } group flex items-center justify-between ease-out duration-200 hover:text-red-dark `}
      onClick={handleSelect}
    >
      <div className="flex items-center gap-2">
        <div
          className={`cursor-pointer flex items-center justify-center rounded w-4 h-4 border ${
            isSelected ? 'border-red bg-red' : 'bg-white border-gray-3'
          }`}
        >
          {/* ... SVG Checkmark ... */}
          <svg
            className={isSelected ? 'block' : 'hidden'}
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
        <span>{category.nama_kategori}</span>{' '}
      </div>
      {/* <span
        className={`${
          isSelected ? 'text-white bg-blue' : 'bg-gray-2'
        } inline-flex rounded-[30px] text-custom-xs px-2 ease-out duration-200 group-hover:text-white group-hover:bg-blue`}
      >
        {category.count ?? 0}{' '}
      </span> */}
    </button>
  )
}

// DIUBAH: Komponen utama sekarang menerima props baru
const CategoryDropdown = ({ categories, selectedIds, onCategoryChange }) => {
  const [toggleDropdown, setToggleDropdown] = useState(true)
  const { t } = useTranslation()

  return (
    <div className="bg-white shadow-1 rounded-lg">
      <div
        onClick={() => setToggleDropdown(!toggleDropdown)}
        className={`cursor-pointer flex items-center justify-between py-3 pl-6 pr-5.5 ${
          toggleDropdown && 'shadow-filter'
        }`}
      >
        <p className="text-dark">{t('shopPage.category')}</p>
        <button
          className={`text-dark ease-out duration-200 ${
            toggleDropdown && 'rotate-180'
          }`}
        >
          {/* ... SVG Arrow ... */}
          <svg
            className="fill-current"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.43057 8.51192C4.70014 8.19743 5.17361 8.161 5.48811 8.43057L12 14.0122L18.5119 8.43057C18.8264 8.16101 19.2999 8.19743 19.5695 8.51192C19.839 8.82642 19.8026 9.29989 19.4881 9.56946L12.4881 15.5695C12.2072 15.8102 11.7928 15.8102 11.5119 15.5695L4.51192 9.56946C4.19743 9.29989 4.161 8.82641 4.43057 8.51192Z"
              fill=""
            />
          </svg>
        </button>
      </div>

      <div
        className={`flex flex-col gap-3 py-6 pl-6 pr-5.5 ${
          toggleDropdown ? 'flex' : 'hidden'
        }`}
      >
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
            isSelected={selectedIds.includes(category.id)}
            onChange={onCategoryChange}
          />
        ))}
      </div>
    </div>
  )
}

export default CategoryDropdown
