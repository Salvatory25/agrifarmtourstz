import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const payload = {
      ...body,
      price: body.price ? Number(body.price) : null,
      capacity: body.capacity ? Number(body.capacity) : null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    const { data, error } = await supabase.from('experiences').insert(payload).select().single()

    if (error) throw error

    return NextResponse.json({ ok: true, data })
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : 'Unable to create experience' }, { status: 400 })
  }
}
