'use client'
import React from 'react'
import Breadcrumb from '../Common/Breadcrumb'
import {
  purchasingImage,
  parthershipImage,
  certificateImage,
} from './purchaing'
import Image from 'next/image'
import Partnership from './Pathership'
import Link from 'next/link'
import { FaWhatsapp } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

const Purchasing = () => {
  const { t } = useTranslation() // 3. Panggil hook

  const breadcrumbData = [
    { title: t('breadcrumb.home'), path: '/' },
    { title: t('breadcrumb.purchasing'), path: '/purchasing' },
  ]

  return (
    <>
      <Breadcrumb title={t('breadcrumb.purchasing')} pages={breadcrumbData} />

      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1200px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          {/* Images Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-20">
            {purchasingImage.map((item, i) => (
              <div key={item.id} className="group">
                <div className="overflow-hidden rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-300">
                  <Image
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                    src={item.path}
                    alt={item.name}
                    width={600}
                    height={400}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            ))}
          </div>
          {/* Content Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* About Us Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow group">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-blue"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-dark">
                  {t('purchasingPage.about_title')}
                </h3>
              </div>
              <p className="text-dark-4 leading-relaxed">
                {t('purchasingPage.about_desc')}
              </p>
            </div>

            {/* Experience Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow group">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-dark">
                  {t('purchasingPage.experience_title')}
                </h3>
              </div>
              <div className="mb-4">
                <span className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {t('purchasingPage.experience_badge')}
                </span>
              </div>
              <p className="text-dark-4 leading-relaxed">
                {t('purchasingPage.experience_desc')}
              </p>
            </div>

            {/* Partnership Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow group">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-dark">
                  {t('purchasingPage.partnership_title')}
                </h3>
              </div>
              <p className="text-dark-4 leading-relaxed mb-6">
                {t('purchasingPage.partnership_desc')}
              </p>
            </div>
          </div>
          {/* Partners Carousel Section */}
          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl">
            <div className="text-center mb-12">
              <h3 className="text-2xl lg:text-3xl font-bold text-dark mb-4">
                {t('purchasingPage.partners_title')}
              </h3>
              <p className="text-lg text-dark-4 max-w-2xl mx-auto">
                {t('purchasingPage.partners_desc')}
              </p>
            </div>

            <Partnership partnershipImage={parthershipImage} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mt-12">
            {certificateImage.map((item, i) => (
              <div key={item.id} className="group">
                <div className="overflow-hidden rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-300">
                  <Image
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                    src={item.path}
                    alt={item.name}
                    width={600}
                    height={400}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                {item.name && (
                  <p className="lg:text-lg md:text-sm text-center mt-3 font-medium text-gray-700 group-hover:text-blue transition-colors truncate">
                    {item.name}
                  </p>
                )}
              </div>
            ))}
          </div>
          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl mt-12">
            <div className="text-center mb-12">
              <h3 className="text-2xl lg:text-3xl font-bold text-dark mb-4">
                {t('purchasingPage.contact_us_title')}
              </h3>
              <p className="text-lg text-dark-4 max-w-2xl mx-auto">
                {t('purchasingPage.contact_us_desc')}
              </p>
              <Link
                href="https://u.wechat.com/kDB5pq01KmnEdTA5jlH9Y6g?s=2/"
                className="text-primary hover:underline mt-2 block text-lg"
              >
                {t('purchasingPage.contact_us_scan')}
              </Link>
            </div>

            <div className="bg-white rounded-xl p-6">
              <div className="flex justify-center">
                <Image
                  className="w-52 md:w-64 lg:w-72 h-auto object-contain transition-transform duration-300"
                  src="/images/purchasing/qrcode.png"
                  alt="qrcode"
                  width={300}
                  height={300}
                  sizes="(max-width: 768px) 80vw, (max-width: 1024px) 33vw, 20vw"
                />
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <div className="bg-blue rounded-3xl p-8 lg:p-12 text-white">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                {t('purchasingPage.contact_purchasing_title')}
              </h3>
              <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                {t('purchasingPage.contact_purchasing_desc')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="https://wa.me/6285794683694"
                  className="hover:underline"
                >
                  <div className="flex items-center justify-center gap-2 bg-white text-blue px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors cursor-pointer">
                    <FaWhatsapp className="text-2xl" />
                    0857-9468-3694
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Purchasing
