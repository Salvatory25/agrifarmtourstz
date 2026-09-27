'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { clsx } from 'clsx'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Change navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isHomepage = pathname === '/'
  
  // Always white navbar
  const navClass = 'fixed w-full z-50 transition-all duration-300 bg-white text-[var(--foreground)] shadow-sm'

  const links = [
    { name: 'Services', href: '/services' },
    { name: 'Experiences', href: '/experiences' },
    { name: 'Destinations', href: '/destinations' },
    { name: 'Stories', href: '/stories' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <nav className={navClass}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2 md:gap-3 group">
              <div className="bg-white rounded-full p-1 shadow-sm flex items-center justify-center shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 group-hover:scale-105 transition-transform">
                <Image 
                  src="/logo.png" 
                  alt="AgriFarm Tours TZ Logo" 
                  width={56} 
                  height={56} 
                  className="w-full h-full object-contain rounded-full"
                  priority 
                />
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-xl sm:text-2xl font-bold tracking-tight leading-none text-[var(--primary)]">
                  AGRI FARM TOURS
                </span>
                <span className="text-[8px] sm:text-[10px] font-normal tracking-widest mt-0.5 text-amber-600/80">
                  Experience Nature, Live the Farm
                </span>
              </div>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium hover:text-[var(--accent)] transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/booking"
              className={clsx(
                'px-6 py-2.5 rounded-full text-sm font-medium transition-all',
                isScrolled || !isHomepage
                  ? 'bg-[var(--primary)] text-white hover:bg-[#223a1a]'
                  : 'bg-white text-[var(--primary)] hover:bg-gray-100'
              )}
            >
              Plan Your Visit
            </Link>
          </div>

          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-none hover:text-[var(--accent)] focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-xl absolute w-full text-[var(--foreground)] border-t border-gray-100">
          <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-4 text-base font-medium border-b border-gray-100 hover:text-[var(--primary)]"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 px-3">
              <Link
                href="/booking"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center px-6 py-3 rounded-full bg-[var(--primary)] text-white text-base font-medium hover:bg-[#223a1a]"
              >
                Plan Your Visit
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
