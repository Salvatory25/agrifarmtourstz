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
      experience_id: body.experience_id ?? null,
      customer_name: body.customer_name ?? '',
      country: body.country ?? '',
      profile_image: body.profile_image ?? '',
      review: body.review ?? '',
      rating: Number(body.rating ?? 5),
      is_published: Boolean(body.is_published),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    const { data, error } = await supabase.from('testimonials').insert(payload).select().single()

    if (error) throw error

    return NextResponse.json({ ok: true, data })
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : 'Unable to create testimonial' }, { status: 400 })
  }
}
