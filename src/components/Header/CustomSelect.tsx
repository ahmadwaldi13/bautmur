// File: CustomSelect.tsx (Versi Controlled Component)
'use client'
import React, { useState, useEffect } from 'react'

const CustomSelect = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false)

  // BARU: Mencari objek opsi yang sedang aktif berdasarkan `value` dari props.
  // Ini digunakan untuk menampilkan label yang benar.
  const selectedOption = options.find((option) => option.value === value) ||
    options[0] || { label: 'Loading...', value: '' }

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  // DIMODIFIKASI: handleOptionClick sekarang memanggil `onChange` dari props.
  // Ia mengirimkan `value` dari opsi yang diklik ke parent (Header).
  const handleOptionClick = (option) => {
    if (onChange) {
      onChange(option.value) // Kirim nilainya ke parent (Header)
    }
    setIsOpen(false) // Selalu tutup dropdown setelah memilih
  }

  // PERBAIKAN: useEffect untuk klik di luar agar lebih aman
  useEffect(() => {
    function handleClickOutside(event) {
      if (isOpen && !event.target.closest('.dropdown-content')) {
        setIsOpen(false) // Hanya tutup, jangan toggle
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen]) // Tambahkan `isOpen` sebagai dependency

  return (
    <div
      className="dropdown-content custom-select relative"
      style={{ width: '200px' }}
    >
      <div
        className={`select-selected whitespace-nowrap ${
          isOpen ? 'select-arrow-active' : ''
        }`}
        onClick={toggleDropdown}
      >
        {/* Menampilkan label dari `selectedOption` yang ditemukan */}
        {selectedOption ? selectedOption.label : 'Select...'}
      </div>
      <div className={`select-items ${isOpen ? '' : 'select-hide'}`}>
        {/* Menampilkan semua opsi */}
        {options.map((option) => (
          <div
            key={option.value}
            onClick={() => handleOptionClick(option)}
            className={`select-item ${
              selectedOption && selectedOption.value === option.value
                ? 'same-as-selected'
                : ''
            }`}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CustomSelect
