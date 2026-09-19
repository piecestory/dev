import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const Schema = z.object({
  productId: z.string(),
  name:      z.string().min(2),
  phone:     z.string().min(9),
  email:     z.string().email().optional(),
  offer:     z.number().positive(),
  notes:     z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body      = await req.json()
    const validated = Schema.parse(body)
    // TODO: save to DB
    return NextResponse.json({ success: true, id: `AU-${Date.now()}` }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: 'بيانات غير صالحة' }, { status: 400 })
  }
}
