import Gallery from '@/components/Gallery'

import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Gallery Page | Sinar Terang',
  description: 'This is Gallery Page for Baut Mur',
  // other metadata
}

const GalleryPage = () => {
  return (
    <main>
      <Gallery />
    </main>
  )
}

export default GalleryPage
