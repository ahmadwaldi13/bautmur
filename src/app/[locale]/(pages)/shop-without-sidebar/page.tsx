import React from 'react'
import ShopWithoutSidebar from '@/components/ShopWithoutSidebar'

import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Product Page | Sinar Terang',
  description: 'This is Product Page for Baut Mur',
  // other metadata
}

const ShopWithoutSidebarPage = () => {
  return (
    <main>
      <ShopWithoutSidebar />
    </main>
  )
}

export default ShopWithoutSidebarPage
