import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { MapPin, Clock, ArrowRight, Star } from 'lucide-react'
import { safeImageUrl } from '@/lib/content'

// Cache this page - re-fetch from Supabase at most every 10 minutes
export const revalidate = 600

export const metadata = {
  title: 'Experiences | AGRI FARM TOURS',
  description: 'Explore our authentic agricultural and cultural tours across Tanzania.',
}

const fallbackExperiences = [
  {
    id: 'f1', slug: null,
    name: 'Coffee Farm Immersion',
    short_description: 'Roast your own coffee beans with a local Chagga family on the lush slopes of Mount Kilimanjaro.',
    featured_image: 'https://images.unsplash.com/photo-1447195047884-9b4f2196ef6f?auto=format&fit=crop&q=80',
    price: 45, currency: 'USD', duration: 'Half Day',
    category: 'Cultural', destination: 'Kilimanjaro',
  },
  {
    id: 'f2', slug: null,
    name: 'Zanzibar Spice Farm Tour',
    short_description: 'Walk through lush spice gardens on the historic island of Zanzibar. Touch, smell and taste cloves, cinnamon and vanilla.',
    featured_image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80',
    price: 35, currency: 'USD', duration: 'Half Day',
    category: 'Spice & Agriculture', destination: 'Zanzibar',
  },
  {
    id: 'f3', slug: null,
    name: 'Sunrise Fishing with Local Fishermen',
    short_description: 'Set sail before dawn with fishermen on Lake Victoria. Learn traditional fishing techniques and enjoy a lakeside breakfast.',
    featured_image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&q=80',
    price: 55, currency: 'USD', duration: 'Full Day',
    category: 'Aquaculture', destination: 'Lake Victoria',
  },
  {
    id: 'f4', slug: null,
    name: 'Village Farming Day',
    short_description: 'Live like a Tanzanian farmer for a day — plant, harvest, cook and share a meal with a local family in a traditional village.',
    featured_image: 'https://images.unsplash.com/photo-1531219572328-a0171b4448a3?auto=format&fit=crop&q=80',
    price: 60, currency: 'USD', duration: 'Full Day',
    category: 'Cultural Immersion', destination: 'Arusha Region',
  },
  {
    id: 'f5', slug: null,
    name: 'Dairy & Livestock Farm Visit',
    short_description: 'Meet cows, goats and chickens and learn sustainable livestock practices. End with fresh farm cheese and milk tasting.',
    featured_image: 'https://images.unsplash.com/photo-1549474771-88fccbd761c9?auto=format&fit=crop&q=80',
    price: 40, currency: 'USD', duration: '3 Hours',
    category: 'Animal Husbandry', destination: 'Moshi',
  },
  {
    id: 'f6', slug: null,
    name: 'Rice Paddy & Maize Field Walk',
    short_description: 'Tour irrigated rice paddies and sprawling maize fields in the Kilosa basin — Tanzania\'s breadbasket.',
    featured_image: 'https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&q=80',
    price: 30, currency: 'USD', duration: '2 Hours',
    category: 'Field Tours', destination: 'Kilosa',
  },
]

export default async function ExperiencesPage() {
  const supabase = await createClient()
  const { data: experiences } = await supabase
    .from('experiences')
    .select('*, destinations(name), experience_categories(name)')
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  const displayData = experiences && experiences.length > 0 ? experiences : fallbackExperiences

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-80 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501786223405-6d024d7c3b8d?auto=format&fit=crop&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-green-950/80 via-green-900/50 to-green-950/80" />
        <div className="relative z-10 h-full flex flex-col justify-end pb-12 px-4 sm:px-6 max-w-7xl mx-auto w-full pt-28">
          <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-2">What Awaits You</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white">Our Experiences</h1>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 px-4 sm:px-6 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Curated Agri-Tourism Experiences</h2>
            <p className="text-gray-500 mt-2 max-w-xl">Immerse yourself in authentic Tanzanian farm life — from highland coffee to coastal fishing.</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 bg-amber-50 border border-amber-200 px-4 py-2 rounded-full flex-shrink-0">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="font-semibold text-amber-700">4.9/5</span> from 100+ happy visitors
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="py-16 pb-24 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {displayData.map((exp: any) => (
            <div key={exp.id} className="group bg-white rounded-none overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
              <div className="relative h-56 bg-gray-100 overflow-hidden flex-shrink-0">
                {exp.featured_image ? (
                  <img src={safeImageUrl(exp.featured_image, 'https://images.unsplash.com/photo-1447195047884-9b4f2196ef6f?auto=format&fit=crop&q=80')} alt={exp.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-green-800/10 text-green-800/30 text-2xl font-serif italic">
                    AGRI FARM TOURS
                  </div>
                )}
                {(exp.price) && (
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full font-bold text-sm text-green-800 shadow">
                    {exp.currency || 'USD'} {exp.price}
                  </div>
                )}
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <span className="text-xs font-bold tracking-wider text-amber-600 uppercase mb-2">
                  {exp.experience_categories?.name || exp.category || 'Tour'}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-800 transition-colors line-clamp-2">
                  {exp.name}
                </h3>
                <p className="text-gray-500 text-sm mb-5 line-clamp-3 flex-grow">
                  {exp.short_description}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{exp.destinations?.name || exp.destination || 'Tanzania'}</span>
                  </div>
                  {(exp.duration) && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{exp.duration}</span>
                    </div>
                  )}
                </div>
                <Link
                  href={exp.slug ? `/experiences/${exp.slug}` : '/booking'}
                  className="mt-4 w-full text-center bg-green-800 hover:bg-green-700 text-white py-3 rounded-none font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                >
                  {exp.slug ? 'View Details' : 'Book Now'} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 bg-green-800 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-white/70 text-lg mb-8">We offer custom private tours — just tell us what you'd like to experience.</p>
          <Link href="/booking" className="inline-flex items-center gap-2 bg-amber-400 text-gray-900 px-8 py-4 rounded-full font-bold hover:bg-amber-300 transition-colors">
            Request Custom Tour <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
