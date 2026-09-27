'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, Edit, Trash2, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface AdminActionButtonsProps {
  id: string
  slug?: string
  viewPath?: string // e.g. "/experiences/"
  editPath: string // e.g. "/admin/experiences/"
  deleteEndpoint: string // e.g. "/api/admin/experiences/"
}

export function AdminActionButtons({ id, slug, viewPath, editPath, deleteEndpoint }: AdminActionButtonsProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this item?')) return

    setIsDeleting(true)
    try {
      const res = await fetch(`${deleteEndpoint}${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        router.refresh()
      } else {
        alert('Failed to delete item')
      }
    } catch (error) {
      alert('An error occurred while deleting')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="flex items-center justify-end space-x-3">
      {viewPath && slug && (
        <Link href={`${viewPath}${slug}`} target="_blank" className="text-gray-400 hover:text-[var(--primary)] inline-block" title="View">
          <Eye className="w-4 h-4" />
        </Link>
      )}
      
      <Link href={`${editPath}${id}/edit`} className="text-gray-400 hover:text-blue-600 inline-block" title="Edit">
        <Edit className="w-4 h-4" />
      </Link>
      
      <button 
        onClick={handleDelete}
        disabled={isDeleting}
        className="text-gray-400 hover:text-red-600 disabled:opacity-50 inline-block" 
        title="Delete"
      >
        {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
      </button>
    </div>
  )
}
