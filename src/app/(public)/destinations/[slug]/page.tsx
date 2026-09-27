import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, ArrowRight } from 'lucide-react'
import { notFound } from 'next/navigation'
import { safeImageUrl, fallbackDestinations, fallbackExperiences } from '@/lib/content'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('destinations').select('name,seo_title,seo_description').eq('slug', slug).single()
  if (!data) {
    const fallback = fallbackDestinations.find(d => d.slug === slug)
    if (fallback) return { title: `${fallback.name} | AgriFarm Tours TZ`, description: fallback.description }
    return { title: 'Destination Not Found' }
  }
  return { title: data.seo_title || data.name + ' | AgriFarm Tours TZ', description: data.seo_description }
}

export default async function DestinationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('destinations').select('*').eq('slug', slug).eq('is_published', true).maybeSingle()
  const { data: experiencesData } = data ? await supabase.from('experiences').select('*').eq('destination_id', data.id).eq('is_published', true) : { data: null }
  
  let dest = data
  let experiences = experiencesData

  if (!dest) {
    const fallback = fallbackDestinations.find(d => d.slug === slug)
    if (fallback) {
      dest = fallback
      experiences = fallbackExperiences.filter(e => e.destination_name === dest.name || e.destination_name?.includes(dest.name.split(' ')[0]))
    } else {
      notFound()
    }
  }

  return (
    <div className="min-h-screen">
      <section className="relative h-80 md:h-96 flex items-end pb-12 px-6 overflow-hidden">
        {dest.hero_image
          ? <Image src={safeImageUrl(dest.hero_image, 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80')} alt={dest.name} fill className="object-cover" sizes="100vw" />
          : <div className="absolute inset-0 bg-gradient-to-br from-[#2d4a22] to-[#1a2e12]" />}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-28">
          <div className="flex items-center text-white/70 text-sm mb-3">
            <Link href="/destinations" className="hover:text-white">Destinations</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{dest.name}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-white font-bold">{dest.name}</h1>
          {dest.location && (
            <div className="flex items-center text-white/80 mt-3">
              <MapPin className="w-4 h-4 mr-2" />{dest.location}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {dest.description && <p className="text-[var(--muted-foreground)] text-lg leading-relaxed mb-12">{dest.description}</p>}
            {dest.travel_information && (
              <div className="bg-[var(--muted)] rounded-none p-8 mb-12">
                <h2 className="text-xl font-serif font-bold text-[var(--primary)] mb-4">Travel Information</h2>
                <p className="text-[var(--muted-foreground)] leading-relaxed">{dest.travel_information}</p>
              </div>
            )}
            {experiences && experiences.length > 0 && (
              <div>
                <h2 className="text-2xl font-serif font-bold text-[var(--foreground)] mb-6">Experiences in {dest.name}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {experiences.map((exp) => (
                    <Link key={exp.id} href={`/experiences/${exp.slug}`}
                      className="group flex bg-white rounded-none border border-[var(--border)] overflow-hidden hover:shadow-md transition-all">
                      <div className="relative w-28 flex-shrink-0 bg-gray-100">
                        {exp.featured_image && <Image src={safeImageUrl(exp.featured_image, 'https://images.unsplash.com/photo-1447195047884-9b4f2196ef6f?auto=format&fit=crop&q=80')} alt={exp.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 220px" />}
                      </div>
                      <div className="p-4">
                        <h3 className="font-serif font-bold text-gray-900 group-hover:text-[var(--primary)] transition-colors mb-1">{exp.name}</h3>
                        <p className="text-xs text-gray-500 line-clamp-2">{exp.short_description}</p>
                        {exp.price && <p className="text-sm font-medium text-[var(--accent)] mt-2">{exp.currency} {exp.price}</p>}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div>
            <div className="bg-[var(--primary)] text-white rounded-none p-8 sticky top-24">
              <h3 className="text-lg font-serif font-bold mb-4">Plan Your Visit</h3>
              <p className="text-white/80 text-sm mb-6">Ready to explore {dest.name}? Book a guided tour with our expert team.</p>
              <Link href="/booking" className="block text-center bg-[var(--accent)] text-gray-900 px-6 py-3 rounded-full font-medium hover:bg-[#d4a84d] transition-colors">
                Book Now
              </Link>
              <Link href="/experiences" className="flex items-center justify-center text-white/80 hover:text-white text-sm mt-4">
                All Experiences <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
