'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { changeLocation } from '@/redux/features/location-slice'

const locations = [
  {
    nameKey: 'karapitan',
    value: 'Karapitan',
    mapQuery:
      'Jl. Karapitan No.16B, Paledang, Kec. Lengkong, Kota Bandung, Jawa Barat 40261',
  },
  {
    nameKey: 'toha',
    value: 'Toha',
    mapQuery:
      'Jl. Moch. Toha No.266, Karasak, Kec. Astanaanyar, Kota Bandung, Jawa Barat 40243',
  },
]

const LocationSwitcher = ({ stickyMenu }: { stickyMenu: boolean }) => {
  const [dropdownToggler, setDropdownToggler] = useState(false)
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const handleLocationSelect = (locationValue: string) => {
    dispatch(changeLocation(locationValue))
    setDropdownToggler(false)
  }

  return (
    <li
      onMouseLeave={() => setDropdownToggler(false)}
      className="group relative before:w-0 before:h-[3px] before:absolute before:left-0 before:top-0 before:rounded-b-[3px] before:ease-out before:duration-200 hover:before:w-full"
    >
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault()
          setDropdownToggler(!dropdownToggler)
        }}
        className={`hover:text-[#FB4141] text-custom-sm font-medium text-dark flex items-center gap-1.5 capitalize cursor-pointer ${
          stickyMenu ? 'xl:py-4' : 'xl:py-6'
        }`}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>

        {t('menu.location')}

        <svg
          className={`fill-current hover:fill-[#FB4141] cursor-pointer transition-transform duration-200 ${
            dropdownToggler ? 'rotate-180' : ''
          }`}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M2.95363 5.67461C3.13334 5.46495 3.44899 5.44067 3.65866 5.62038L7.99993 9.34147L12.3412 5.62038C12.5509 5.44067 12.8665 5.46495 13.0462 5.67461C13.2259 5.88428 13.2017 6.19993 12.992 6.37964L8.32532 10.3796C8.13808 10.5401 7.86178 10.5401 7.67453 10.3796L3.00787 6.37964C2.7982 6.19993 2.77392 5.88428 2.95363 5.67461Z" />
        </svg>
      </a>

      <ul className={`dropdown-for-head ${dropdownToggler ? 'flex' : ''}`}>
        {locations.map((loc) => (
          <li key={loc.value}>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                loc.mapQuery
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleLocationSelect(loc.value)}
              className="flex text-custom-sm hover:text-[#FB4141] hover:bg-gray-1 py-[7px] px-4.5 transition-colors cursor-pointer"
            >
              {loc.nameKey}
            </a>
          </li>
        ))}
      </ul>
    </li>
  )
}

export default LocationSwitcher
