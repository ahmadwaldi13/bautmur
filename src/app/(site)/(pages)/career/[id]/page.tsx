import React from 'react'
import Breadcrumb from '@/components/Common/Breadcrumb'
import { notFound } from 'next/navigation'
import axios from 'axios'

// --- Konfigurasi API ---
const API_URL = `${process.env.NEXT_PUBLIC_API_BASE}/api/v1/website/careers`
const TOKEN = process.env.NEXT_PUBLIC_API_TOKEN
const axiosInstance = axios.create({
  headers: { Authorization: `Bearer ${TOKEN}` },
})

// --- Tipe Data ---
type JobDetail = {
  id: number
  title: string
  description: string
  body: string
  requirements: { requirement: string }[]
  responsibilities: { responsibility: string }[]
}

// --- Fungsi Fetching Data (Tidak perlu diubah) ---
export async function generateStaticParams() {
  try {
    const response = await axiosInstance.get(API_URL)
    const careers = response.data.data
    return careers.map((career: { id: number }) => ({
      id: career.id.toString(),
    }))
  } catch (error) {
    console.error('Failed to generate static params:', error)
    return []
  }
}

async function getJobDetail(id: string): Promise<JobDetail> {
  const detailUrl = `${API_URL}/${id}`
  try {
    const response = await axiosInstance.get(detailUrl)
    return response.data.data
  } catch (error) {
    console.error(`Failed to fetch job with ID ${id}:`, error)
    notFound()
  }
}

// --- Komponen Halaman Detail ---
const CareerDetail = async ({ params }: { params: { id: string } }) => {
  const job = await getJobDetail(params.id)

  const breadcrumbData = [
    { title: 'Home', path: '/' },
    { title: 'Career', path: '/career' },
    { title: job.title, path: `/career/${job.id}` },
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

  return (
    <>
      <Breadcrumb title={job.title} pages={breadcrumbData} />

      <section className="bg-gray-2 py-20 px-4 md:px-8 xl:px-0">
        <div className="max-w-[1170px] mx-auto bg-white rounded-lg shadow-md p-8 sm:p-12">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h1 className="text-3xl font-bold text-dark sm:text-4xl">
              {job.title}
            </h1>
            {/* ▼▼▼ GUNAKAN LINK YANG SUDAH DIBUAT DI SINI ▼▼▼ */}
            <a
              href={gmailLink} // Menggunakan variabel gmailLink
              target="_blank" // Agar membuka tab baru
              rel="noopener noreferrer"
              className="inline-block rounded-md bg-blue py-3 px-8 font-medium text-white transition-colors duration-300 hover:bg-blue-600"
            >
              Lamar Sekarang
            </a>
          </div>

          {/* ... sisa kode Anda (tidak perlu diubah) ... */}
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
          <div
            className="prose mb-8 text-lg text-gray-700"
            dangerouslySetInnerHTML={{ __html: job.body }}
          />
          {job.responsibilities.length > 0 && (
            <div className="mb-8">
              <h3 className="mb-4 text-2xl font-semibold text-dark">
                Tanggung Jawab
              </h3>
              <ul className="list-inside list-disc space-y-2 text-gray-700">
                {job.responsibilities.map((item, index) => (
                  <li key={index}>{item.responsibility}</li>
                ))}
              </ul>
            </div>
          )}
          {job.requirements.length > 0 && (
            <div>
              <h3 className="mb-4 text-2xl font-semibold text-dark">
                Persyaratan
              </h3>
              <ul className="list-inside list-disc space-y-2 text-gray-700">
                {job.requirements.map((item, index) => (
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

export default CareerDetail
