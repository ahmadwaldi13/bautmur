import Purchasing from '@/components/Purchasing'

import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Purchasing Page | Sinar Terang',
  description: 'This is Purchasing Page for Baut Mur',
  // other metadata
}

const PurchasingPage = () => {
  return (
    <main>
      <Purchasing />
    </main>
  )
}

export default PurchasingPage
