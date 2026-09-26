import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Destinations | AgriFarm Tours TZ',
  description: "Explore Tanzania's rich agricultural regions — from the spice farms of Zanzibar to the coffee highlands of Kilimanjaro.",
}

export default async function DestinationsPage() {
  const supabase = await createClient()
  const { data: destinations } = await supabase
    .from('destinations')
    .select('*')
    .eq('is_published', true)
    .order('is_featured', { ascending: false })

  return (
    <div className="min-h-screen">
      <section className="relative h-72 bg-[var(--primary)] flex items-end pb-12 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2d4a22] to-[#1a2e12]" />
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-28">
          <p className="text-[var(--accent)] text-sm font-medium uppercase tracking-widest mb-2">Explore Tanzania</p>
          <h1 className="text-4xl md:text-5xl font-serif text-white font-bold">Our Destinations</h1>
        </div>
      </section>

      <section className="py-20 px-6 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto">
          <p className="text-[var(--muted-foreground)] text-lg max-w-2xl mb-14">
            From the volcanic highlands of Kilimanjaro to the spice-laden shores of Zanzibar — each destination is a chapter in Tanzania's rich agricultural story.
          </p>
          {!destinations || destinations.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-2xl border border-[var(--border)]">
              <MapPin className="w-10 h-10 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Destinations are being curated. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {destinations.map((dest) => (
                <Link key={dest.id} href={`/destinations/${dest.slug}`}
                  className="group block bg-white rounded-2xl overflow-hidden border border-[var(--border)] shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="relative h-56 bg-gray-100 overflow-hidden">
                    {dest.hero_image ? (
                      <Image src={dest.hero_image} alt={dest.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#2d4a22]/20 to-[#2d4a22]/5 flex items-center justify-center">
                        <MapPin className="w-10 h-10 text-[#2d4a22]/30" />
                      </div>
                    )}
                    {dest.is_featured && (
                      <div className="absolute top-3 left-3 bg-[var(--accent)] text-gray-900 text-xs font-bold px-3 py-1 rounded-full">Featured</div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-xs text-gray-400 mb-2">
                      <MapPin className="w-3.5 h-3.5 mr-1" />{dest.location || 'Tanzania'}
                    </div>
                    <h2 className="text-xl font-serif font-bold text-[var(--foreground)] mb-2 group-hover:text-[var(--primary)] transition-colors">{dest.name}</h2>
                    <p className="text-sm text-gray-500 line-clamp-3 mb-4">{dest.description || 'Discover the beauty and culture of this destination.'}</p>
                    <div className="flex items-center text-[var(--primary)] text-sm font-medium">
                      Explore <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
