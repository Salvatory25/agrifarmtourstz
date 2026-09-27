'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Fade from 'embla-carousel-fade'
import { useCallback, useState, useEffect } from 'react'

type HeroData = {
  image_url: string
  subtitle: string
  heading: string
  description: string
  cta_text: string
  cta_link: string
}

export default function HeroAnimated({ hero }: { hero: HeroData }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 40 }, [Autoplay({ delay: 6000, stopOnInteraction: false }), Fade()])
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

  const slides = [
    hero,
    {
      ...hero,
      heading: 'Discover the heart of Tanzania',
      description: 'Journey through spice islands and coffee highlands, meeting the people who cultivate this beautiful land.',
      image_url: '/images/spice-tour.jpg',
    },
    {
      ...hero,
      heading: 'From Seed to Table',
      description: 'Experience genuine farm-to-table moments, learning ancestral techniques from local farming communities.',
      image_url: '/images/village-cooking.jpg',
    }
  ]

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.4 } }
  }

  const stagger = {
    visible: { transition: { staggerChildren: 0.2 } },
  }

  return (
    <section className="relative overflow-hidden -mt-20 group" ref={emblaRef}>
      <div className="flex touch-pan-y">
        {slides.map((slide, index) => (
          <div key={index} className="flex-[0_0_100%] min-w-0 relative flex flex-col justify-center min-h-[90svh] pt-20">
            {/* Background Image (Absolute to the slide) */}
            <div className="absolute inset-0 z-0">
              <Image
                src={slide.image_url}
                alt=""
                fill
                priority={index === 0}
                className="object-cover object-center"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900 from-20% via-gray-900/80 via-60% to-transparent w-full" />
            </div>
            
            {/* Content (Relative to push the height naturally) */}
            <div className="relative z-10 px-4 sm:px-6 w-full max-w-7xl mx-auto flex flex-col items-start pt-24 md:pt-32 pb-40 md:pb-48">
              {index === selectedIndex && (
                <motion.div initial="hidden" animate="visible" exit="exit" variants={stagger} className="max-w-3xl space-y-8 w-full">
                  <motion.h1
                    variants={fadeIn}
                    className="text-4xl sm:text-5xl md:text-6xl text-white font-bold leading-[1.1] tracking-tight"
                  >
                    {slide.heading}
                  </motion.h1>

                  <motion.p
                    variants={fadeIn}
                    className="text-base md:text-lg text-gray-200 max-w-lg font-light leading-relaxed"
                  >
                    {slide.description}
                  </motion.p>

                  <motion.div variants={fadeIn} className="flex flex-wrap items-center gap-4 pt-6">
                    <Link
                      href={slide.cta_link}
                      className="group/btn bg-green-700 hover:bg-green-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-medium text-base md:text-lg transition-all flex items-center shadow-xl"
                    >
                      {slide.cta_text}
                      <div className="ml-3 w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center text-green-900 group-hover/btn:scale-110 transition-transform">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </Link>
                    <Link
                      href="/booking"
                      className="group/btn bg-transparent border border-amber-400 text-amber-400 hover:bg-amber-400/10 px-6 py-3 md:px-8 md:py-4 rounded-full font-medium text-base md:text-lg transition-all flex items-center shadow-xl"
                    >
                      Plan Your Visit
                      <div className="ml-3 w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center text-green-900 group-hover/btn:scale-110 transition-transform">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </Link>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows removed as requested */}
      
      {/* Carousel Dots */}
      <div className="absolute bottom-32 left-0 right-0 z-30 flex justify-center gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => emblaApi?.scrollTo(idx)}
            className={`transition-all duration-300 rounded-full h-1.5 ${
              idx === selectedIndex ? 'w-8 bg-amber-400' : 'w-4 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
      {/* ── Layered mountain / highlands divider ── */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none leading-none overflow-hidden">
        <svg
          viewBox="0 0 1440 140"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full block"
          style={{ display: 'block', height: 'clamp(70px, 10vw, 140px)' }}
        >
          {/* Back ridge — lightest, tallest peak */}
          <path
            d="M0,100 C60,60 120,20 200,50 C280,80 320,30 420,55 C520,80 560,25 680,45 C800,65 840,15 960,40 C1080,65 1120,20 1240,50 C1320,70 1380,55 1440,60 L1440,140 L0,140 Z"
            fill="#fbbf24"
            fillOpacity="0.25"
          />
          {/* Mid ridge — medium depth */}
          <path
            d="M0,115 C80,85 160,60 260,80 C360,100 400,55 520,70 C640,85 680,45 800,65 C920,85 960,50 1080,70 C1200,90 1320,65 1440,80 L1440,140 L0,140 Z"
            fill="#fbbf24"
            fillOpacity="0.45"
          />
          {/* Front ridge — solid amber, blends into section below */}
          <path
            d="M0,128 C100,108 200,95 320,108 C440,121 480,95 600,108 C720,121 760,100 880,112 C1000,124 1100,100 1220,112 C1320,122 1380,115 1440,118 L1440,140 L0,140 Z"
            fill="#fbbf24"
          />
        </svg>
      </div>
    </section>
  )
}
