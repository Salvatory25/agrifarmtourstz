'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'

export default function NewTeamMemberPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    position: '',
    biography: '',
    photo_url: '',
    display_order: '0',
    is_published: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/admin/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          display_order: Number(form.display_order),
        }),
      })

      if (res.ok) router.push('/admin/team')
      else alert('Failed to create team member')
    } catch {
      alert('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = 'w-full border border-[var(--border)] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]'
  const labelClass = 'block text-sm font-medium text-gray-700 mb-1.5'

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/team" className="text-gray-400 hover:text-gray-600"><ArrowLeft className="w-5 h-5" /></Link>
          <div>
            <h1 className="text-2xl font-serif font-bold text-[var(--foreground)]">New Team Member</h1>
            <p className="text-[var(--muted-foreground)] text-sm">Add a staff member or local guide profile.</p>
          </div>
        </div>
        <button type="submit" disabled={loading} className="inline-flex items-center bg-[var(--primary)] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-[#223a1a] disabled:opacity-60 transition-colors">
          {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}Save Member
        </button>
      </div>

      <div className="bg-white rounded-xl border border-[var(--border)] p-8 space-y-6">
        <div>
          <label className={labelClass}>Name</label>
          <input required name="name" value={form.name} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Position</label>
          <input required name="position" value={form.position} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Biography</label>
          <textarea name="biography" value={form.biography} onChange={handleChange} rows={6} className={inputClass + ' resize-none'} />
        </div>
        <div>
          <label className={labelClass}>Photo URL</label>
          <input name="photo_url" value={form.photo_url} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Display Order</label>
          <input type="number" name="display_order" value={form.display_order} onChange={handleChange} className={inputClass} />
        </div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" name="is_published" checked={form.is_published} onChange={handleChange} className="w-5 h-5 rounded" />
          <span className="text-sm font-medium text-gray-700">Published</span>
        </label>
      </div>
    </form>
  )
}
