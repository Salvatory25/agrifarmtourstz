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
      title: body.title ?? 'Untitled gallery item',
      image_url: body.image_url ?? '',
      category: body.category ?? 'General',
      display_order: Number(body.display_order ?? 0),
      is_published: Boolean(body.is_published),
      created_at: new Date().toISOString(),
    }

    const { data, error } = await supabase.from('gallery_items').insert(payload).select().single()

    if (error) throw error

    return NextResponse.json({ ok: true, data })
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : 'Unable to create gallery item' }, { status: 400 })
  }
}
