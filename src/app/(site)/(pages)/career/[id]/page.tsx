// src/app/(site)/(pages)/career/[id]/page.tsx

import React from 'react'
import { notFound } from 'next/navigation'
import Breadcrumb from '@/components/Common/Breadcrumb' // Sesuaikan path import jika perlu

// Definisikan tipe untuk props yang diterima halaman ini
// Di Next.js 15, params adalah Promise
type Props = {
  params: Promise<{ id: string }>
}

// Variabel lingkungan
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE
const TOKEN = process.env.NEXT_PUBLIC_API_TOKEN

async function getCareerDetail(id: string) {
  const API_URL = `${apiBaseUrl}/api/v1/website/careers/${id}`

  try {
    const res = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      cache: 'no-store',
    })

    if (!res.ok) {
      return notFound()
    }

    const result = await res.json()
    return result.data // Sebaiknya definisikan tipe untuk data API juga
  } catch (error) {
    console.error('Failed to fetch career details:', error)
    return notFound()
  }
}

// Terapkan tipe 'Props' di sini
const CareerDetail = async ({ params }: Props) => {
  // Di Next.js 15, params harus di-await terlebih dahulu
  const { id } = await params
  const job = await getCareerDetail(id)

  // Jika job tidak ditemukan, notFound() akan menghentikan render
  if (!job) {
    notFound()
  }

  const breadcrumbData = [
    { title: 'Home', path: '/' },
    { title: 'Career', path: '/career' },
    { title: job.title, path: `/career/${id}` },
  ]

  return (
    <>
      <Breadcrumb title={job.title} pages={breadcrumbData} />

      <section className="bg-gray-2 py-20 px-4 md:px-8 xl:px-0">
        <div className="max-w-[1170px] mx-auto bg-white rounded-lg shadow-md p-8 sm:p-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-dark mb-6">
            {job.title}
          </h1>

          {/* Render body HTML dari API */}
          {job.body && (
            <div
              className="text-gray-700 text-lg mb-8 prose"
              dangerouslySetInnerHTML={{ __html: job.body }}
            />
          )}

          {/* Render Responsibilities */}
          {job.responsibilities && job.responsibilities.length > 0 && (
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-dark mb-4">
                Tanggung Jawab
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {job.responsibilities.map((item: any, index: number) => (
                  <li key={index}>{item.responsibility}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Render Requirements */}
          {job.requirements && job.requirements.length > 0 && (
            <div>
              <h3 className="text-2xl font-semibold text-dark mb-4">
                Persyaratan
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
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

export default CareerDetail
