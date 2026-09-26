import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Clock } from 'lucide-react'

export const metadata = {
  title: 'Experiences | AgriFarm Tours TZ',
  description: 'Explore our authentic agricultural and cultural tours across Tanzania.',
}

export default async function ExperiencesPage() {
  const supabase = await createClient()

  // Fetch only published experiences
  const { data: experiences } = await supabase
    .from('experiences')
    .select('*, destinations(name), experience_categories(name)')
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  return (
    <div className="pt-28 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif text-[var(--foreground)] font-bold mb-4">Our Experiences</h1>
        <p className="text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">
          Immerse yourself in the authentic life of Tanzania. From bustling spice farms to peaceful coffee plantations in the highlands.
        </p>
      </div>

      {experiences?.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-100">
          <p className="text-gray-500 text-lg">We are currently curating new experiences. Please check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences?.map((exp) => (
            <Link key={exp.id} href={`/experiences/${exp.slug}`} className="group block bg-white rounded-2xl overflow-hidden border border-[var(--border)] shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative h-64 bg-gray-200 overflow-hidden">
                {exp.featured_image ? (
                  <Image 
                    src={exp.featured_image} 
                    alt={exp.name} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#2d4a22]/10 text-[#2d4a22]">
                    <span className="font-serif italic text-xl opacity-50">AgriFarm Tours</span>
                  </div>
                )}
                {exp.price && (
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full font-medium text-sm text-[var(--primary)] shadow-sm">
                    {exp.currency} {exp.price}
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center text-xs font-bold tracking-wider text-[var(--accent)] uppercase mb-2">
                  {exp.experience_categories?.name || 'Tour'}
                </div>
                <h3 className="text-xl font-serif font-bold text-[var(--foreground)] mb-3 group-hover:text-[var(--primary)] transition-colors line-clamp-2">
                  {exp.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {exp.short_description || 'Experience the beauty of Tanzania with this unique tour...'}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-sm text-gray-500">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1.5" />
                    {exp.destinations?.name || 'Tanzania'}
                  </div>
                  {exp.duration && (
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1.5" />
                      {exp.duration}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
