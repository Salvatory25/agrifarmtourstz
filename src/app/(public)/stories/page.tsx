import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { Calendar, ArrowRight, Feather } from 'lucide-react'
import { safeImageUrl } from '@/lib/content'

// Cache this page - re-fetch at most every 10 minutes
export const revalidate = 600

export const metadata = {
  title: 'Stories | AGRI FARM TOURS',
  description: 'Read stories, articles and insights from the heart of Tanzanian agricultural tourism.',
}

const fallbackPosts = [
  {
    id: 's1', slug: null,
    title: 'A Morning with the Chagga Farmers of Kilimanjaro',
    excerpt: 'Before the sun had fully risen above the mountain, we were already knee-deep in the coffee bushes, learning a tradition that has sustained families for generations.',
    cover_image: 'https://images.unsplash.com/photo-1447195047884-9b4f2196ef6f?auto=format&fit=crop&q=80',
    publish_date: '2024-11-10',
    category: 'Field Stories',
    author: 'AGRI FARM TOURS Team',
  },
  {
    id: 's2', slug: null,
    title: 'Why Zanzibar\'s Spice Farms Are Unlike Anything on Earth',
    excerpt: 'The smell hits you before you see anything. A wave of cloves, cinnamon and nutmeg that makes you stop walking and just breathe. This is why they call it the Spice Island.',
    cover_image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80',
    publish_date: '2024-10-22',
    category: 'Destinations',
    author: 'AGRI FARM TOURS Team',
  },
  {
    id: 's3', slug: null,
    title: 'How Agri-Tourism is Changing Lives in Rural Tanzania',
    excerpt: 'For farming families in Arusha region, tourism is no longer just for the safari camps. Visitors who come to the farm bring income, connection, and fresh perspective.',
    cover_image: 'https://images.unsplash.com/photo-1531219572328-a0171b4448a3?auto=format&fit=crop&q=80',
    publish_date: '2024-09-15',
    category: 'Impact',
    author: 'AGRI FARM TOURS Team',
  },
  {
    id: 's4', slug: null,
    title: 'Fishing at Dawn on Lake Victoria — A Traveller\'s Account',
    excerpt: 'I had never woken up at 4am with such excitement. The fishermen laughed warmly as I tried to cast the net. By sunrise, we had breakfast caught fresh from the lake.',
    cover_image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&q=80',
    publish_date: '2024-08-30',
    category: 'Traveller Stories',
    author: 'Guest Contributor',
  },
  {
    id: 's5', slug: null,
    title: '5 Things Nobody Tells You About Farm Life in Tanzania',
    excerpt: 'The hard work, the laughter, the dust, the food — and the profound sense of community. Here\'s what to really expect when you step onto a working Tanzanian farm.',
    cover_image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80',
    publish_date: '2024-08-01',
    category: 'Travel Tips',
    author: 'AGRI FARM TOURS Team',
  },
  {
    id: 's6', slug: null,
    title: 'Tasting Tanzania: The Farm-to-Table Revolution',
    excerpt: 'Forget restaurants. The best meal we ever had in Tanzania was cooked over a wood fire by our host family after a day of harvesting maize together.',
    cover_image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80',
    publish_date: '2024-07-14',
    category: 'Food & Culture',
    author: 'AGRI FARM TOURS Team',
  },
]

export default async function StoriesPage() {
  const supabase = await createClient()
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('*, blog_categories(name)')
    .eq('is_published', true)
    .order('publish_date', { ascending: false })

  const displayData = posts && posts.length > 0 ? posts : fallbackPosts
  const [featured, ...rest] = displayData

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-80 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501786223405-6d024d7c3b8d?auto=format&fit=crop&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-green-950/80 via-green-900/50 to-green-950/80" />
        <div className="relative z-10 h-full flex flex-col justify-end pb-12 px-4 sm:px-6 max-w-7xl mx-auto w-full pt-28">
          <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-2">Journal</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white">Stories from the Farm</h1>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Featured Post */}
          {featured && (
            <div className="group mb-16 grid grid-cols-1 lg:grid-cols-2 gap-8 bg-gray-50 rounded-none overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="relative h-72 lg:h-auto overflow-hidden">
                {(featured as any).cover_image ? (
                  <img src={safeImageUrl((featured as any).cover_image, 'https://images.unsplash.com/photo-1501786223405-6d024d7c3b8d?auto=format&fit=crop&q=80')} alt={(featured as any).title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  <div className="h-full bg-green-800/10 flex items-center justify-center">
                    <Feather className="w-16 h-16 text-green-800/20" />
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <span className="bg-amber-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">Featured Story</span>
                </div>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <span className="text-xs font-bold tracking-wider text-amber-600 uppercase mb-3">
                  {(featured as any).blog_categories?.name || (featured as any).category || 'Story'}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:text-green-800 transition-colors leading-tight">
                  {(featured as any).title}
                </h2>
                <p className="text-gray-500 leading-relaxed mb-6">{(featured as any).excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Calendar className="w-3.5 h-3.5" />
                    {(featured as any).publish_date ? new Date((featured as any).publish_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
                  </div>
                  <Link href={(featured as any).slug ? `/stories/${(featured as any).slug}` : '/booking'} className="inline-flex items-center text-green-800 font-semibold text-sm hover:text-green-600 transition-colors">
                    Read Story <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Other Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {rest.map((post: any) => (
              <div key={post.id} className="group bg-white rounded-none overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  {post.cover_image ? (
                    <img src={safeImageUrl(post.cover_image, 'https://images.unsplash.com/photo-1501786223405-6d024d7c3b8d?auto=format&fit=crop&q=80')} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600" />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-green-800/10 to-amber-400/10 flex items-center justify-center">
                      <Feather className="w-10 h-10 text-green-800/20" />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <span className="text-xs font-bold tracking-wider text-amber-600 uppercase">{post.blog_categories?.name || post.category || 'Story'}</span>
                  <h3 className="text-lg font-bold text-gray-900 mt-2 mb-3 group-hover:text-green-800 transition-colors line-clamp-2">{post.title}</h3>
                  {post.excerpt && <p className="text-sm text-gray-500 line-clamp-3 mb-4">{post.excerpt}</p>}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center text-xs text-gray-400 gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.publish_date ? new Date(post.publish_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
                    </div>
                    <Link href={post.slug ? `/stories/${post.slug}` : '/booking'} className="inline-flex items-center text-green-800 text-sm font-semibold hover:text-green-600 transition-colors">
                      Read <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 bg-amber-50 border-t border-amber-100 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Write Your Own Story?</h2>
          <p className="text-gray-500 mb-8">Come visit and create memories that will last a lifetime on the farms of Tanzania.</p>
          <Link href="/booking" className="inline-flex items-center gap-2 bg-green-800 text-white px-8 py-4 rounded-full font-bold hover:bg-green-700 transition-colors">
            Plan Your Visit <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
