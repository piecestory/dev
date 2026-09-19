import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const OrderSchema = z.object({
  items: z.array(z.object({
    productId: z.string(),
    quantity:  z.number().int().positive(),
    price:     z.number().positive(),
  })).min(1),
  customer: z.object({
    firstName: z.string().min(2),
    lastName:  z.string().min(2),
    phone:     z.string().min(9),
    email:     z.string().email().optional(),
    address:   z.string().min(5),
    city:      z.string().min(2),
    postalCode:z.string().optional(),
  }),
  paymentMethod: z.enum(['mada','visa','apple_pay','bank']),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const validated = OrderSchema.parse(body)

    const subtotal = validated.items.reduce((s, i) => s + i.price * i.quantity, 0)
    const shipping = subtotal > 500 ? 0 : 30
    const tax      = Math.round(subtotal * 0.15 * 100) / 100
    const total    = subtotal + shipping + tax

    const order = {
      id:        `PS-${Date.now()}`,
      status:    'PENDING',
      subtotal,  shipping, tax, total,
      customer:  validated.customer,
      items:     validated.items,
      createdAt: new Date().toISOString(),
    }
    return NextResponse.json({ success: true, order }, { status: 201 })
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'بيانات غير صالحة', details: err.issues }, { status: 400 })
    }
    return NextResponse.json({ error: 'خطأ في الخادم' }, { status: 500 })
  }
}
