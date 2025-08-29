import Home from '@/components/Home'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Toko Baut Sinar Terang',
  description: 'This is Home for Toko Baut Sinar Terang',
  icons: {
    icon: '/logo-page.png', // Path relatif dari folder public
  },
}

export default function HomePage() {
  return (
    <>
      <Home />
    </>
  )
}
