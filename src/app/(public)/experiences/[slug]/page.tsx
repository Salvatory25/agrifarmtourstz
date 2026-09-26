import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Clock, Users, ArrowRight, Check, X } from 'lucide-react'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('experiences').select('name, seo_title, seo_description').eq('slug', slug).single()
  
  if (!data) return { title: 'Experience Not Found' }
  
  return {
    title: data.seo_title || `${data.name} | AgriFarm Tours TZ`,
    description: data.seo_description || `Discover ${data.name} with AgriFarm Tours TZ.`,
  }
}

export default async function ExperienceDetailPage({ params }: PageProps) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: exp } = await supabase
    .from('experiences')
    .select('*, destinations(name, slug), experience_categories(name)')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (!exp) {
    notFound()
  }

  // Parse JSONB arrays safely
  const highlights = Array.isArray(exp.highlights) ? exp.highlights : []
  const included = Array.isArray(exp.whats_included) ? exp.whats_included : []
  const notIncluded = Array.isArray(exp.whats_not_included) ? exp.whats_not_included : []

  return (
    <main className="pb-24">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end justify-center overflow-hidden">
        {exp.featured_image ? (
          <Image src={exp.featured_image} alt={exp.name} fill className="object-cover" priority />
        ) : (
          <div className="absolute inset-0 bg-[#2d4a22] flex items-center justify-center">
             <span className="font-serif italic text-3xl opacity-30 text-white">AgriFarm Tours</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-16">
          <div className="inline-block bg-[var(--accent)] text-black px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider mb-4">
            {exp.experience_categories?.name || 'Tour'}
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-white font-bold leading-tight mb-4 max-w-4xl">
            {exp.name}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-gray-200">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-[var(--accent)]" />
              <Link href={`/destinations/${exp.destinations?.slug || '#'}`} className="hover:text-white transition-colors">
                {exp.destinations?.name || 'Tanzania'}
              </Link>
            </div>
            {exp.duration && (
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-[var(--accent)]" />
                {exp.duration}
              </div>
            )}
            {exp.capacity && (
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-[var(--accent)]" />
                Up to {exp.capacity} guests
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="text-3xl font-serif font-bold mb-6 text-[var(--foreground)]">Overview</h2>
              <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap">
                {exp.full_description || exp.short_description || 'Details coming soon.'}
              </div>
            </div>

            {highlights.length > 0 && (
              <div>
                <h2 className="text-2xl font-serif font-bold mb-6 text-[var(--foreground)]">Highlights</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {highlights.map((highlight: string, i: number) => (
                    <li key={i} className="flex items-start">
                      <div className="mt-1 mr-3 bg-[#eaf0e8] text-[var(--primary)] p-1 rounded-full">
                        <Check className="w-4 h-4" />
                      </div>
                      <span className="text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-gray-100">
              {included.length > 0 && (
                <div>
                  <h3 className="text-xl font-serif font-bold mb-4 text-[var(--foreground)]">What's Included</h3>
                  <ul className="space-y-3">
                    {included.map((item: string, i: number) => (
                      <li key={i} className="flex items-center text-gray-700">
                        <Check className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {notIncluded.length > 0 && (
                <div>
                  <h3 className="text-xl font-serif font-bold mb-4 text-[var(--foreground)]">Not Included</h3>
                  <ul className="space-y-3">
                    {notIncluded.map((item: string, i: number) => (
                      <li key={i} className="flex items-center text-gray-500">
                        <X className="w-5 h-5 mr-3 text-red-400 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white rounded-2xl shadow-xl border border-[var(--border)] p-8">
              {exp.price && (
                <div className="mb-6 pb-6 border-b border-gray-100">
                  <span className="text-gray-500 text-sm font-medium uppercase tracking-wider block mb-1">From</span>
                  <div className="text-4xl font-serif font-bold text-[var(--foreground)]">
                    {exp.currency} {exp.price} <span className="text-lg text-gray-400 font-sans font-normal">/ person</span>
                  </div>
                </div>
              )}
              
              <div className="space-y-4 mb-8 text-gray-600 text-sm">
                {exp.meeting_point && (
                  <div>
                    <strong className="block text-gray-900 mb-1">Meeting Point</strong>
                    {exp.meeting_point}
                  </div>
                )}
                {exp.best_season && (
                  <div>
                    <strong className="block text-gray-900 mb-1">Best Season to Visit</strong>
                    {exp.best_season}
                  </div>
                )}
              </div>

              <Link 
                href={`/booking?experience=${exp.slug}`} 
                className="w-full flex items-center justify-center bg-[var(--primary)] text-white px-6 py-4 rounded-xl font-bold text-lg hover:bg-[#223a1a] transition-all transform hover:scale-[1.02]"
              >
                Book This Experience
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              
              <p className="text-center text-xs text-gray-400 mt-4">
                No payment required to request a booking.
              </p>
            </div>
          </div>

        </div>
      </section>
    </main>
  )
}
