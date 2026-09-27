import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Play, ArrowUpRight, Star, Leaf, MapPin, CalendarDays, Quote } from 'lucide-react'
import { getHomepageContent, safeImageUrl } from '@/lib/content'
import HeroAnimated from '@/components/homepage/HeroAnimated'
import TestimonialsSection from '@/components/homepage/TestimonialsSection'
import FeaturedExperiencesCarousel from '@/components/homepage/FeaturedExperiencesCarousel'
import GalleryCarousel from '@/components/homepage/GalleryCarousel'
import CoverflowCarousel from '@/components/homepage/CoverflowCarousel'

export const revalidate = 300

export default async function Home() {
  const { hero, intro, categories, featuredExperiences, destinations, stories, gallery, testimonials } = await getHomepageContent()

  return (
    <main className="flex-1 overflow-x-hidden bg-white">
      <HeroAnimated hero={hero} />

      <section className="relative bg-amber-400 py-8 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10 flex flex-wrap gap-10 justify-around items-center overflow-hidden pointer-events-none text-green-900">
          <Leaf className="w-24 h-24 -rotate-45" /> <Leaf className="w-32 h-32 rotate-12" /> <Leaf className="w-20 h-20 rotate-90" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="flex -space-x-3">
              <img className="w-12 h-12 rounded-full border-2 border-amber-400 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" alt="Client 1" />
              <img className="w-12 h-12 rounded-full border-2 border-amber-400 object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" alt="Client 2" />
              <img className="w-12 h-12 rounded-full border-2 border-amber-400 object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" alt="Client 3" />
            </div>
            <div>
              <p className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">10K+ happy travellers with <br /> unforgettable stories</p>
            </div>
          </div>

          <div className="relative w-28 h-28 md:w-32 md:h-32 flex-shrink-0 flex items-center justify-center bg-white rounded-full p-2 border-4 border-dashed border-green-800">
            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-green-900 uppercase tracking-widest text-center animate-[spin_10s_linear_infinite]">
              <svg viewBox="0 0 100 100" className="w-full h-full p-2">
                <path id="curve" d="M 50 10 A 40 40 0 1 1 49.9 10" fill="transparent" />
                <text className="text-[14px] font-bold fill-green-900 tracking-wider">
                  <textPath href="#curve" startOffset="0%">VEGETABLES • AGRO • ORGANIC •</textPath>
                </text>
              </svg>
            </div>
            <div className="w-12 h-12 bg-green-800 rounded-full flex items-center justify-center text-white z-10 relative">
              <ArrowUpRight className="w-6 h-6" />
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row items-center gap-4 text-center sm:text-right">
            <p className="text-xl md:text-2xl font-bold text-gray-900 leading-tight text-right">Healthy life with <br /> fresh farm experiences</p>
            <div className="relative w-32 h-20 md:w-40 md:h-24 rounded-none overflow-hidden border-2 border-white shadow-lg group cursor-pointer">
              <img src="/images/farmer-intro.jpg" alt="Farmer" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white group-hover:bg-green-500 transition-colors">
                  <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 lg:gap-16 items-center">
          <div className="w-full relative order-2 lg:order-1">
            <CoverflowCarousel />
          </div>
          <div className="space-y-6 order-1 lg:order-2 px-2">
            <div className="inline-flex px-4 py-2 rounded-full border border-green-700 text-green-700 text-xs font-semibold tracking-[0.2em] uppercase">AgriFarm Tours TZ</div>
            <h2 className="text-4xl md:text-5xl font-bold font-serif text-gray-900 leading-tight">{intro.heading}</h2>
            <p className="text-lg text-gray-600 leading-relaxed">{intro.description}</p>
            <Link href={intro.cta_link} className="inline-flex items-center gap-2 bg-[var(--primary)] text-white px-6 py-3.5 rounded-full font-medium hover:bg-[#223a1a] transition-colors">
              {intro.cta_text}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 bg-[#f7f6f2]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--primary)]">Experience Categories</p>
              <h2 className="text-4xl md:text-5xl font-bold font-serif text-gray-900">Explore the way we travel</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link href={`/experiences?category=${category.slug}`} key={category.id} className="group overflow-hidden rounded-none bg-white shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 block">
                <div className="relative h-64 overflow-hidden">
                  <Image src={safeImageUrl(category.image_url, 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&q=80')} alt={category.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#223a1a]/20 group-hover:to-[#223a1a]/40 transition-colors duration-500" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--primary)]">Featured Experiences</p>
              <h2 className="text-4xl md:text-5xl font-bold font-serif text-gray-900 mt-2">Discover our signature moments</h2>
            </div>
            <Link href="/experiences" className="inline-flex items-center gap-2 font-semibold text-[var(--primary)]">
              See all experiences <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="mt-8">
            <FeaturedExperiencesCarousel experiences={featuredExperiences} />
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#f5f1e8] px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--primary)]">Our Story</p>
            <h2 className="text-4xl md:text-5xl font-bold font-serif text-gray-900 mt-4">Travel deeper than a safari</h2>
            <p className="mt-5 text-lg text-gray-700 leading-relaxed">AgriFarm Tours TZ connects travellers with the people, farms, flavours, and landscapes that sustain Tanzania. Every experience is rooted in authentic stories and communities.</p>
            <Link href="/stories" className="mt-6 inline-flex items-center gap-2 bg-[var(--primary)] text-white px-6 py-3.5 rounded-full font-medium hover:bg-[#223a1a] transition-colors">
              Read our stories <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stories.slice(0, 4).map((story) => (
              <Link href={`/stories/${story.slug}`} key={story.id} className="rounded-none overflow-hidden bg-white shadow-sm border border-gray-100 group hover:shadow-lg transition-all duration-300 block">
                <div className="relative h-40 overflow-hidden">
                  <Image src={safeImageUrl(story.cover_image, 'https://images.unsplash.com/photo-1501786223405-6d024d7c3b8d?auto=format&fit=crop&q=80')} alt={story.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 50vw, 25vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                <div className="p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-amber-700">{story.category_name || 'Story'}</p>
                  <h3 className="mt-2 text-lg font-bold text-gray-900 line-clamp-2">{story.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {destinations.length > 0 ? (
        <section className="py-20 px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--primary)]">Destinations</p>
              <h2 className="text-4xl md:text-5xl font-bold font-serif text-gray-900 mt-2">Where Tanzania grows</h2>
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {destinations.map((destination) => (
                <Link href={`/destinations/${destination.slug}`} key={destination.id} className="group overflow-hidden rounded-none bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-shadow block">
                  <div className="relative h-72 overflow-hidden">
                    <Image src={safeImageUrl(destination.hero_image, 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80')} alt={destination.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 group-hover:via-black/20 transition-colors duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                      <div className="inline-flex items-center gap-2 text-sm text-white/90 font-medium tracking-wide"><MapPin className="w-4 h-4" /> {destination.location || 'Tanzania'}</div>
                      <h3 className="mt-3 text-3xl font-bold font-serif">{destination.name}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {gallery.length > 0 ? (
        <section className="py-20 px-4 sm:px-6 bg-[#f7f6f2]">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--primary)]">Gallery</p>
              <h2 className="text-4xl md:text-5xl font-bold font-serif text-gray-900 mt-2">Moments from the field</h2>
            </div>
            <div className="mt-8 -mx-4">
              <GalleryCarousel gallery={gallery} />
            </div>
          </div>
        </section>
      ) : null}

      {testimonialExists(testimonials) ? (
        <TestimonialsSection testimonials={testimonials} />
      ) : null}


      <section className="py-20 px-4 sm:px-6 bg-green-800 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4">Ready to experience Tanzania differently?</h2>
          <p className="text-white/80 text-lg mb-8">Let us craft your farm, food, and cultural journey around the stories that matter most to you.</p>
          <Link href="/booking" className="inline-flex items-center gap-2 bg-amber-400 text-gray-900 px-8 py-4 rounded-full font-bold hover:bg-amber-300 transition-colors">
            Start planning <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  )
}

function testimonialExists(items: any[] | undefined) {
  return Array.isArray(items) && items.length > 0
}

