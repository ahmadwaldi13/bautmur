import { Metadata } from 'next'
import Career from '@/components/Career'
import axios from 'axios' // 1. Import axios

export const metadata: Metadata = {
  title: 'Career Page',
  description: 'This is Career Page for Baut Mur',
  icons: {
    icon: '/logo-page.png',
  },
}

const API_URL = `${process.env.NEXT_PUBLIC_API_BASE}/api/v1/website/careers`
const TOKEN = process.env.NEXT_PUBLIC_API_TOKEN

async function getCareers() {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    })

    return response.data.data
  } catch (error) {
    console.error('Failed to fetch data:', error)
    throw new Error('Failed to fetch data from API.')
  }
}

const CareerPage = async () => {
  const careers = await getCareers()

  return (
    <main>
      <Career careers={careers} />
    </main>
  )
}

export default CareerPage
