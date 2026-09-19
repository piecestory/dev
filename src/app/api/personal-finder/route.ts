import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const Schema = z.object({
  name:     z.string().min(2),
  phone:    z.string().min(9),
  email:    z.string().email().optional(),
  category: z.string().optional(),
  item:     z.string().min(3),
  budget:   z.number().positive().optional(),
  desc:     z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body      = await req.json()
    const validated = Schema.parse(body)
    // TODO: save to DB
    return NextResponse.json({ success: true, id: `PF-${Date.now()}` }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: 'بيانات غير صالحة' }, { status: 400 })
  }
}
