import React from 'react'
import ShopDetails from '@/components/ShopDetails'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Product Page | Sinar Terang',
  description: 'This is product Page for Baut Mur',
  // other metadata
}

const ShopDetailsPage = () => {
  return (
    <main>
      <ShopDetails />
    </main>
  )
}

export default ShopDetailsPage
