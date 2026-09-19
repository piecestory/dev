import Header from '@/components/storefront/Header/Header'
import Footer from '@/components/storefront/Footer/Footer'
import PersonalFinderForm from '@/components/storefront/PersonalFinder/PersonalFinderForm'
export const metadata = { title: 'الباحث الشخصي | قطعة وقصة' }
export default function PersonalFinderPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background:'var(--cream)' }}>
      <Header locale="ar" />
      <main className="flex-1"><PersonalFinderForm locale="ar" /></main>
      <Footer locale="ar" />
    </div>
  )
}
