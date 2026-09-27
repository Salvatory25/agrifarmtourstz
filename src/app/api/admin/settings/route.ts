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
      .from('site_settings')
      .select('*')
      .limit(1)
      .maybeSingle()

    if (error) throw error

    return NextResponse.json({ data: data ?? { company_name: 'AgriFarm Tours TZ', default_currency: 'USD', email: 'admin@agrifarmtours.co.tz', phone: '+255785844931', whatsapp: '+255785844931' } })
  } catch {
    return NextResponse.json({ data: { company_name: 'AgriFarm Tours TZ', default_currency: 'USD', email: 'admin@agrifarmtours.co.tz', phone: '+255785844931', whatsapp: '+255785844931' } })
  }
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const payload = {
      company_name: body.company_name ?? 'AgriFarm Tours TZ',
      email: body.email ?? '',
      phone: body.phone ?? '',
      whatsapp: body.whatsapp ?? '',
      default_currency: body.default_currency ?? 'USD',
      updated_at: new Date().toISOString(),
    }

    const { data: existing } = await supabase.from('site_settings').select('id').limit(1).maybeSingle()

    const { data, error } = existing
      ? await supabase.from('site_settings').update(payload).eq('id', existing.id).select().single()
      : await supabase.from('site_settings').insert(payload).select().single()

    if (error) throw error

    return NextResponse.json({ ok: true, data })
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : 'Unable to save settings' }, { status: 400 })
  }
}
