'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { Star } from 'lucide-react'
import { motion, useInView } from 'framer-motion'

// Inline helper — avoids importing content.ts (which pulls in next/headers via Supabase server client)
function safeImageUrl(url: string | undefined, fallback: string): string {
  if (!url || url.trim() === '') return fallback
  return url
}

type Testimonial = {
  id: string | number
  review: string
  customer_name: string
  country?: string
  rating?: number
  profile_image?: string
}

type Props = {
  testimonials: Testimonial[]
}

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80'

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="relative flex-shrink-0 w-[300px] sm:w-[400px] bg-white/5 backdrop-blur-sm border border-white/10 rounded-none p-5 sm:p-7 mx-3 group hover:bg-white/10 hover:border-amber-400/40 transition-all duration-500">
      {/* Big decorative quote */}
      <div className="absolute top-5 right-6 text-amber-400/20 text-[80px] font-serif leading-none select-none">"</div>

      {/* Stars */}
      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: t.rating || 5 }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
        ))}
      </div>

      {/* Review text */}
      <p className="font-serif italic text-white/85 leading-relaxed text-sm sm:text-base line-clamp-4 sm:line-clamp-none mb-6">
        &ldquo;{t.review}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 border-t border-white/10 pt-5">
        <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-amber-400/40 flex-shrink-0">
          <Image
            src={safeImageUrl(t.profile_image, FALLBACK_IMG)}
            alt={t.customer_name}
            fill
            className="object-cover"
            sizes="48px"
          />
        </div>
        <div>
          <div className="font-semibold text-white text-sm">{t.customer_name}</div>
          <div className="text-amber-400/80 text-xs mt-0.5">{t.country || 'Tanzania traveller'}</div>
        </div>
      </div>
    </div>
  )
}

export default function TestimonialsSection({ testimonials }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  // Duplicate for seamless loop
  const row1 = [...testimonials, ...testimonials, ...testimonials]
  const row2 = [...testimonials].reverse()
  const row2doubled = [...row2, ...row2, ...row2]

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden bg-[#0f1f0f]">
      {/* Background blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-700/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center mb-14 px-4"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400 mb-3">Testimonials</p>
        <h2 className="text-3xl md:text-5xl font-bold font-serif text-white">
          What travellers <span className="text-amber-400">say</span>
        </h2>
        <p className="mt-4 text-white/50 max-w-md mx-auto text-base">
          Real stories from real people who experienced Tanzania differently.
        </p>
      </motion.div>

      {/* Marquee Row 1 — scrolls left */}
      <div className="relative mb-5 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-[marquee_40s_linear_infinite]">
          {row1.map((t, i) => (
            <TestimonialCard key={`r1-${i}`} t={t} />
          ))}
        </div>
      </div>

      {/* Marquee Row 2 — scrolls right */}
      {testimonials.length > 1 && (
        <div className="relative [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-[marquee-reverse_50s_linear_infinite]">
            {row2doubled.map((t, i) => (
              <TestimonialCard key={`r2-${i}`} t={t} />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
