'use client'

import { useState } from 'react'
import { Upload, FolderOpen, Image as ImageIcon } from 'lucide-react'

export default function MediaLibraryPage() {
  const [dragOver, setDragOver] = useState(false)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold text-[var(--foreground)]">Media Library</h1>
        <p className="text-[var(--muted-foreground)]">Upload and manage images and media files.</p>
      </div>

      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false) }}
        className={'border-2 border-dashed rounded-2xl p-16 text-center transition-colors ' + (dragOver ? 'border-[var(--primary)] bg-[var(--muted)]' : 'border-gray-200 bg-gray-50')}
      >
        <Upload className={'w-12 h-12 mx-auto mb-4 ' + (dragOver ? 'text-[var(--primary)]' : 'text-gray-300')} />
        <p className="text-lg font-medium text-gray-600 mb-2">Drag & drop files here</p>
        <p className="text-sm text-gray-400 mb-6">or click to browse from your computer</p>
        <label className="inline-block cursor-pointer bg-[var(--primary)] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#223a1a] transition-colors">
          <input type="file" multiple accept="image/*" className="hidden" />
          Browse Files
        </label>
      </div>

      <div className="bg-white rounded-xl border border-[var(--border)] p-12 text-center">
        <FolderOpen className="w-10 h-10 text-gray-200 mx-auto mb-3" />
        <p className="text-gray-400 mb-2">No media files yet.</p>
        <p className="text-sm text-gray-300">Files uploaded here will be stored in Supabase Storage.</p>
      </div>
    </div>
  )
}
