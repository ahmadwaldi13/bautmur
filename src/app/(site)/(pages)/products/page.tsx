import JMarket from '@/components/JMarket'

import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'JMarket Page',
  description: 'This is JMarket Page for Sinar Terang',
  icons: {
    icon: '/logo-page.png', // Path relatif dari folder public
  },
}

const JMarketPage = () => {
  return (
    <main>
      <JMarket />
    </main>
  )
}

export default JMarketPage
