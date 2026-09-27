'use client'

import { useEffect, useState } from 'react'
import { Loader2, Save, CheckCircle2 } from 'lucide-react'

const defaultData = {
  hero: {
    heading: 'Go Beyond the Safari. Discover Where Tanzania Grows.',
    subtitle: 'Experience Nature, Live the Farm',
    description: 'Connect with local farming communities, taste authentic Tanzanian food, and explore authentic agri-tourism experiences rooted in culture, people, and place.',
    cta_text: 'Discover More',
    cta_link: '/experiences',
    image_url: 'https://images.unsplash.com/photo-1592982537447-6f23f7908bc2?auto=format&fit=crop&q=75&w=1920',
  },
  intro: {
    heading: 'What makes AgriFarm Tours TZ different?',
    description: 'We create meaningful journeys that connect travellers with Tanzanian farmers, food producers, coastal communities, and cultural traditions. Every visit celebrates agriculture, community, and hospitality.',
    image_url: 'https://images.unsplash.com/photo-1501786223405-6d024d7c3b8d?auto=format&fit=crop&q=80',
    cta_text: 'Our Story',
    cta_link: '/about',
  },
}

export default function HomepageManagementPage() {
  const [form, setForm] = useState(defaultData)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/admin/homepage')
        const json = await res.json()
        const rows = Array.isArray(json?.data) ? json.data : []
        const memo: Record<string, any> = {}

        for (const row of rows) {
          if (row?.section_key) memo[row.section_key] = row.content ?? {}
        }

        setForm({
          hero: { ...defaultData.hero, ...(memo.hero ?? {}) },
          intro: { ...defaultData.intro, ...(memo.intro ?? {}) },
        })
      } catch {
        setForm(defaultData)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  const updateField = (section: 'hero' | 'intro', field: string, value: string) => {
    setForm((current) => ({
      ...current,
      [section]: {
        ...current[section],
        [field]: value,
      },
    }))
  }

  const save = async () => {
    setSaving(true)
    setSaved(false)

    try {
      const payload = [
        { section_key: 'hero', content: form.hero },
        { section_key: 'intro', content: form.intro },
      ]

      const res = await fetch('/api/admin/homepage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        throw new Error('Unable to save homepage content')
      }

      setSaved(true)
    } catch {
      alert('Unable to save homepage content right now.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[var(--foreground)]">Homepage Management</h1>
          <p className="text-[var(--muted-foreground)]">Update the main homepage content without touching code.</p>
        </div>
        <button onClick={save} disabled={saving} className="inline-flex items-center bg-[var(--primary)] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-[#223a1a] transition-colors disabled:opacity-70">
          {saving ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving…</> : <><Save className="w-4 h-4 mr-2" /> Save Changes</>}
        </button>
      </div>

      {saved ? <div className="inline-flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-full px-3 py-2"><CheckCircle2 className="w-4 h-4" /> Homepage content saved</div> : null}

      {loading ? (
        <div className="bg-white rounded-xl border border-[var(--border)] p-8 text-sm text-gray-500">Loading homepage content…</div>
      ) : (
        <>
          <div className="bg-white rounded-xl border border-[var(--border)] p-8 space-y-6">
            <h2 className="text-xl font-serif font-bold text-[var(--foreground)]">Hero Section</h2>
            <div className="grid gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Heading</label>
                <input value={form.hero.heading} onChange={(e) => updateField('hero', 'heading', e.target.value)} className="w-full border border-[var(--border)] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Subtitle</label>
                <input value={form.hero.subtitle} onChange={(e) => updateField('hero', 'subtitle', e.target.value)} className="w-full border border-[var(--border)] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                <textarea value={form.hero.description} onChange={(e) => updateField('hero', 'description', e.target.value)} rows={4} className="w-full border border-[var(--border)] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] resize-none" />
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">CTA Text</label>
                  <input value={form.hero.cta_text} onChange={(e) => updateField('hero', 'cta_text', e.target.value)} className="w-full border border-[var(--border)] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">CTA Link</label>
                  <input value={form.hero.cta_link} onChange={(e) => updateField('hero', 'cta_link', e.target.value)} className="w-full border border-[var(--border)] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Image URL</label>
                <input value={form.hero.image_url} onChange={(e) => updateField('hero', 'image_url', e.target.value)} className="w-full border border-[var(--border)] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[var(--border)] p-8 space-y-6">
            <h2 className="text-xl font-serif font-bold text-[var(--foreground)]">Introduction Section</h2>
            <div className="grid gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Heading</label>
                <input value={form.intro.heading} onChange={(e) => updateField('intro', 'heading', e.target.value)} className="w-full border border-[var(--border)] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                <textarea value={form.intro.description} onChange={(e) => updateField('intro', 'description', e.target.value)} rows={4} className="w-full border border-[var(--border)] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] resize-none" />
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">CTA Text</label>
                  <input value={form.intro.cta_text} onChange={(e) => updateField('intro', 'cta_text', e.target.value)} className="w-full border border-[var(--border)] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">CTA Link</label>
                  <input value={form.intro.cta_link} onChange={(e) => updateField('intro', 'cta_link', e.target.value)} className="w-full border border-[var(--border)] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Image URL</label>
                <input value={form.intro.image_url} onChange={(e) => updateField('intro', 'image_url', e.target.value)} className="w-full border border-[var(--border)] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
