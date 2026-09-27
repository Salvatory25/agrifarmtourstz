import { createPublicClient } from '@/utils/supabase/server'
import { Mail, Phone, MessageCircle, MapPin, Clock } from 'lucide-react'
import BookingForm from './BookingForm'

export const revalidate = 600 // Re-fetch experiences list every 10 minutes

export const metadata = {
  title: 'Plan Your Visit | AgriFarm Tours TZ',
  description: 'Book your authentic agricultural tour experience in Tanzania. Contact us to plan your perfect visit.',
}

export default async function BookingPage() {
  const supabase = createPublicClient()
  let { data: experiences } = await supabase
    .from('experiences')
    .select('id, name, price, currency, duration')
    .eq('is_published', true)
    .order('name', { ascending: true })

  // Provide beautiful fallback dummy data if DB is not yet set up
  if (!experiences || experiences.length === 0) {
    experiences = [
      { id: '1', name: 'Kilimanjaro Coffee Tour', price: null, currency: 'USD', duration: null },
      { id: '2', name: 'Zanzibar Spice Farm Experience', price: null, currency: 'USD', duration: null },
      { id: '3', name: 'Traditional Village Cooking Masterclass', price: null, currency: 'USD', duration: null },
      { id: '4', name: 'Organic Cocoa Plantation Walk', price: null, currency: 'USD', duration: null }
    ]
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center pt-28 pb-12 px-4 sm:px-6">
      {/* Full-screen Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/hero-bg.jpg" 
          alt="Tanzania Landscape" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      </div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-[1200px] bg-white rounded-none md:rounded-none shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[700px]">
        
        {/* Left Side: Form Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-2">Start your <br/>perfect trip</h1>
            <p className="text-gray-500 mt-4">Let's craft your authentic agricultural journey.</p>
          </div>
          
          <BookingForm experiences={experiences || []} />
          
          <div className="mt-8 text-center text-sm text-gray-500">
            Have questions? <a href="mailto:admin@agrifarmtours.co.tz" className="text-gray-900 font-semibold hover:underline">Get in touch</a>
          </div>
        </div>

        {/* Right Side: Image with Pins */}
        <div className="hidden md:block w-1/2 p-4">
          <div className="relative w-full h-full rounded-none overflow-hidden">
            <img 
              src="/images/farmer-intro.jpg" 
              alt="Beautiful Farm Landscape" 
              className="w-full h-full object-cover"
            />
            
            {/* Glassmorphic Pin 1 */}
            <div className="absolute top-1/4 left-[20%] flex flex-col items-center">
              <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_white]" />
              <div className="w-[1px] h-12 bg-white/50" />
              <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-none p-3 flex items-center gap-3 shadow-xl">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs text-white/80 font-medium">Coffee Estate</p>
                  <p className="text-sm text-white font-bold">Kilimanjaro</p>
                </div>
              </div>
            </div>

            {/* Glassmorphic Pin 2 */}
            <div className="absolute bottom-1/3 right-[15%] flex flex-col items-center">
              <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-none p-3 shadow-xl mb-3">
                <p className="text-xs text-white/80 font-medium mb-1">Duration</p>
                <p className="text-sm text-white font-bold leading-tight">3 - 5 days<br/>farm experience</p>
              </div>
              <div className="w-[1px] h-12 bg-white/50" />
              <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_white]" />
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

