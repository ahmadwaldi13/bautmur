'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import '../../../i18n'

const languages = [
  { name: 'English', code: 'en' },
  { name: 'Indonesia', code: 'id' },
  { name: '中文', code: 'zh' },
]

const LanguageSwitcher = ({ stickyMenu }: { stickyMenu: boolean }) => {
  const [dropdownToggler, setDropdownToggler] = useState(false)
  const { t, i18n } = useTranslation()
  const router = useRouter()

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode)
    setDropdownToggler(false)
    router.refresh()
  }

  return (
    <li
      onClick={() => setDropdownToggler(!dropdownToggler)}
      className="group relative before:w-0 before:h-[3px] before:absolute before:left-0 before:top-0 before:rounded-b-[3px] before:ease-out before:duration-200 hover:before:w-full"
    >
      <a
        href="#"
        onClick={(e) => e.preventDefault()}
        className={`hover:text-[#FB4141] text-custom-sm font-medium text-dark flex items-center gap-1.5 capitalize cursor-pointer ${
          stickyMenu ? 'xl:py-4' : 'xl:py-6'
        }`}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>

        {t('language')}

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
        {languages.map((lang) => (
          <li key={lang.code}>
            <a
              href="#"
              onClick={() => handleLanguageChange(lang.code)}
              className={`flex text-custom-sm hover:text-[#FB4141] hover:bg-gray-1 py-[7px] px-4.5 transition-colors cursor-pointer ${
                i18n.language === lang.code ? 'text-[#FB4141] font-bold' : ''
              }`}
            >
              {lang.name}
            </a>
          </li>
        ))}
      </ul>
    </li>
  )
}

export default LanguageSwitcher
