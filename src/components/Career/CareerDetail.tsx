'use client' // 1. Tambahkan ini untuk menjadikannya Client Component

import React from 'react'
import Breadcrumb from '@/components/Common/Breadcrumb'
import { useTranslation } from 'react-i18next' // Sekarang Anda bisa pakai hook ini

// Komponen sekarang menerima 'job' sebagai prop, bukan 'id'
const CareerDetailComponent = ({ job }: { job: any }) => {
  const { t } = useTranslation() // 2. Gunakan hook seperti biasa

  // 3. Terjemahkan breadcrumb di sini
  const breadcrumbData = [
    { title: t('breadcrumb.home'), path: '/' },
    { title: t('breadcrumb.career'), path: '/career' },
    { title: job.title, path: `/career/${job.id}` }, // Data dari props
  ]

  const emailRecipient = 'sinarterang16b@gmail.com'
  const emailSubject = `Lamaran Pekerjaan - ${job.title}`
  const emailBody = `Halo,

Saya tertarik untuk melamar posisi sebagai ${job.title}.
Terlampir adalah CV dan dokumen pendukung saya.

Terima kasih.

Hormat saya,
[Nama Pelamar]`

  const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailRecipient}&su=${encodeURIComponent(
    emailSubject
  )}&body=${encodeURIComponent(emailBody)}`

  // --- Tampilan / JSX ---
  return (
    <>
      <Breadcrumb title={job.title} pages={breadcrumbData} />

      <section className="bg-gray-2 py-20 px-4 md:px-8 xl:px-0">
        <div className="mx-auto max-w-[1170px] rounded-lg bg-white p-8 shadow-md sm:p-12">
          {/* Header */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-3xl font-bold text-dark sm:text-4xl">
              {job.title}
            </h1>
            <a
              href={gmailLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-md bg-blue py-3 px-8 font-medium text-white transition-colors duration-300 hover:bg-blue-600"
            >
              {t('careerDetail.applyNow')}
            </a>
          </div>

          {/* Body/Deskripsi */}
          {job.body && (
            <div
              className="prose mb-8 text-lg text-gray-700"
              dangerouslySetInnerHTML={{ __html: job.body }}
            />
          )}

          {/* Tanggung Jawab */}
          {job.responsibilities && job.responsibilities.length > 0 && (
            <div className="mb-8">
              <h3 className="mb-4 text-2xl font-semibold text-dark">
                {t('careerDetail.responsibilities')}
              </h3>
              <ul className="list-inside list-disc space-y-2 text-gray-700">
                {job.responsibilities.map((item: any, index: number) => (
                  <li key={index}>{item.responsibility}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Persyaratan */}
          {job.requirements && job.requirements.length > 0 && (
            <div>
              <h3 className="mb-4 text-2xl font-semibold text-dark">
                {t('careerDetail.requirements')}
              </h3>
              <ul className="list-inside list-disc space-y-2 text-gray-700">
                {job.requirements.map((item: any, index: number) => (
                  <li key={index}>{item.requirement}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default CareerDetailComponent
