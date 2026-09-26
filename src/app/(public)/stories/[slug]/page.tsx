import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, User, ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('blog_posts').select('title,seo_title,seo_description').eq('slug', slug).single()
  if (!data) return { title: 'Story Not Found' }
  return { title: data.seo_title || data.title + ' | AgriFarm Tours TZ', description: data.seo_description }
}

export default async function StoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: post } = await supabase
    .from('blog_posts')
    .select('*, blog_categories(name), profiles(first_name, last_name)')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()
  if (!post) notFound()

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/stories" className="inline-flex items-center text-[var(--muted-foreground)] hover:text-[var(--primary)] text-sm mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Stories
        </Link>

        {post.blog_categories?.name && (
          <span className="text-xs font-bold tracking-widest text-[var(--accent)] uppercase">{post.blog_categories.name}</span>
        )}
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[var(--foreground)] mt-3 mb-6 leading-tight">{post.title}</h1>
        <div className="flex items-center gap-6 text-sm text-gray-400 mb-10 pb-8 border-b border-[var(--border)]">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {post.publish_date ? new Date(post.publish_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
          </div>
          {post.profiles && (
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              {post.profiles.first_name} {post.profiles.last_name}
            </div>
          )}
        </div>

        {post.cover_image && (
          <div className="relative w-full h-80 md:h-96 rounded-2xl overflow-hidden mb-10">
            <Image src={post.cover_image} alt={post.title} fill className="object-cover" />
          </div>
        )}

        <div className="prose prose-lg prose-headings:font-serif prose-headings:text-[var(--foreground)] prose-p:text-[var(--muted-foreground)] max-w-none">
          {post.content.split('\n').map((para: string, i: number) =>
            para.trim() ? <p key={i}>{para}</p> : <br key={i} />
          )}
        </div>

        <div className="mt-16 pt-8 border-t border-[var(--border)]">
          <Link href="/stories" className="inline-flex items-center text-[var(--primary)] font-medium hover:underline">
            <ArrowLeft className="w-4 h-4 mr-2" /> All Stories
          </Link>
        </div>
      </div>
    </div>
  )
}
