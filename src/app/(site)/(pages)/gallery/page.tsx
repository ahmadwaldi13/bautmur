import Gallery from '@/components/Gallery'

import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Gallery Page',
  description: 'This is Gallery Page for Baut Mur',
  icons: {
    icon: '/logo-page.png',
  },
}

const GalleryPage = () => {
  return (
    <main>
      <Gallery />
    </main>
  )
}

export default GalleryPage
