import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { Plus, BookOpen } from 'lucide-react'
import { AdminActionButtons } from '@/components/admin/AdminActionButtons'

export default async function StoriesAdminPage() {
  const supabase = await createClient()
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('*, blog_categories(name)')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[var(--foreground)]">Stories</h1>
          <p className="text-[var(--muted-foreground)]">Manage blog posts and farm journal entries.</p>
        </div>
        <Link href="/admin/stories/new" className="inline-flex items-center bg-[var(--primary)] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#223a1a] transition-colors">
          <Plus className="w-4 h-4 mr-2" />New Story
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-[var(--border)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider border-b border-[var(--border)]">
                <th className="px-6 py-4 font-medium">Title</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Publish Date</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)] text-sm">
              {!posts || posts.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                  <BookOpen className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  No stories yet. Start writing!
                </td></tr>
              ) : posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900 max-w-xs truncate">{post.title}</td>
                  <td className="px-6 py-4 text-gray-500">{post.blog_categories?.name || '—'}</td>
                  <td className="px-6 py-4 text-gray-500 text-xs">{post.publish_date ? new Date(post.publish_date).toLocaleDateString() : '—'}</td>
                  <td className="px-6 py-4">
                    <span className={'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ' + (post.is_published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800')}>
                      {post.is_published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <AdminActionButtons 
                      id={post.id} 
                      slug={post.slug}
                      viewPath="/stories/"
                      editPath="/admin/stories/"
                      deleteEndpoint="/api/admin/stories/"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
