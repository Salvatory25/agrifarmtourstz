'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'

export function ExperienceForm({ initialData }: { initialData?: any }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  const [form, setForm] = useState({
    name: initialData?.name || '',
    slug: initialData?.slug || '',
    short_description: initialData?.short_description || '',
    full_description: initialData?.full_description || '',
    duration: initialData?.duration || '',
    price: initialData?.price?.toString() || '',
    currency: initialData?.currency || 'USD',
    capacity: initialData?.capacity?.toString() || '',
    meeting_point: initialData?.meeting_point || '',
    best_season: initialData?.best_season || '',
    featured_image: initialData?.featured_image || '',
    is_featured: initialData?.is_featured || false,
    is_published: initialData?.is_published || false,
    seo_title: initialData?.seo_title || '',
    seo_description: initialData?.seo_description || '',
  })

  const isEditing = !!initialData?.id

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setForm(f => ({
      ...f,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const generateSlug = () => {
    if (isEditing) return // Typically don't auto-generate on edit unless asked
    const slug = form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    setForm(f => ({ ...f, slug }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const url = isEditing 
        ? `/api/admin/experiences/${initialData.id}` 
        : '/api/admin/experiences'
      
      const method = isEditing ? 'PUT' : 'POST'
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          price: form.price ? parseFloat(form.price) : null,
          capacity: form.capacity ? parseInt(form.capacity) : null,
        }),
      })
      if (res.ok) {
        router.push('/admin/experiences')
        router.refresh()
      } else {
        alert('Failed to save experience')
      }
    } catch {
      alert('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = "w-full border border-[var(--border)] rounded-none px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5"

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/experiences" className="text-gray-400 hover:text-gray-600 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-serif font-bold text-[var(--foreground)]">
              {isEditing ? 'Edit Experience' : 'New Experience'}
            </h1>
            <p className="text-[var(--muted-foreground)] text-sm">
              {isEditing ? 'Update the experience details below.' : 'Create a new agricultural tour or experience.'}
            </p>
          </div>
        </div>
        <button type="submit" disabled={loading}
          className="inline-flex items-center bg-[var(--primary)] text-white px-5 py-2.5 rounded-none font-medium hover:bg-[#223a1a] disabled:opacity-60 transition-colors">
          {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          {isEditing ? 'Update Experience' : 'Save Experience'}
        </button>
      </div>

      {/* Basic Info */}
      <div className="bg-white border border-[var(--border)] p-8 space-y-6">
        <h2 className="font-serif font-bold text-lg text-[var(--foreground)]">Basic Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="sm:col-span-2">
            <label className={labelClass}>Experience Name *</label>
            <input required name="name" value={form.name} onChange={handleChange} onBlur={generateSlug}
              className={inputClass} placeholder="e.g. Zanzibar Spice Farm Tour" />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>URL Slug *</label>
            <div className="flex gap-2">
              <input required name="slug" value={form.slug} onChange={handleChange}
                className={inputClass} placeholder="zanzibar-spice-farm-tour" disabled={isEditing} />
              {!isEditing && (
                <button type="button" onClick={generateSlug}
                  className="px-4 py-3 bg-gray-100 text-gray-600 rounded-none text-sm hover:bg-gray-200 whitespace-nowrap transition-colors">
                  Generate
                </button>
              )}
            </div>
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Short Description</label>
            <textarea name="short_description" value={form.short_description} onChange={handleChange} rows={2}
              className={inputClass + " resize-none"} placeholder="A brief enticing summary..." />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Full Description</label>
            <textarea name="full_description" value={form.full_description} onChange={handleChange} rows={6}
              className={inputClass + " resize-none"} placeholder="Detailed description of the experience..." />
          </div>
        </div>
      </div>

      {/* Logistics */}
      <div className="bg-white border border-[var(--border)] p-8 space-y-6">
        <h2 className="font-serif font-bold text-lg text-[var(--foreground)]">Logistics & Pricing</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <label className={labelClass}>Duration</label>
            <input name="duration" value={form.duration} onChange={handleChange} className={inputClass} placeholder="e.g. 4 Hours" />
          </div>
          <div>
            <label className={labelClass}>Price</label>
            <input type="number" step="0.01" name="price" value={form.price} onChange={handleChange} className={inputClass} placeholder="150.00" />
          </div>
          <div>
            <label className={labelClass}>Currency</label>
            <select name="currency" value={form.currency} onChange={handleChange} className={inputClass + " bg-white"}>
              <option value="USD">USD</option>
              <option value="TZS">TZS</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Max Capacity</label>
            <input type="number" name="capacity" value={form.capacity} onChange={handleChange} className={inputClass} placeholder="12" />
          </div>
          <div>
            <label className={labelClass}>Best Season</label>
            <input name="best_season" value={form.best_season} onChange={handleChange} className={inputClass} placeholder="e.g. June - October" />
          </div>
          <div>
            <label className={labelClass}>Meeting Point</label>
            <input name="meeting_point" value={form.meeting_point} onChange={handleChange} className={inputClass} placeholder="e.g. Stone Town Gate" />
          </div>
        </div>
      </div>

      {/* Media */}
      <div className="bg-white border border-[var(--border)] p-8 space-y-6">
        <h2 className="font-serif font-bold text-lg text-[var(--foreground)]">Media</h2>
        <div>
          <label className={labelClass}>Featured Image URL</label>
          <input name="featured_image" value={form.featured_image} onChange={handleChange} className={inputClass} placeholder="https://..." />
        </div>
      </div>

      {/* SEO */}
      <div className="bg-white border border-[var(--border)] p-8 space-y-6">
        <h2 className="font-serif font-bold text-lg text-[var(--foreground)]">SEO</h2>
        <div className="space-y-4">
          <div>
            <label className={labelClass}>SEO Title</label>
            <input name="seo_title" value={form.seo_title} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>SEO Description</label>
            <textarea name="seo_description" value={form.seo_description} onChange={handleChange} rows={2} className={inputClass + " resize-none"} />
          </div>
        </div>
      </div>

      {/* Publishing */}
      <div className="bg-white border border-[var(--border)] p-8">
        <h2 className="font-serif font-bold text-lg text-[var(--foreground)] mb-6">Publishing</h2>
        <div className="flex items-center gap-8">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" name="is_published" checked={form.is_published} onChange={handleChange} className="w-5 h-5 rounded-none" />
            <span className="text-sm font-medium text-gray-700">Published (visible to public)</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" name="is_featured" checked={form.is_featured} onChange={handleChange} className="w-5 h-5 rounded-none" />
            <span className="text-sm font-medium text-gray-700">Featured on homepage</span>
          </label>
        </div>
      </div>
    </form>
  )
}
