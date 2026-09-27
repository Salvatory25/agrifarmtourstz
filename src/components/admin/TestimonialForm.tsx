'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'

export function TestimonialForm({ initialData }: { initialData?: any }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [experiences, setExperiences] = useState<any[]>([])
  const supabase = createClient()
  
  const [form, setForm] = useState({
    customer_name: initialData?.customer_name || '',
    country: initialData?.country || '',
    rating: initialData?.rating?.toString() || '5',
    review: initialData?.review || '',
    experience_id: initialData?.experience_id || '',
    is_published: initialData?.is_published || false,
  })

  const isEditing = !!initialData?.id

  useEffect(() => {
    async function fetchExperiences() {
      const { data } = await supabase.from('experiences').select('id, name').order('name')
      if (data) setExperiences(data)
    }
    fetchExperiences()
  }, [supabase])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = isEditing 
        ? `/api/admin/testimonials/${initialData.id}` 
        : '/api/admin/testimonials'
      
      const method = isEditing ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          rating: parseInt(form.rating),
          experience_id: form.experience_id || null
        }),
      })

      if (res.ok) {
        router.push('/admin/testimonials')
        router.refresh()
      } else {
        alert('Failed to save testimonial')
      }
    } catch {
      alert('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = 'w-full border border-[var(--border)] rounded-none px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]'
  const labelClass = 'block text-sm font-medium text-gray-700 mb-1.5'

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/testimonials" className="text-gray-400 hover:text-gray-600"><ArrowLeft className="w-5 h-5" /></Link>
          <div>
            <h1 className="text-2xl font-serif font-bold text-[var(--foreground)]">{isEditing ? 'Edit Testimonial' : 'New Testimonial'}</h1>
          </div>
        </div>
        <button type="submit" disabled={loading} className="inline-flex items-center bg-[var(--primary)] text-white px-5 py-2.5 rounded-none font-medium hover:bg-[#223a1a] disabled:opacity-60 transition-colors">
          {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}{isEditing ? 'Update Testimonial' : 'Save Testimonial'}
        </button>
      </div>

      <div className="bg-white border border-[var(--border)] p-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="sm:col-span-2">
            <label className={labelClass}>Customer Name *</label>
            <input required name="customer_name" value={form.customer_name} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Country</label>
            <input name="country" value={form.country} onChange={handleChange} className={inputClass} placeholder="e.g. USA" />
          </div>
          <div>
            <label className={labelClass}>Rating (1-5)</label>
            <select name="rating" value={form.rating} onChange={handleChange} className={inputClass + ' bg-white'}>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Related Experience</label>
            <select name="experience_id" value={form.experience_id} onChange={handleChange} className={inputClass + ' bg-white'}>
              <option value="">-- None --</option>
              {experiences.map(exp => (
                <option key={exp.id} value={exp.id}>{exp.name}</option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Review *</label>
            <textarea required name="review" value={form.review} onChange={handleChange} rows={5} className={inputClass + ' resize-none'} />
          </div>
        </div>
      </div>

      <div className="bg-white border border-[var(--border)] p-8">
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" name="is_published" checked={form.is_published} onChange={handleChange} className="w-5 h-5 rounded-none" />
          <span className="text-sm font-medium text-gray-700">Published</span>
        </label>
      </div>
    </form>
  )
}
