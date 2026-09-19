import Header from '@/components/storefront/Header/Header'
import Footer from '@/components/storefront/Footer/Footer'
import ShopClient from '@/components/storefront/Shop/ShopClient'

export const metadata = { title: 'المتجر | قطعة وقصة' }

export default function ShopPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--cream)' }}>
      <Header locale="ar" />
      <main className="flex-1">
        <ShopClient locale="ar" />
      </main>
      <Footer locale="ar" />
    </div>
  )
}
