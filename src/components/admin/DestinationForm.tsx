'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'

export function DestinationForm({ initialData }: { initialData?: any }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  const [form, setForm] = useState({
    name: initialData?.name || '',
    slug: initialData?.slug || '',
    description: initialData?.description || '',
    hero_image: initialData?.hero_image || '',
    location: initialData?.location || '',
    travel_information: initialData?.travel_information || '',
    is_featured: initialData?.is_featured || false,
    is_published: initialData?.is_published || false,
    seo_title: initialData?.seo_title || '',
    seo_description: initialData?.seo_description || '',
  })

  const isEditing = !!initialData?.id

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value }))
  }

  const generateSlug = () => {
    if (isEditing) return
    setForm(f => ({ ...f, slug: f.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const url = isEditing 
        ? `/api/admin/destinations/${initialData.id}` 
        : '/api/admin/destinations'
      
      const method = isEditing ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method, 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(form),
      })
      if (res.ok) {
        router.push('/admin/destinations')
        router.refresh()
      } else {
        alert('Failed to save destination')
      }
    } catch { alert('An error occurred') } finally { setLoading(false) }
  }

  const inputClass = "w-full border border-[var(--border)] rounded-none px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5"

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/destinations" className="text-gray-400 hover:text-gray-600"><ArrowLeft className="w-5 h-5" /></Link>
          <div>
            <h1 className="text-2xl font-serif font-bold text-[var(--foreground)]">{isEditing ? 'Edit Destination' : 'New Destination'}</h1>
            <p className="text-[var(--muted-foreground)] text-sm">{isEditing ? 'Update the details for this destination.' : 'Add a new location or region to the platform.'}</p>
          </div>
        </div>
        <button type="submit" disabled={loading}
          className="inline-flex items-center bg-[var(--primary)] text-white px-5 py-2.5 rounded-none font-medium hover:bg-[#223a1a] disabled:opacity-60 transition-colors">
          {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}{isEditing ? 'Update Destination' : 'Save Destination'}
        </button>
      </div>

      <div className="bg-white border border-[var(--border)] p-8 space-y-6">
        <h2 className="font-serif font-bold text-lg">Basic Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="sm:col-span-2">
            <label className={labelClass}>Destination Name *</label>
            <input required name="name" value={form.name} onChange={handleChange} onBlur={generateSlug} className={inputClass} placeholder="e.g. Zanzibar" />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>URL Slug *</label>
            <div className="flex gap-2">
              <input required name="slug" value={form.slug} onChange={handleChange} className={inputClass} placeholder="zanzibar" disabled={isEditing} />
              {!isEditing && (
                <button type="button" onClick={generateSlug} className="px-4 py-3 bg-gray-100 text-gray-600 rounded-none text-sm hover:bg-gray-200 whitespace-nowrap transition-colors">Generate</button>
              )}
            </div>
          </div>
          <div>
            <label className={labelClass}>Location / Region</label>
            <input name="location" value={form.location} onChange={handleChange} className={inputClass} placeholder="e.g. Coastal Tanzania" />
          </div>
          <div>
            <label className={labelClass}>Hero Image URL</label>
            <input name="hero_image" value={form.hero_image} onChange={handleChange} className={inputClass} placeholder="https://..." />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={4} className={inputClass + " resize-none"} placeholder="Rich description of this destination..." />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Travel Information</label>
            <textarea name="travel_information" value={form.travel_information} onChange={handleChange} rows={3} className={inputClass + " resize-none"} placeholder="How to get there, best time to visit, etc." />
          </div>
        </div>
      </div>

      <div className="bg-white border border-[var(--border)] p-8 space-y-4">
        <h2 className="font-serif font-bold text-lg">SEO</h2>
        <div>
          <label className={labelClass}>SEO Title</label>
          <input name="seo_title" value={form.seo_title} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>SEO Description</label>
          <textarea name="seo_description" value={form.seo_description} onChange={handleChange} rows={2} className={inputClass + " resize-none"} />
        </div>
      </div>

      <div className="bg-white border border-[var(--border)] p-8">
        <h2 className="font-serif font-bold text-lg mb-6">Publishing</h2>
        <div className="flex items-center gap-8">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" name="is_published" checked={form.is_published} onChange={handleChange} className="w-5 h-5 rounded-none" />
            <span className="text-sm font-medium text-gray-700">Published</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" name="is_featured" checked={form.is_featured} onChange={handleChange} className="w-5 h-5 rounded-none" />
            <span className="text-sm font-medium text-gray-700">Featured</span>
          </label>
        </div>
      </div>
    </form>
  )
}
