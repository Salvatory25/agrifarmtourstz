import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'
import { safeImageUrl } from '@/lib/content'

// Cache this page - re-fetch from Supabase at most every 10 minutes
export const revalidate = 600

export const metadata = {
  title: 'Destinations | AGRI FARM TOURS',
  description: "Explore Tanzania's rich agricultural regions — from the spice farms of Zanzibar to the coffee highlands of Kilimanjaro.",
}

const fallbackDestinations = [
  {
    id: 'd1', slug: null,
    name: 'Mount Kilimanjaro Region',
    location: 'Northern Tanzania',
    description: 'The Chagga people have farmed Kilimanjaro\'s fertile slopes for centuries. Discover coffee plantations, banana groves, and breathtaking mountain vistas.',
    hero_image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80',
    is_featured: true,
    experiences_count: 4,
  },
  {
    id: 'd2', slug: null,
    name: 'Zanzibar Archipelago',
    location: 'Indian Ocean, Tanzania',
    description: 'The "Spice Island" is world-famous for cloves, vanilla, and cinnamon. Step into the aromatic gardens and connect with generations-old spice farming traditions.',
    hero_image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80',
    is_featured: true,
    experiences_count: 3,
  },
  {
    id: 'd3', slug: null,
    name: 'Arusha & Moshi',
    location: 'Northern Tanzania',
    description: 'Gateway to the African bush AND to incredible highland farmlands. Enjoy coffee co-operatives, maize fields and vibrant local markets.',
    hero_image: 'https://images.unsplash.com/photo-1521580099-4f4fa4e09e2b?auto=format&fit=crop&q=80',
    is_featured: false,
    experiences_count: 5,
  },
  {
    id: 'd4', slug: null,
    name: 'Lake Victoria Basin',
    location: 'Northwestern Tanzania',
    description: 'The world\'s second largest freshwater lake supports millions of people through fishing and agriculture. Join fishermen at dawn for an unforgettable experience.',
    hero_image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&q=80',
    is_featured: false,
    experiences_count: 3,
  },
  {
    id: 'd5', slug: null,
    name: 'Morogoro Highlands',
    location: 'Eastern Tanzania',
    description: 'Tanzania\'s agricultural heartland — rice paddies, sugar cane, and sprawling maize fields stretch across the Kilosa and Kilombero valleys.',
    hero_image: 'https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&q=80',
    is_featured: false,
    experiences_count: 2,
  },
  {
    id: 'd6', slug: null,
    name: 'Iringa & Southern Highlands',
    location: 'Southern Tanzania',
    description: 'Cool climate, red soil and hardworking communities define this highland region. Famous for its potatoes, tea, and traditional irrigation techniques.',
    hero_image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80',
    is_featured: false,
    experiences_count: 2,
  },
]

export default async function DestinationsPage() {
  const supabase = await createClient()
  const { data: destinations } = await supabase
    .from('destinations')
    .select('*')
    .eq('is_published', true)
    .order('is_featured', { ascending: false })

  const displayData = destinations && destinations.length > 0 ? destinations : fallbackDestinations
  const featured = displayData.filter((d: any) => d.is_featured)
  const rest = displayData.filter((d: any) => !d.is_featured)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-80 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-green-950/80 via-green-900/50 to-green-950/80" />
        <div className="relative z-10 h-full flex flex-col justify-end pb-12 px-4 sm:px-6 max-w-7xl mx-auto w-full pt-28">
          <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-2">Explore Tanzania</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white">Our Destinations</h1>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 px-4 sm:px-6 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <p className="text-gray-500 text-lg max-w-2xl">
            From the volcanic highlands of Kilimanjaro to the spice-laden shores of Zanzibar — each destination is a chapter in Tanzania's rich agricultural story.
          </p>
        </div>
      </section>

      {/* Featured Destinations */}
      {featured.length > 0 && (
        <section className="py-16 px-4 sm:px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">⭐ Featured Destinations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featured.map((dest: any) => (
                <div key={dest.id} className="group relative rounded-none overflow-hidden h-72 cursor-pointer hover:shadow-2xl transition-shadow">
                  {dest.hero_image && (
                    <img src={safeImageUrl(dest.hero_image, 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80')} alt={dest.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-amber-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">Featured</span>
                  </div>
                  <div className="absolute bottom-0 left-0 p-6 right-0">
                    <div className="flex items-center gap-1 text-white/70 text-sm mb-2">
                      <MapPin className="w-4 h-4" />{dest.location || 'Tanzania'}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{dest.name}</h3>
                    <p className="text-white/70 text-sm line-clamp-2">{dest.description}</p>
                    <Link href={dest.slug ? `/destinations/${dest.slug}` : '/experiences'} className="mt-3 inline-flex items-center text-amber-400 text-sm font-semibold hover:text-amber-300 transition-colors">
                      Explore Experiences <ArrowRight className="ml-1 w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Destinations */}
      <section className="py-16 pb-24 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {featured.length > 0 && <h2 className="text-2xl font-bold text-gray-900 mb-8">All Destinations</h2>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {rest.map((dest: any) => (
              <div key={dest.id} className="group bg-white rounded-none overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-52 bg-gray-100 overflow-hidden">
                  {dest.hero_image ? (
                    <img src={safeImageUrl(dest.hero_image, 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80')} alt={dest.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600" />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-green-800/20 to-green-800/5 flex items-center justify-center">
                      <MapPin className="w-10 h-10 text-green-800/30" />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center text-xs text-gray-400 mb-2 gap-1">
                    <MapPin className="w-3.5 h-3.5" />{dest.location || 'Tanzania'}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-800 transition-colors">{dest.name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-3 mb-5">{dest.description}</p>
                  <Link
                    href={dest.slug ? `/destinations/${dest.slug}` : '/experiences'}
                    className="inline-flex items-center text-green-800 text-sm font-semibold hover:text-green-600 transition-colors"
                  >
                    View Experiences <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 bg-green-800 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Plan Your Tanzania Journey</h2>
          <p className="text-white/70 mb-8">Tell us which destination excites you and we'll craft the perfect itinerary.</p>
          <Link href="/booking" className="inline-flex items-center gap-2 bg-amber-400 text-gray-900 px-8 py-4 rounded-full font-bold hover:bg-amber-300 transition-colors">
            Start Planning <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
