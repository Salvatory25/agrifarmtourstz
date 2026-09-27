'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MapPin, CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'

function safeImageUrl(value: string | null | undefined, fallback: string) {
  return typeof value === 'string' && value.trim().length > 0 ? value : fallback
}

type ExperienceItem = {
  id: string
  name: string
  slug: string
  short_description: string
  featured_image?: string
  price?: number
  currency?: string
  duration?: string
  category_name?: string
  destination_name?: string
}

export default function FeaturedExperiencesCarousel({ experiences }: { experiences: ExperienceItem[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start', skipSnaps: false })

  return (
    <div className="relative group">
      <div className="overflow-hidden py-4 -mx-4 px-4" ref={emblaRef}>
        <div className="flex gap-6 pb-8">
          {experiences.map((exp) => (
            <div key={exp.id} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 group/card overflow-hidden rounded-none bg-white border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <Image 
                  src={safeImageUrl(exp.featured_image, 'https://images.unsplash.com/photo-1447195047884-9b4f2196ef6f?auto=format&fit=crop&q=80')} 
                  alt={exp.name} 
                  fill 
                  className="object-cover group-hover/card:scale-105 transition-transform duration-700" 
                  sizes="(max-width: 768px) 100vw, 33vw" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover/card:from-black/70 transition-colors duration-500" />
                {exp.price ? (
                  <div className="absolute top-4 right-4 bg-white/95 px-4 py-2 rounded-full font-bold text-sm text-green-800 shadow-lg border border-amber-200">
                    {exp.currency || 'USD'} {exp.price}
                  </div>
                ) : null}
              </div>
              <div className="p-8">
                <div className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-700">{exp.category_name || 'Experience'}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">{exp.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-3">{exp.short_description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 border-t border-gray-100 pt-5">
                  <span className="inline-flex items-center gap-1.5 font-medium"><MapPin className="w-4 h-4 text-amber-500" /> {exp.destination_name || 'Tanzania'}</span>
                  <span className="inline-flex items-center gap-1.5 font-medium"><CalendarDays className="w-4 h-4 text-amber-500" /> {exp.duration || 'Flexible'}</span>
                </div>
                <Link href={exp.slug ? `/experiences/${exp.slug}` : '/booking'} className="mt-6 inline-flex items-center gap-2 text-green-800 font-bold hover:text-green-600 transition-colors">
                  View details <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Navigation Buttons */}
      <button 
        onClick={() => emblaApi?.scrollPrev()}
        className="absolute -left-5 top-[40%] -translate-y-1/2 w-14 h-14 rounded-full bg-white shadow-xl border border-gray-100 flex items-center justify-center text-green-900 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 hover:bg-green-50 hover:scale-110"
        aria-label="Previous experiences"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button 
        onClick={() => emblaApi?.scrollNext()}
        className="absolute -right-5 top-[40%] -translate-y-1/2 w-14 h-14 rounded-full bg-white shadow-xl border border-gray-100 flex items-center justify-center text-green-900 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 hover:bg-green-50 hover:scale-110"
        aria-label="Next experiences"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  )
}
