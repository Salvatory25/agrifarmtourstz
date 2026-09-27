import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-[var(--foreground)] text-white pt-16 pb-8 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="md:col-span-2">
          <div className="flex items-center space-x-3 mb-4 bg-white/5 w-max p-2 rounded-none">
             <div className="bg-white rounded-none p-1">
               <Image src="/logo.png" alt="AgriFarm Tours TZ Logo" width={60} height={60} className="object-contain" />
             </div>
             <div>
               <h2 className="text-xl font-serif text-white font-bold">AGRI FARM TOURS</h2>
               <p className="text-[var(--accent)] text-xs tracking-wide">Experience Nature. Live the Farm.</p>
             </div>
          </div>
          <p className="text-gray-400 max-w-sm mb-6 leading-relaxed">
            Go Beyond the Safari. Discover Where Tanzania Grows. Experience authentic agricultural and cultural tourism.
          </p>
          <div className="flex space-x-4">
            <a href="https://instagram.com/agrifarmtourstz" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--accent)] hover:text-black transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="https://facebook.com/agrifarmtourstz" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--accent)] hover:text-black transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            {/* Using a generic icon for TikTok as lucide doesn't have a specific TikTok icon */}
            <a href="https://tiktok.com/@agrifarmtourstz" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--accent)] hover:text-black transition-colors font-bold text-sm">
              TK
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-serif text-lg mb-4 text-white">Contact Us</h3>
          <ul className="space-y-4 text-gray-400">
            <li className="flex items-start">
              <Phone className="w-5 h-5 mr-3 text-[var(--accent)] flex-shrink-0 mt-0.5" />
              <span>
                <a href="tel:+255785844931" className="hover:text-white transition-colors">+255 785 844 931</a><br/>
                <a href="tel:+255746710875" className="hover:text-white transition-colors">+255 746 710 875</a>
              </span>
            </li>
            <li className="flex items-center">
              <Mail className="w-5 h-5 mr-3 text-[var(--accent)] flex-shrink-0" />
              <a href="mailto:agrifarmtourstz@gmail.com" className="hover:text-white transition-colors">agrifarmtourstz@gmail.com</a>
            </li>
            <li className="flex items-center">
              <MapPin className="w-5 h-5 mr-3 text-[var(--accent)] flex-shrink-0" />
              <span>Tanzania</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-lg mb-4 text-white">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link href="/experiences" className="hover:text-[var(--accent)] transition-colors">Experiences</Link></li>
            <li><Link href="/destinations" className="hover:text-[var(--accent)] transition-colors">Destinations</Link></li>
            <li><Link href="/stories" className="hover:text-[var(--accent)] transition-colors">Stories</Link></li>
            <li><Link href="/about" className="hover:text-[var(--accent)] transition-colors">Our Story</Link></li>
            <li><Link href="/booking" className="hover:text-[var(--accent)] transition-colors">Plan Your Visit</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} AgriFarm Tours TZ. All rights reserved.</p>
        <div className="space-x-4 mt-4 md:mt-0">
          <Link href="/privacy" className="hover:text-gray-300">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-gray-300">Terms of Service</Link>
        </div>
      </div>
    </footer>
  )
}
