'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'

export default function NewTestimonialPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    customer_name: '',
    country: '',
    experience_id: '',
    profile_image: '',
    review: '',
    rating: '5',
    is_published: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      const res = await fetch('/api/admin/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, rating: Number(form.rating) }),
      })

      if (res.ok) router.push('/admin/testimonials')
      else alert('Failed to create testimonial')
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
          <Link href="/admin/testimonials" className="text-gray-400 hover:text-gray-600"><ArrowLeft className="w-5 h-5" /></Link>
          <div>
            <h1 className="text-2xl font-serif font-bold text-[var(--foreground)]">New Testimonial</h1>
            <p className="text-[var(--muted-foreground)] text-sm">Add a customer review to the site.</p>
          </div>
        </div>
        <button type="submit" disabled={loading} className="inline-flex items-center bg-[var(--primary)] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-[#223a1a] disabled:opacity-60 transition-colors">
          {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}Save Review
        </button>
      </div>

      <div className="bg-white rounded-xl border border-[var(--border)] p-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Customer Name</label>
            <input required name="customer_name" value={form.customer_name} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Country</label>
            <input name="country" value={form.country} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Experience ID (optional)</label>
            <input name="experience_id" value={form.experience_id} onChange={handleChange} className={inputClass} placeholder="UUID" />
          </div>
          <div>
            <label className={labelClass}>Rating</label>
            <select name="rating" value={form.rating} onChange={handleChange} className={inputClass + ' bg-white'}>
              {[5,4,3,2,1].map((value) => <option key={value} value={value}>{value} stars</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className={labelClass}>Profile Image URL</label>
          <input name="profile_image" value={form.profile_image} onChange={handleChange} className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Review</label>
          <textarea required name="review" value={form.review} onChange={handleChange} rows={6} className={inputClass + ' resize-none'} />
        </div>

        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" name="is_published" checked={form.is_published} onChange={handleChange} className="w-5 h-5 rounded" />
          <span className="text-sm font-medium text-gray-700">Published</span>
        </label>
      </div>
    </form>
  )
}
