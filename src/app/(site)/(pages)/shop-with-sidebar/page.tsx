import React from 'react'
import ShopWithSidebar from '@/components/ShopWithSidebar'

import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Product Page | Sinar Terang',
  description: 'This is Product Page for Baut Mur',
  // other metadata
}

const ShopWithSidebarPage = () => {
  return (
    <main>
      <ShopWithSidebar />
    </main>
  )
}

export default ShopWithSidebarPage
