import Purchasing from '@/components/Purchasing'

import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Purchasing Page | Sinar Terang',
  description: 'This is Purchasing Page for Baut Mur',
  icons: {
    icon: '/logo-page.png',
  },
}

const PurchasingPage = () => {
  return (
    <main>
      <Purchasing />
    </main>
  )
}

export default PurchasingPage
