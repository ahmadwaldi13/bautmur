import Home from '@/components/Home'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Toko Baut Sinar Terang',
  description: 'This is Home for Toko Baut Sinar Terang',
  // other metadata
}

export default function HomePage() {
  return (
    <>
      <Home />
    </>
  )
}
