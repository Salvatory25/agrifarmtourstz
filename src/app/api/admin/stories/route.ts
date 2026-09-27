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
      title: body.title ?? '',
      slug: body.slug ?? '',
      excerpt: body.excerpt ?? '',
      content: body.content ?? '',
      cover_image: body.cover_image ?? '',
      category_id: body.category_id ?? null,
      author_id: body.author_id ?? user.id,
      is_published: Boolean(body.is_published),
      is_featured: Boolean(body.is_featured),
      publish_date: body.publish_date ?? new Date().toISOString(),
      seo_title: body.seo_title ?? '',
      seo_description: body.seo_description ?? '',
      tags: Array.isArray(body.tags) ? body.tags : [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    const { data, error } = await supabase.from('blog_posts').insert(payload).select().single()

    if (error) throw error

    return NextResponse.json({ ok: true, data })
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : 'Unable to create story' }, { status: 400 })
  }
}
