import React from 'react'
import Error from '@/components/Error'

import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Error Page | NextCommerce Nextjs E-commerce template',
  description: 'This is Error Page for NextCommerce Template',
  icons: {
    icon: '/logo-page.png', // Path relatif dari folder public
  },
}

const ErrorPage = () => {
  return (
    <main>
      <Error />
    </main>
  )
}

export default ErrorPage
