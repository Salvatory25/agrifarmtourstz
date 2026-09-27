'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'

export default function NewStoryPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    cover_image: '',
    category_id: '',
    tags: '',
    seo_title: '',
    seo_description: '',
    is_published: false,
    is_featured: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const generateSlug = () => {
    const slug = form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    setForm((current) => ({ ...current, slug }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/admin/stories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          tags: form.tags
            .split(',')
            .map((tag) => tag.trim())
            .filter(Boolean),
        }),
      })

      if (res.ok) router.push('/admin/stories')
      else alert('Failed to create story')
    } catch {
      alert('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = 'w-full border border-[var(--border)] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]'
  const labelClass = 'block text-sm font-medium text-gray-700 mb-1.5'

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/stories" className="text-gray-400 hover:text-gray-600"><ArrowLeft className="w-5 h-5" /></Link>
          <div>
            <h1 className="text-2xl font-serif font-bold text-[var(--foreground)]">New Story</h1>
            <p className="text-[var(--muted-foreground)] text-sm">Share an update from the farm or community.</p>
          </div>
        </div>
        <button type="submit" disabled={loading} className="inline-flex items-center bg-[var(--primary)] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-[#223a1a] disabled:opacity-60 transition-colors">
          {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}Save Story
        </button>
      </div>

      <div className="bg-white rounded-xl border border-[var(--border)] p-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="sm:col-span-2">
            <label className={labelClass}>Story Title *</label>
            <input required name="title" value={form.title} onChange={handleChange} onBlur={generateSlug} className={inputClass} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>URL Slug *</label>
            <input required name="slug" value={form.slug} onChange={handleChange} className={inputClass} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Excerpt</label>
            <textarea name="excerpt" value={form.excerpt} onChange={handleChange} rows={3} className={inputClass + ' resize-none'} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Content</label>
            <textarea name="content" value={form.content} onChange={handleChange} rows={8} className={inputClass + ' resize-none'} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Cover Image URL</label>
            <input name="cover_image" value={form.cover_image} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Tags</label>
            <input name="tags" value={form.tags} onChange={handleChange} className={inputClass} placeholder="farm life, community, culture" />
          </div>
          <div>
            <label className={labelClass}>Category ID (optional)</label>
            <input name="category_id" value={form.category_id} onChange={handleChange} className={inputClass} placeholder="UUID" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[var(--border)] p-8 space-y-4">
        <h2 className="font-serif font-bold text-lg">SEO</h2>
        <div>
          <label className={labelClass}>SEO Title</label>
          <input name="seo_title" value={form.seo_title} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>SEO Description</label>
          <textarea name="seo_description" value={form.seo_description} onChange={handleChange} rows={2} className={inputClass + ' resize-none'} />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[var(--border)] p-8">
        <div className="flex items-center gap-8">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" name="is_published" checked={form.is_published} onChange={handleChange} className="w-5 h-5 rounded" />
            <span className="text-sm font-medium text-gray-700">Published</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" name="is_featured" checked={form.is_featured} onChange={handleChange} className="w-5 h-5 rounded" />
            <span className="text-sm font-medium text-gray-700">Featured</span>
          </label>
        </div>
      </div>
    </form>
  )
}
