'use client'

import React from 'react'
import Breadcrumb from '@/components/Common/Breadcrumb'
import { useTranslation } from 'react-i18next'

const CareerDetailComponent = ({ job }: { job: any }) => {
  const { t } = useTranslation()

  const breadcrumbData = [
    { title: t('breadcrumb.home'), path: '/' },
    { title: t('breadcrumb.career'), path: '/career' },
    { title: job.title, path: `/career/${job.id}` },
  ]

  // --- 1. Logika untuk Link Aplikasi ---

  // Inisialisasi link
  let gmailLink = ''
  let whatsappLink = ''

  // Buat link email jika job.contact_email ada
  if (job.contact_email) {
    const emailSubject = `Lamaran Pekerjaan - ${job.title}`
    const emailBody = `Halo,\n\nSaya tertarik untuk melamar posisi sebagai ${job.title}.\nTerlampir adalah CV dan dokumen pendukung saya.\n\nTerima kasih.\n\nHormat saya,\n[Nama Pelamar]`
    gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${
      job.contact_email
    }&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(
      emailBody
    )}`
  }

  if (job.contact_phone) {
    let formattedPhone = job.contact_phone.replace(/\D/g, '')

    if (formattedPhone.startsWith('0')) {
      formattedPhone = '62' + formattedPhone.substring(1)
    }

    if (formattedPhone) {
      const waMessage = `Halo, saya tertarik untuk melamar posisi sebagai ${job.title}.`
      whatsappLink = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(
        waMessage
      )}`
    }
  }

  return (
    <>
      <Breadcrumb title={job.title} pages={breadcrumbData} />

      <section className="bg-gray-2 py-20 px-4 md:px-8 xl:px-0">
        <div className="mx-auto max-w-[1170px] rounded-lg bg-white p-8 shadow-md sm:p-12">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-3xl font-bold text-dark sm:text-4xl">
              {job.title}
            </h1>

            <div className="flex flex-wrap gap-3">
              {gmailLink && (
                <a
                  href={gmailLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-md bg-blue py-3 px-6 font-medium text-white transition-colors duration-300 hover:bg-blue-600"
                >
                  {t('careerDetail.applyViaEmail', 'Lamar via Email')}
                </a>
              )}

              {whatsappLink && (
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-md bg-green py-3 px-6 font-medium text-white transition-colors duration-300 hover:bg-green-600"
                >
                  {t('careerDetail.applyViaWhatsApp', 'Lamar via WhatsApp')}
                </a>
              )}
            </div>
          </div>

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
