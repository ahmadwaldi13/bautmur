import React from 'react'
import CareerDetailComponent from '@/components/Career/CareerDetail'
import { notFound } from 'next/navigation'
import axios from 'axios'

import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Career Page',
  description: 'This is Career Page for Baut Mur',
  icons: {
    icon: '/logo-page.png',
  },
}

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE
const TOKEN = process.env.NEXT_PUBLIC_API_TOKEN

const axiosInstance = axios.create({
  headers: { Authorization: `Bearer ${TOKEN}` },
})

async function getCareerDetail(id: string) {
  const API_URL = `${apiBaseUrl}/api/v1/website/careers/${id}`
  try {
    const response = await axiosInstance.get(API_URL)

    return response.data.data
  } catch (error) {
    console.error('Failed to fetch career details:', error)
    return notFound()
  }
}

type Props = {
  params: Promise<{ id: string }>
}

const CareerDetailPage = async ({ params }: Props) => {
  // Await the params before accessing its properties
  const { id } = await params

  const jobData = await getCareerDetail(id)
  return <CareerDetailComponent job={jobData} />
}

export default CareerDetailPage
