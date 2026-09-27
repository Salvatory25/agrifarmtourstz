'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const images = [
  { id: 1, src: '/images/cf_coffee.jpg', alt: 'Coffee Harvest' },
  { id: 2, src: '/images/cf_spice.jpg', alt: 'Spice Farm' },
  { id: 3, src: '/images/cf_cooking.jpg', alt: 'Village Cooking' },
]

export default function CoverflowCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 4500) // slides every 4.5 seconds
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative w-full h-[320px] sm:h-[450px] md:h-[550px] flex items-center justify-center [perspective:1200px]">
      {images.map((img, i) => {
        // Calculate the relative position for 3 items
        let diff = i - currentIndex
        if (diff === -2) diff = 1
        if (diff === 2) diff = -1

        let x = '0%'
        let scale = 1
        let zIndex = 10
        let opacity = 1
        let rotateY = 0

        if (diff === -1) { // Left
          x = '-30%'
          scale = 0.8
          zIndex = 5
          opacity = 0.6
          rotateY = 15
        } else if (diff === 1) { // Right
          x = '30%'
          scale = 0.8
          zIndex = 5
          opacity = 0.6
          rotateY = -15
        }

        return (
          <motion.div
            key={img.id}
            initial={false}
            animate={{ x, scale, zIndex, opacity, rotateY }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute w-[65%] sm:w-[60%] h-full rounded-none overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] cursor-pointer"
            onClick={() => setCurrentIndex(i)}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 80vw, 50vw"
              priority={i === 0}
            />
            {/* Elegant dark gradient for premium feel */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 mix-blend-multiply" />
          </motion.div>
        )
      })}
    </div>
  )
}
