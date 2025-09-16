import Career from '@/components/Career'

import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Career Page',
  description: 'This is Career Page for Baut Mur',
  icons: {
    icon: '/logo-page.png',
  },
}

const CareerPage = () => {
  return (
    <main>
      <Career />
    </main>
  )
}

export default CareerPage
