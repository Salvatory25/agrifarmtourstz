import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Stories | AgriFarm Tours TZ',
  description: 'Read stories, articles and insights from the heart of Tanzanian agricultural tourism.',
}

export default async function StoriesPage() {
  const supabase = await createClient()
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('*, blog_categories(name)')
    .eq('is_published', true)
    .order('publish_date', { ascending: false })

  return (
    <div className="min-h-screen">
      <section className="relative h-72 bg-[var(--primary)] flex items-end pb-12 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2d4a22] to-[#1a2e12]" />
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-28">
          <p className="text-[var(--accent)] text-sm font-medium uppercase tracking-widest mb-2">Journal</p>
          <h1 className="text-4xl md:text-5xl font-serif text-white font-bold">Stories from the Farm</h1>
        </div>
      </section>

      <section className="py-20 px-6 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto">
          {!posts || posts.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-2xl border border-[var(--border)]">
              <p className="text-gray-500 text-lg">Stories are being written. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link key={post.id} href={`/stories/${post.slug}`}
                  className="group block bg-white rounded-2xl overflow-hidden border border-[var(--border)] shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="relative h-52 bg-gray-100 overflow-hidden">
                    {post.cover_image
                      ? <Image src={post.cover_image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      : <div className="absolute inset-0 bg-gradient-to-br from-[#2d4a22]/10 to-[#e6b95c]/10 flex items-center justify-center">
                          <span className="font-serif italic text-2xl text-[#2d4a22]/20">AgriFarm</span>
                        </div>}
                  </div>
                  <div className="p-6">
                    {post.blog_categories?.name && (
                      <span className="text-xs font-bold tracking-widest text-[var(--accent)] uppercase">{post.blog_categories.name}</span>
                    )}
                    <h2 className="text-xl font-serif font-bold text-[var(--foreground)] mt-2 mb-3 group-hover:text-[var(--primary)] transition-colors line-clamp-2">{post.title}</h2>
                    {post.excerpt && <p className="text-sm text-gray-500 line-clamp-3 mb-4">{post.excerpt}</p>}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center text-xs text-gray-400">
                        <Calendar className="w-3.5 h-3.5 mr-1.5" />
                        {post.publish_date ? new Date(post.publish_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : ''}
                      </div>
                      <div className="flex items-center text-[var(--primary)] text-sm font-medium">
                        Read <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
