import Link from 'next/link'
import { ArrowRight, Leaf, Users, MapPin } from 'lucide-react'

export default function Home() {
  return (
    <main className="flex-1">
      {/* HERO SECTION */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background placeholder (to be replaced with dynamic CMS video/image) */}
        <div className="absolute inset-0 bg-[#2d4a22] bg-opacity-90">
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white font-bold leading-tight mb-6">
            Go Beyond the Safari. <br/>
            <span className="text-[var(--accent)] italic">Discover Where Tanzania Grows.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-light">
            Experience authentic agricultural and cultural tourism. Connect with the people behind the harvest, taste food at its source, and explore Tanzania's rich landscapes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/experiences" 
              className="bg-[var(--accent)] text-gray-900 px-8 py-4 rounded-full font-medium text-lg hover:bg-[#d4a84d] transition-all transform hover:scale-105 flex items-center justify-center"
            >
              Explore Experiences
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link 
              href="/about" 
              className="bg-transparent border border-white text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-white/10 transition-all flex items-center justify-center"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* WHY AGRIFARM SECTION */}
      <section className="py-24 bg-[var(--background)] px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-serif text-[var(--primary)] mb-16">
            Authentic Connection. <br/> Real Discovery.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-[#eaf0e8] rounded-full flex items-center justify-center mb-6 text-[var(--primary)]">
                <Leaf className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-3">From Soil to Story</h3>
              <p className="text-[var(--muted-foreground)]">Taste Tanzania at its source and learn the rich agricultural traditions passed down through generations.</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-[#eaf0e8] rounded-full flex items-center justify-center mb-6 text-[var(--primary)]">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-3">Local Communities</h3>
              <p className="text-[var(--muted-foreground)]">Meet the inspiring farmers and families who are the true caretakers of the land.</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-[#eaf0e8] rounded-full flex items-center justify-center mb-6 text-[var(--primary)]">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-3">Hidden Landscapes</h3>
              <p className="text-[var(--muted-foreground)]">Journey off the beaten path into lush highlands, historic spice farms, and stunning rural vistas.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* FEATURED EXPERIENCES PLACEHOLDER */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-serif text-[var(--foreground)] mb-4">Curated Experiences</h2>
              <p className="text-[var(--muted-foreground)] text-lg">Hand-picked journeys into the heart of Tanzanian agriculture.</p>
            </div>
            <Link href="/experiences" className="hidden md:flex items-center text-[var(--primary)] font-medium hover:underline">
              View All <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[var(--muted)] h-96 rounded-2xl flex items-center justify-center border border-[var(--border)] shadow-sm hover:shadow-md transition-shadow">
              <span className="text-sm text-gray-500 uppercase tracking-widest font-medium">CMS Dynamic Content</span>
            </div>
            <div className="bg-[var(--muted)] h-96 rounded-2xl flex items-center justify-center border border-[var(--border)] shadow-sm hover:shadow-md transition-shadow">
              <span className="text-sm text-gray-500 uppercase tracking-widest font-medium">CMS Dynamic Content</span>
            </div>
            <div className="bg-[var(--muted)] h-96 rounded-2xl flex items-center justify-center border border-[var(--border)] shadow-sm hover:shadow-md transition-shadow">
              <span className="text-sm text-gray-500 uppercase tracking-widest font-medium">CMS Dynamic Content</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* FINAL CTA */}
      <section className="py-24 bg-[var(--primary)] text-white text-center px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">Your next Tanzanian experience starts here.</h2>
          <p className="text-lg text-white/80 mb-10 font-light">Join us in preserving culture, supporting local farmers, and creating unforgettable memories.</p>
          <Link 
            href="/booking" 
            className="inline-block bg-[var(--secondary)] text-white px-10 py-4 rounded-full font-medium text-lg hover:bg-[#a54c30] transition-colors"
          >
            Plan Your Visit
          </Link>
        </div>
      </section>
    </main>
  )
}
