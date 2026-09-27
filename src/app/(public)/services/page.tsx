import Link from 'next/link'
import { ArrowRight, Wrench, Leaf, Milk, Waves, Sun, Users, ShieldCheck } from 'lucide-react'

export const metadata = {
  title: 'Our Services | AGRI FARM TOURS',
  description: 'Explore all agri-tourism services we offer in Tanzania — farm tours, consulting, livestock experiences, and more.',
}

const services = [
  {
    icon: Wrench,
    tag: 'Agricultural Tours',
    title: 'Farm & Field Tours',
    description: 'Hop aboard a guided tractor ride across active farmlands. See seasonal crops up close, learn about crop cycles, and watch machinery in action on working Tanzanian farms.',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80',
    color: 'bg-green-700',
  },
  {
    icon: Leaf,
    tag: 'Soil Enhancement',
    title: 'Soil & Fertilization Programs',
    description: 'Join our agricultural experts for hands-on soil testing, composting workshops, and organic fertilization demos. Learn what makes Tanzania\'s soil so uniquely fertile.',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80',
    color: 'bg-amber-600',
  },
  {
    icon: Milk,
    tag: 'Animal Husbandry',
    title: 'Dairy & Livestock Experience',
    description: 'Meet the cattle, goats, and chickens that feed local communities. Learn traditional animal husbandry, participate in milking sessions, and taste farm-fresh dairy products.',
    image: 'https://images.unsplash.com/photo-1549474771-88fccbd761c9?auto=format&fit=crop&q=80',
    color: 'bg-blue-700',
  },
  {
    icon: Waves,
    tag: 'Aquaculture',
    title: 'Fishing & Aquaculture Tours',
    description: 'Explore Tanzania\'s freshwater and coastal fishing traditions. Join local fishermen at dawn, learn sustainable fishing techniques, and enjoy a fresh catch prepared on the shore.',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&q=80',
    color: 'bg-teal-700',
  },
  {
    icon: Leaf,
    tag: 'Spice & Coffee',
    title: 'Spice Farm & Coffee Experience',
    description: 'From the spice islands of Zanzibar to Kilimanjaro\'s coffee highlands — smell, taste, and learn about Tanzania\'s most prized agricultural exports on an immersive guided tour.',
    image: 'https://images.unsplash.com/photo-1447195047884-9b4f2196ef6f?auto=format&fit=crop&q=80',
    color: 'bg-red-700',
  },
  {
    icon: Sun,
    tag: 'Cultural Immersion',
    title: 'Village & Cultural Day',
    description: 'Spend a full day in a rural Tanzanian village. Cook traditional meals, participate in local farming routines, hear stories from elders, and leave with a deeper connection to the land.',
    image: 'https://images.unsplash.com/photo-1531219572328-a0171b4448a3?auto=format&fit=crop&q=80',
    color: 'bg-orange-600',
  },
]

const whyUs = [
  { icon: Users, title: 'Local Guides', desc: 'Every tour is led by local community members who know the land personally.' },
  { icon: ShieldCheck, title: 'Safe & Certified', desc: 'All experiences are safety-vetted and operated by certified agricultural professionals.' },
  { icon: Leaf, title: '100% Organic', desc: 'We partner only with farms that follow sustainable, chemical-free practices.' },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-80 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-green-950/80 via-green-900/60 to-green-950/80" />
        <div className="relative z-10 h-full flex flex-col justify-end pb-12 px-4 sm:px-6 max-w-7xl mx-auto w-full pt-28">
          <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-2">What We Offer</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white">Our Services</h1>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <span className="inline-block px-4 py-1 rounded-full border border-green-600 text-green-700 text-sm font-medium mb-4">Our Services</span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
              We Offer Eco & <br className="hidden md:block" /> Agriculture Services
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              From sunrise farm walks to sunset fishing — every experience is crafted to give you a genuine, unforgettable taste of Tanzanian agricultural life.
            </p>
          </div>
          <div className="flex gap-6 flex-shrink-0">
            {whyUs.map((w) => (
              <div key={w.title} className="flex flex-col items-center text-center w-28">
                <div className="w-14 h-14 rounded-none bg-green-800 text-white flex items-center justify-center mb-3 shadow-lg">
                  <w.icon className="w-7 h-7" />
                </div>
                <p className="font-bold text-gray-900 text-sm">{w.title}</p>
                <p className="text-gray-400 text-xs mt-1 leading-tight">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 pb-24 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((s) => (
              <div key={s.title} className="bg-[#1a4a15] rounded-none p-4 flex flex-col group cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <div className="rounded-none overflow-hidden h-56 mb-6 relative">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="px-4 pb-6 flex-grow flex flex-col">
                  <span className="inline-block px-3 py-1 rounded-full border border-white/30 text-white/90 text-xs w-fit mb-4">{s.tag}</span>
                  <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                  <p className="text-green-100/70 text-sm leading-relaxed flex-grow">{s.description}</p>
                  <Link href="/booking" className="mt-6 inline-flex items-center text-amber-400 text-sm font-semibold hover:text-amber-300 transition-colors">
                    Book This Experience <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 bg-green-800 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-5">Ready to Experience the Farm?</h2>
          <p className="text-white/70 text-lg mb-10">Contact us and let's plan your perfect agricultural adventure in Tanzania.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking" className="bg-amber-400 text-gray-900 px-8 py-4 rounded-full font-bold hover:bg-amber-300 transition-colors">
              Plan Your Visit
            </Link>
            <Link href="/experiences" className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors">
              See Experiences
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

