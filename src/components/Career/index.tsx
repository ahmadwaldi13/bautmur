'use client'
import React from 'react'
import Breadcrumb from '../Common/Breadcrumb'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

type CareerItem = {
  id: number
  title: string
  description: string
  is_active: number | boolean
}

const Career = ({ careers }: { careers: CareerItem[] }) => {
  const activeCareers = careers.filter(
    (job) => job.is_active === 1 || job.is_active === true
  )

  const { t } = useTranslation()

  const breadcrumbData = [
    { title: t('breadcrumb.home'), path: '/' },
    { title: t('breadcrumb.career'), path: '/career' },
  ]

  const hasJobs = activeCareers && activeCareers.length > 0

  return (
    <>
      <Breadcrumb title={t('breadcrumb.career')} pages={breadcrumbData} />

      <section className="bg-gray-2 py-20 px-4 md:px-8 xl:px-0">
        <div className="max-w-[1170px] mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-dark mb-4">
              {t('careerPage.hero_title')}
            </h1>
            <p className="text-base sm:text-lg text-gray-7 max-w-2xl mx-auto">
              {t('careerPage.hero_desc')}
            </p>
          </div>

          {/* Job Listings */}
          <div className="mt-12">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-dark">
                {t('careerPage.available_positions')}
              </h2>
            </div>

            {hasJobs ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {activeCareers.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
                  >
                    <h3 className="text-xl font-semibold text-dark mb-2">
                      {job.title}
                    </h3>
                    <div className="text-gray-600 text-base mb-6 flex flex-wrap gap-4 sm:gap-6">
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-gray-500"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                        </svg>

                        <span>Bandung</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-gray-500"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15.5h-2V13h2v4.5zm0-5.5H9V8h2v4z" />
                        </svg>

                        <span>Onsite</span>
                      </div>
                    </div>
                    <p className="text-gray-7 mb-4 flex-grow">
                      {job.description}
                    </p>
                    <Link
                      href={`/career/${job.id}`}
                      className="inline-block mt-auto bg-blue text-white text-center py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
                    >
                      {t('careerPage.learn_more')}
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-xl font-medium text-gray-7">
                  {t('careerPage.no_jobs_title')}
                </p>
                <p className="text-base text-gray-7 mt-2">
                  {t('careerPage.no_jobs_desc')}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default Career
