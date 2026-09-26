import { createClient } from '@/utils/supabase/server'
import Image from 'next/image'
import Link from 'next/link'
import { Plus, Image as ImageIcon } from 'lucide-react'

export default async function GalleryPage() {
  const supabase = await createClient()
  const { data: items } = await supabase.from('gallery_items').select('*').order('display_order', { ascending: true })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[var(--foreground)]">Gallery</h1>
          <p className="text-[var(--muted-foreground)]">Manage photos shown in the public gallery.</p>
        </div>
        <Link href="/admin/gallery/new" className="inline-flex items-center bg-[var(--primary)] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#223a1a] transition-colors">
          <Plus className="w-4 h-4 mr-2" />Add Photo
        </Link>
      </div>

      {!items || items.length === 0 ? (
        <div className="bg-white rounded-xl border border-[var(--border)] p-12 text-center">
          <ImageIcon className="w-10 h-10 text-gray-200 mx-auto mb-3" />
          <p className="text-gray-400">No gallery items yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {items.map((item) => (
            <div key={item.id} className="group relative aspect-square bg-gray-100 rounded-xl overflow-hidden border border-[var(--border)]">
              <Image src={item.image_url} alt={item.title || 'Gallery'} fill className="object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end">
                <div className="p-3 translate-y-full group-hover:translate-y-0 transition-transform">
                  <p className="text-white text-xs font-medium truncate">{item.title}</p>
                </div>
              </div>
              {!item.is_published && (
                <div className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded">Draft</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
