import { notFound } from 'next/navigation'
import Header from '@/components/storefront/Header/Header'
import Footer from '@/components/storefront/Footer/Footer'
import ProductDetail from '@/components/storefront/Product/ProductDetail'
import { DEMO_PRODUCTS } from '@/lib/demo-data'

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return DEMO_PRODUCTS.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const product = DEMO_PRODUCTS.find(p => p.slug === slug)
  if (!product) return {}
  return { title: `${product.nameAr} | قطعة وقصة` }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = DEMO_PRODUCTS.find(p => p.slug === slug)
  if (!product) notFound()

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--cream)' }}>
      <Header locale="ar" />
      <main className="flex-1">
        <ProductDetail product={product} locale="ar" />
      </main>
      <Footer locale="ar" />
    </div>
  )
}
