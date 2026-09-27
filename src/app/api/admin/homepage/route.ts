import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { data, error } = await supabase
      .from('homepage_sections')
      .select('*')
      .order('section_key', { ascending: true })

    if (error) throw error

    return NextResponse.json({ data: data ?? [] })
  } catch {
    return NextResponse.json({ data: [] })
  }
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const payload = await request.json()

  try {
    const rows = Array.isArray(payload) ? payload : [payload]

    const { data, error } = await supabase
      .from('homepage_sections')
      .upsert(
        rows.map((row) => ({
          section_key: row.section_key ?? 'home',
          content: row.content ?? row,
          updated_at: new Date().toISOString(),
        })),
        { onConflict: 'section_key' }
      )
      .select()

    if (error) throw error

    return NextResponse.json({ ok: true, data: data ?? [] })
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : 'Unable to save homepage content',
      },
      { status: 400 }
    )
  }
}
