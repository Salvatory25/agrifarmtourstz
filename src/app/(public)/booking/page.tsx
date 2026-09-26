import { createClient } from '@/utils/supabase/server'
import { Mail, Phone, MessageCircle, MapPin, Clock } from 'lucide-react'
import BookingForm from './BookingForm'

export const metadata = {
  title: 'Plan Your Visit | AgriFarm Tours TZ',
  description: 'Book your authentic agricultural tour experience in Tanzania. Contact us to plan your perfect visit.',
}

export default async function BookingPage() {
  const supabase = await createClient()
  const { data: experiences } = await supabase
    .from('experiences')
    .select('id, name, price, currency, duration')
    .eq('is_published', true)
    .order('name', { ascending: true })

  return (
    <div className="min-h-screen">
      <section className="relative h-64 bg-[var(--primary)] flex items-end pb-12 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2d4a22] to-[#1a2e12]" />
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-28">
          <p className="text-[var(--accent)] text-sm font-medium uppercase tracking-widest mb-2">Let's Begin</p>
          <h1 className="text-4xl md:text-5xl font-serif text-white font-bold">Plan Your Visit</h1>
        </div>
      </section>

      <section className="py-20 px-6 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-serif font-bold text-[var(--foreground)] mb-2">Send Us a Message</h2>
            <p className="text-[var(--muted-foreground)] mb-8">Fill out the form below and our team will get back to you within 24 hours to confirm your booking.</p>
            <BookingForm experiences={experiences || []} />
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 border border-[var(--border)] shadow-sm">
              <h3 className="font-serif text-lg font-bold text-[var(--foreground)] mb-6">Get in Touch</h3>
              <div className="space-y-5">
                <a href="tel:+255785844931" className="flex items-start gap-4 group">
                  <div className="w-10 h-10 bg-[var(--muted)] rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--primary)] transition-colors">
                    <Phone className="w-4 h-4 text-[var(--primary)] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Phone / WhatsApp</p>
                    <p className="text-sm font-medium text-[var(--foreground)]">+255 785 844 931</p>
                    <p className="text-sm text-gray-400">+255 746 710 875</p>
                  </div>
                </a>
                <a href="mailto:agrifarmtourstz@gmail.com" className="flex items-start gap-4 group">
                  <div className="w-10 h-10 bg-[var(--muted)] rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--primary)] transition-colors">
                    <Mail className="w-4 h-4 text-[var(--primary)] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Email</p>
                    <p className="text-sm font-medium text-[var(--foreground)]">agrifarmtourstz@gmail.com</p>
                  </div>
                </a>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[var(--muted)] rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-[var(--primary)]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Location</p>
                    <p className="text-sm font-medium text-[var(--foreground)]">Tanzania, East Africa</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[var(--muted)] rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-[var(--primary)]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Response Time</p>
                    <p className="text-sm font-medium text-[var(--foreground)]">Within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[var(--primary)] text-white rounded-2xl p-8">
              <h3 className="font-serif text-lg font-bold mb-3">Connect on Social</h3>
              <p className="text-white/70 text-sm mb-5">Follow us for daily inspiration from Tanzania's farms and fields.</p>
              <div className="space-y-3">
                <a href="https://instagram.com/agrifarmtourstz" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
                  <MessageCircle className="w-4 h-4" /> @agrifarmtourstz on Instagram
                </a>
                <a href="https://tiktok.com/@agrifarmtourstz" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
                  <MessageCircle className="w-4 h-4" /> @agrifarmtourstz on TikTok
                </a>
                <a href="https://facebook.com/agrifarmtourstz" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
                  <MessageCircle className="w-4 h-4" /> @agrifarmtourstz on Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
