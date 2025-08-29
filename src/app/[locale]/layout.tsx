'use client'
import { useState, useEffect } from 'react'
import '../css/euclid-circular-a-font.css'
import '../css/style.css'
import '../css/hero-carouse.css'
import '../css/wa-style.css'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Maven_Pro, Lato } from 'next/font/google'

import { ModalProvider } from '../context/QuickViewModalContext'
import { CartModalProvider } from '../context/CartSidebarModalContext'
import { ReduxProvider } from '@/redux/provider'
import QuickViewModal from '@/components/Common/QuickViewModal'
import CartSidebarModal from '@/components/Common/CartSidebarModal'
import { PreviewSliderProvider } from '../context/PreviewSliderContext'
import PreviewSliderModal from '@/components/Common/PreviewSlider'
import NewProductPopup from '@/components/PopUpAds'

import ScrollToTop from '@/components/Common/ScrollToTop'
import PreLoader from '@/components/Common/PreLoader'
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton'

const mavenPro = Maven_Pro({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-maven-pro',
  display: 'swap',
})

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-lato',
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])

  return (
    <html
      lang="en"
      suppressHydrationWarning={true}
      className={`${mavenPro.variable} ${lato.variable}`}
    >
      <body>
        {loading ? (
          <PreLoader />
        ) : (
          <>
            <NewProductPopup />
            <ReduxProvider>
              <CartModalProvider>
                <ModalProvider>
                  <PreviewSliderProvider>
                    <Header />

                    {children}

                    <QuickViewModal />
                    <CartSidebarModal />
                    <PreviewSliderModal />
                  </PreviewSliderProvider>
                </ModalProvider>
              </CartModalProvider>
            </ReduxProvider>
            <WhatsAppFloatingButton
              phoneNumber="6285624203634"
              message="Halo, saya tertarik dengan produk di website Anda"
            />
            <ScrollToTop />
            <Footer />
          </>
        )}
      </body>
    </html>
  )
}
