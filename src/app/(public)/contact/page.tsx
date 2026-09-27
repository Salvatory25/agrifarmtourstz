import Image from 'next/image'
import { MapPin, Mail, Phone } from 'lucide-react'
import { ContactForm } from '@/components/contact/ContactForm'

export const metadata = {
  title: 'Contact Us | AgriFarm Tours TZ',
  description: 'Get in touch with AgriFarm Tours TZ. We are ready to provide the right solution according to your needs.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Hero Section */}
      <section className="relative h-[450px] flex flex-col items-center justify-center text-center px-4">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1596524430615-b46475ddff6e?auto=format&fit=crop&q=80"
            alt="Contact Us"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-[#0f172a]/70" /> {/* Dark blueish overlay to match reference */}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-3xl mx-auto pt-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact us</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-light">
            AgriFarm Tours TZ is ready to provide the right solution according to your needs
          </p>
        </div>
      </section>

      {/* Main Content Box (Overlapping Hero) */}
      <section className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32">
        <div className="bg-white rounded-none shadow-2xl p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row gap-16">
          
          {/* Left Column: Get in touch */}
          <div className="w-full lg:w-5/12 space-y-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in touch</h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                Reach out to us to start planning your authentic Tanzanian agricultural experience. We are here to answer any questions you might have.
              </p>
            </div>

            <div className="space-y-8">
              {/* Head Office */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-50 text-green-700 rounded-none flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">Head Office</h3>
                  <p className="text-gray-500 text-sm">
                    Kilimanjaro Region<br />
                    Tanzania
                  </p>
                </div>
              </div>

              {/* Email Us */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-50 text-green-700 rounded-none flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">Email Us</h3>
                  <p className="text-gray-500 text-sm">
                    agrifarmtourstz@gmail.com<br />
                    info@agrifarmtourstz.com
                  </p>
                </div>
              </div>

              {/* Call Us */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-50 text-green-700 rounded-none flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">Call Us</h3>
                  <p className="text-gray-500 text-sm">
                    Phone : +255 746 710 875<br />
                    WhatsApp : +255 746 710 875
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Follow our social media</h3>
              <div className="flex items-center gap-3">
                <a href="#" className="w-10 h-10 bg-green-700 text-white rounded-none flex items-center justify-center hover:bg-green-800 transition-colors">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 bg-green-700 text-white rounded-none flex items-center justify-center hover:bg-green-800 transition-colors">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 bg-green-700 text-white rounded-none flex items-center justify-center hover:bg-green-800 transition-colors">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 bg-green-700 text-white rounded-none flex items-center justify-center hover:bg-green-800 transition-colors">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Send us a message */}
          <div className="w-full lg:w-7/12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Send us a message</h2>
            <ContactForm />
          </div>

        </div>
      </section>
    </div>
  )
}

