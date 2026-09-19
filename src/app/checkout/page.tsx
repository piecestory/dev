import Header from '@/components/storefront/Header/Header'
import Footer from '@/components/storefront/Footer/Footer'
import CheckoutClient from '@/components/storefront/Checkout/CheckoutClient'

export const metadata = { title: 'الدفع | قطعة وقصة' }

export default function CheckoutPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--cream)' }}>
      <Header locale="ar" />
      <main className="flex-1">
        <CheckoutClient locale="ar" />
      </main>
      <Footer locale="ar" />
    </div>
  )
}
