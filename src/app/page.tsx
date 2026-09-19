import Header from '@/components/storefront/Header/Header'
import HeroCarousel from '@/components/storefront/Hero/HeroCarousel'
import CategoryStrip from '@/components/storefront/CategoryStrip/CategoryStrip'
import ProductSection from '@/components/storefront/ProductSection/ProductSection'
import AuctionSection from '@/components/storefront/AuctionSection/AuctionSection'
import TrustBar from '@/components/storefront/TrustBar/TrustBar'
import ServiceSection from '@/components/storefront/ServiceSection/ServiceSection'
import TestimonialsSection from '@/components/storefront/TestimonialsSection/TestimonialsSection'
import WhyUsSection from '@/components/storefront/WhyUsSection'
import NewsletterSection from '@/components/storefront/Newsletter/NewsletterSection'
import PersonalFinderBanner from '@/components/storefront/PersonalFinder/PersonalFinderBanner'
import Footer from '@/components/storefront/Footer/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--cream)' }}>
      <Header locale="ar" />
      <main>
        <HeroCarousel locale="ar" />
        <TrustBar locale="ar" />
        <CategoryStrip locale="ar" />
        <ProductSection locale="ar" sectionType="latest" />
        <AuctionSection locale="ar" />
        <PersonalFinderBanner locale="ar" />
        <ServiceSection locale="ar" />
        <ProductSection locale="ar" sectionType="featured" />
        <WhyUsSection locale="ar" />
        <TestimonialsSection locale="ar" />
        <NewsletterSection locale="ar" />
      </main>
      <Footer locale="ar" />
    </div>
  )
}
