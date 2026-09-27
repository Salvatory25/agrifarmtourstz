import { createClient } from '@/utils/supabase/server'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Leaf, Users, Heart, Globe } from 'lucide-react'

export const revalidate = 3600 // Re-fetch team members at most once per hour

export const metadata = {
  title: 'Our Story | AgriFarm Tours TZ',
  description: 'Learn about AgriFarm Tours TZ — our mission, our team, and our passion for authentic Tanzanian agricultural tourism.',
}

export default async function AboutPage() {
  const supabase = await createClient()
  const { data: team } = await supabase
    .from('team_members')
    .select('*')
    .eq('is_published', true)
    .order('display_order', { ascending: true })

  const values = [
    { icon: Leaf, title: 'Sustainability', description: 'We operate in harmony with the land, supporting eco-friendly farming practices and responsible tourism.' },
    { icon: Users, title: 'Community First', description: 'Every tour directly benefits local farming communities — creating jobs and preserving traditions.' },
    { icon: Heart, title: 'Authentic Experiences', description: 'We reject commercialised tourism. Every experience is real, raw, and deeply connected to Tanzanian culture.' },
    { icon: Globe, title: 'Cultural Exchange', description: 'We believe in the transformative power of meeting people from different walks of life.' },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-80 flex items-end pb-12 px-6 overflow-hidden bg-gradient-to-br from-[#2d4a22] to-[#1a2e12]">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-28">
          <p className="text-[var(--accent)] text-sm font-medium uppercase tracking-widest mb-2">About Us</p>
          <h1 className="text-4xl md:text-5xl font-serif text-white font-bold">Our Story</h1>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-6 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[var(--accent)] text-sm font-medium uppercase tracking-widest mb-4">Our Mission</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[var(--foreground)] mb-6">
              Go Beyond the Safari. Discover Where Tanzania Grows.
            </h2>
            <p className="text-[var(--muted-foreground)] text-lg leading-relaxed mb-6">
              AgriFarm Tours TZ was born from a simple but powerful belief: that the most profound travel experiences happen not on the savanna, but in the fields, farms, and kitchens of Tanzania.
            </p>
            <p className="text-[var(--muted-foreground)] text-lg leading-relaxed mb-8">
              We connect curious travellers with the people who grow Tanzania's food — farmers, spice cultivators, coffee harvesters, and fishermen — creating genuine human connections that change perspectives.
            </p>
            <Link href="/booking" className="inline-flex items-center bg-[var(--primary)] text-white px-8 py-3 rounded-full font-medium hover:bg-[#223a1a] transition-colors">
              Start Your Journey <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
          <div className="bg-[var(--muted)] rounded-none p-8 h-80 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl font-serif font-bold text-[var(--primary)] mb-2">Since</div>
              <div className="text-8xl font-serif font-bold text-[var(--accent)]">2020</div>
              <p className="text-[var(--muted-foreground)] mt-2">Connecting hearts across Tanzania</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[var(--accent)] text-sm font-medium uppercase tracking-widest mb-4">What We Stand For</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[var(--foreground)]">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v) => (
              <div key={v.title} className="text-center p-8 rounded-none bg-[var(--muted)] hover:bg-[var(--primary)] hover:text-white group transition-all duration-300">
                <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-5 group-hover:bg-white/20 transition-colors">
                  <v.icon className="w-7 h-7 text-[var(--primary)] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-serif text-lg font-bold mb-3 group-hover:text-white">{v.title}</h3>
                <p className="text-sm text-[var(--muted-foreground)] group-hover:text-white/80 leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      {team && team.length > 0 && (
        <section className="py-20 px-6 bg-[var(--background)]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-[var(--accent)] text-sm font-medium uppercase tracking-widest mb-4">The People</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[var(--foreground)]">Meet Our Team</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {team.map((member) => (
                <div key={member.id} className="text-center group">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto mb-5 bg-[var(--muted)]">
                    {member.photo_url
                      ? <Image src={member.photo_url} alt={member.name} fill className="object-cover" />
                      : <div className="absolute inset-0 flex items-center justify-center text-3xl font-serif text-[var(--primary)]/30">{member.name.charAt(0)}</div>}
                  </div>
                  <h3 className="font-serif font-bold text-[var(--foreground)] text-lg mb-1">{member.name}</h3>
                  <p className="text-sm text-[var(--accent)] font-medium mb-3">{member.position}</p>
                  {member.biography && <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">{member.biography}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 px-6 bg-[var(--primary)] text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Ready to Meet Tanzania?</h2>
          <p className="text-white/80 text-lg mb-8">Contact us and let's plan an experience that will change the way you see the world.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking" className="bg-[var(--accent)] text-gray-900 px-8 py-3 rounded-full font-medium hover:bg-[#d4a84d] transition-colors">
              Plan Your Visit
            </Link>
            <a href="mailto:admin@agrifarmtours.co.tz" className="border border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
