import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { AdminActionButtons } from '@/components/admin/AdminActionButtons'

export default async function DestinationsPage() {
  const supabase = await createClient()

  const { data: destinations } = await supabase
    .from('destinations')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[var(--foreground)]">Destinations</h1>
          <p className="text-[var(--muted-foreground)]">Manage locations and regions for your tours.</p>
        </div>
        
        <Link 
          href="/admin/destinations/new"
          className="inline-flex items-center bg-[var(--primary)] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#223a1a] transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Destination
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-[var(--border)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider border-b border-[var(--border)]">
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Location</th>
                <th className="px-6 py-4 font-medium">Featured</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)] text-sm">
              {destinations?.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No destinations found. Click "Add Destination" to create one.
                  </td>
                </tr>
              ) : (
                destinations?.map((dest) => (
                  <tr key={dest.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{dest.name}</td>
                    <td className="px-6 py-4 text-gray-500">{dest.location || '—'}</td>
                    <td className="px-6 py-4 text-gray-500">
                      {dest.is_featured ? 'Yes' : 'No'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        dest.is_published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {dest.is_published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <AdminActionButtons 
                        id={dest.id} 
                        slug={dest.slug}
                        viewPath="/destinations/"
                        editPath="/admin/destinations/"
                        deleteEndpoint="/api/admin/destinations/"
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
