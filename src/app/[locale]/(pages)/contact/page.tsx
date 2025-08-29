import Contact from '@/components/Contact'

import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Contact Page | Sinar Terang',
  description: 'This is Contact Page for Sinar Terang',
  icons: {
    icon: '/logo-page.png', // Path relatif dari folder public
  },
}

const ContactPage = () => {
  return (
    <main>
      <Contact />
    </main>
  )
}

export default ContactPage
