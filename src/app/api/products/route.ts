import { NextRequest, NextResponse } from 'next/server'
import { DEMO_PRODUCTS } from '@/lib/demo-data'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category')
  const q        = searchParams.get('q')?.toLowerCase()
  const page     = parseInt(searchParams.get('page') || '1')
  const limit    = parseInt(searchParams.get('limit') || '12')

  let products = [...DEMO_PRODUCTS]
  if (category) products = products.filter(p => p.categorySlug === category)
  if (q) products = products.filter(p => p.nameAr.toLowerCase().includes(q) || p.nameEn.toLowerCase().includes(q))

  const total = products.length
  const start = (page - 1) * limit
  const data  = products.slice(start, start + limit)

  return NextResponse.json({ data, total, page, pages: Math.ceil(total / limit) })
}
