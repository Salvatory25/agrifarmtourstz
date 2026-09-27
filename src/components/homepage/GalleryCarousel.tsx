'use client'

import React, { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'

function safeImageUrl(value: string | null | undefined, fallback: string) {
  return typeof value === 'string' && value.trim().length > 0 ? value : fallback
}

type GalleryItem = {
  id: string
  title?: string
  image_url: string
  category?: string
}

export default function GalleryCarousel({ gallery }: { gallery: GalleryItem[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, onSelect])

  return (
    <div className="relative">
      <div className="overflow-hidden py-8 px-4" ref={emblaRef}>
        <div className="flex gap-6 items-center">
          {gallery.map((item, idx) => {
            const isActive = idx === selectedIndex
            return (
              <div 
                key={item.id} 
                className={`flex-[0_0_80%] md:flex-[0_0_40%] lg:flex-[0_0_25%] min-w-0 transition-all duration-700 ease-in-out cursor-grab active:cursor-grabbing
                  ${isActive ? 'scale-105 z-10 shadow-2xl' : 'scale-95 opacity-60 hover:opacity-90'}
                `}
                onClick={() => emblaApi?.scrollTo(idx)}
              >
                <div className="overflow-hidden rounded-none group bg-white">
                  <div className={`relative ${isActive ? 'h-96' : 'h-80'} transition-all duration-700`}>
                    <Image 
                      src={safeImageUrl(item.image_url, 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&q=80')} 
                      alt={item.title || 'Farm gallery'} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-700" 
                      sizes="(max-width: 768px) 100vw, 33vw" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#223a1a]/60 via-[#223a1a]/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className={`absolute bottom-0 left-0 right-0 p-6 text-white transform transition-transform duration-500 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                      {item.category && <p className="text-[10px] uppercase tracking-widest font-bold text-amber-400 mb-1">{item.category}</p>}
                      {item.title && <h3 className="text-xl font-bold font-serif">{item.title}</h3>}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      
      {/* Interactive Dots for Gallery */}
      <div className="flex justify-center gap-3 mt-6">
        {gallery.map((_, idx) => (
          <button
            key={idx}
            onClick={() => emblaApi?.scrollTo(idx)}
            className={`transition-all duration-300 rounded-full h-2 ${
              idx === selectedIndex ? 'w-10 bg-[var(--primary)]' : 'w-2 bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to gallery slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
