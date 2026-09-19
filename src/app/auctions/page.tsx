import Header from '@/components/storefront/Header/Header'
import Footer from '@/components/storefront/Footer/Footer'
import AuctionPageClient from '@/components/storefront/Auctions/AuctionPageClient'
export const metadata = { title: 'المزادات الإلكترونية | قطعة وقصة' }
export default function AuctionsPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background:'var(--cream)' }}>
      <Header locale="ar" />
      <main className="flex-1"><AuctionPageClient locale="ar" /></main>
      <Footer locale="ar" />
    </div>
  )
}
