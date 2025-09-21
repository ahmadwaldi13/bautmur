// File: CustomSelect.tsx (Versi Final yang Benar)
'use client'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const CustomSelect = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation()

  const selectedOption = options.find((option) => option.value === value)

  const toggleDropdown = () => setIsOpen(!isOpen)

  const handleOptionClick = (optionValue: string) => {
    if (onChange) {
      onChange(optionValue)
    }
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (isOpen && !target.closest('.custom-select')) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="custom-select relative" style={{ width: '200px' }}>
      <div
        className={`select-selected whitespace-nowrap ${
          isOpen ? 'select-arrow-active' : ''
        }`}
        onClick={toggleDropdown}
      >
        {selectedOption ? t(`jmarkets.${selectedOption.label}`) : 'Pilih...'}
      </div>
      <div className={`select-items ${isOpen ? '' : 'select-hide'}`}>
        {options.map((option) => (
          <div
            key={option.value}
            onClick={() => handleOptionClick(option.value)}
            className={`select-item ${
              selectedOption && selectedOption.value === option.value
                ? 'same-as-selected'
                : ''
            }`}
          >
            {t(`jmarkets.${option.label}`)}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CustomSelect
