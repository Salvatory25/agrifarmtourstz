'use client'

import { useEffect, useState } from 'react'
import { Settings, Mail, Phone, Globe, Loader2, CheckCircle2 } from 'lucide-react'

const initialValues = {
  company_name: 'AgriFarm Tours TZ',
  default_currency: 'USD',
  email: 'admin@agrifarmtours.co.tz',
  phone: '+255785844931',
  whatsapp: '+255785844931',
}

export default function SettingsPage() {
  const [form, setForm] = useState(initialValues)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/admin/settings')
        const json = await res.json()
        if (json?.data) {
          setForm({ ...initialValues, ...json.data })
        }
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  const save = async () => {
    setSaving(true)
    setSaved(false)

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        throw new Error('Unable to save settings')
      }

      setSaved(true)
    } catch {
      alert('Unable to save settings right now.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-serif font-bold text-[var(--foreground)]">Settings</h1>
        <p className="text-[var(--muted-foreground)]">Manage your site settings and configuration.</p>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl border border-[var(--border)] p-8 text-sm text-gray-500">Loading settings…</div>
      ) : (
        <>
          <div className="bg-white rounded-xl border border-[var(--border)] p-8 space-y-6">
            <h2 className="font-serif font-bold text-lg flex items-center gap-2"><Settings className="w-5 h-5" /> Site Configuration</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Company Name</label>
                <input value={form.company_name} onChange={(e) => setForm({ ...form, company_name: e.target.value })} className="w-full border border-[var(--border)] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Default Currency</label>
                <select value={form.default_currency} onChange={(e) => setForm({ ...form, default_currency: e.target.value })} className="w-full border border-[var(--border)] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-white">
                  <option value="USD">USD</option>
                  <option value="TZS">TZS</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[var(--border)] p-8 space-y-6">
            <h2 className="font-serif font-bold text-lg flex items-center gap-2"><Mail className="w-5 h-5" /> Contact Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> Email</label>
                <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border border-[var(--border)] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> Phone</label>
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full border border-[var(--border)] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1"><Globe className="w-3.5 h-3.5" /> WhatsApp</label>
                <input value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} className="w-full border border-[var(--border)] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            {saved ? <span className="inline-flex items-center gap-2 text-sm text-green-700"><CheckCircle2 className="w-4 h-4" /> Saved</span> : null}
            <button onClick={save} disabled={saving} className="bg-[var(--primary)] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#223a1a] transition-colors disabled:opacity-70">
              {saving ? <span className="inline-flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Saving…</span> : 'Save Settings'}
            </button>
          </div>
        </>
      )}
    </div>
  )
}
