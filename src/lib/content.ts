import { createClient } from '@/utils/supabase/server'

export function safeImageUrl(value: string | null | undefined, fallback: string) {
  return typeof value === 'string' && value.trim().length > 0 ? value : fallback
}

export type HomepageHero = {
  heading: string
  subtitle: string
  description: string
  cta_text: string
  cta_link: string
  image_url: string
}

export type HomepageIntro = {
  heading: string
  description: string
  image_url: string
  cta_text: string
  cta_link: string
}

export type CategoryItem = {
  id: string
  name: string
  description?: string
  image_url?: string
  slug: string
}

export type ExperienceItem = {
  id: string
  name: string
  slug: string
  short_description: string
  featured_image?: string
  price?: number
  currency?: string
  duration?: string
  category_name?: string
  destination_name?: string
}

export type StoryItem = {
  id: string
  title: string
  slug: string
  excerpt?: string
  cover_image?: string
  publish_date?: string
  category_name?: string
}

export type DestinationItem = {
  id: string
  name: string
  slug: string
  description?: string
  hero_image?: string
  location?: string
  is_featured?: boolean
}

export type GalleryItem = {
  id: string
  title?: string
  image_url: string
  category?: string
}

export type TestimonialItem = {
  id: string
  customer_name: string
  country?: string
  review: string
  profile_image?: string
  rating?: number
}

export const fallbackHero: HomepageHero = {
  heading: 'Go Beyond the Safari. Discover Where Tanzania Grows.',
  subtitle: 'Experience Nature, Live the Farm',
  description: 'Connect with local farming communities, taste authentic Tanzanian food, and explore authentic agri-tourism experiences rooted in culture, people, and place.',
  cta_text: 'Discover More',
  cta_link: '/experiences',
  image_url: '/images/hero-bg.jpg',
}

export const fallbackIntro: HomepageIntro = {
  heading: 'What makes AgriFarm Tours TZ different?',
  description: 'We create meaningful journeys that connect travellers with Tanzanian farmers, food producers, coastal communities, and cultural traditions. Every visit celebrates agriculture, community, and hospitality.',
  image_url: '/images/farmer-intro.jpg',
  cta_text: 'Our Story',
  cta_link: '/about',
}

export const fallbackCategories: CategoryItem[] = [
  {
    id: 'farm',
    name: 'Farm Experiences',
    slug: 'farm-experiences',
    description: 'Hands-on learning on working farms and rural landscapes.',
    image_url: '/images/farmer-intro.jpg',
  },
  {
    id: 'food',
    name: 'Food Experiences',
    slug: 'food-experiences',
    description: 'Taste the stories behind Tanzanian ingredients and cuisine.',
    image_url: '/images/spice-tour.jpg',
  },
  {
    id: 'culture',
    name: 'Cultural Experiences',
    slug: 'cultural-experiences',
    description: 'Meet families, communities, and local traditions around the farm.',
    image_url: '/images/village-cooking.jpg',
  },
  {
    id: 'nature',
    name: 'Nature Experiences',
    slug: 'nature-experiences',
    description: 'Explore landscapes that sustain people and wildlife.',
    image_url: '/images/hero-bg.jpg',
  },
]

export const fallbackExperiences: ExperienceItem[] = [
  {
    id: 'exp-1',
    name: 'Coffee Farm Immersion',
    slug: 'coffee-farm-immersion',
    short_description: 'Roast coffee with a local family and learn the rhythm of the highland farms.',
    featured_image: '/images/coffee-tour.jpg',
    price: 45,
    currency: 'USD',
    duration: 'Half Day',
    category_name: 'Farm Experiences',
    destination_name: 'Kilimanjaro',
  },
  {
    id: 'exp-2',
    name: 'Zanzibar Spice Farm Tour',
    slug: 'zanzibar-spice-farm-tour',
    short_description: 'Walk through aromatic spice gardens and learn how cloves and vanilla shape the island.',
    featured_image: '/images/spice-tour.jpg',
    price: 35,
    currency: 'USD',
    duration: 'Half Day',
    category_name: 'Food Experiences',
    destination_name: 'Zanzibar',
  },
  {
    id: 'exp-3',
    name: 'Village Farming Day',
    slug: 'village-farming-day',
    short_description: 'Work alongside farmers, cook together, and enjoy a village meal at sunset.',
    featured_image: '/images/village-cooking.jpg',
    price: 60,
    currency: 'USD',
    duration: 'Full Day',
    category_name: 'Cultural Experiences',
    destination_name: 'Arusha',
  },
]

export const fallbackDestinations: DestinationItem[] = [
  {
    id: 'dest-1',
    name: 'Mount Kilimanjaro Region',
    slug: 'mount-kilimanjaro-region',
    description: 'Highland coffee farms, banana groves, and community experiences around the mountain.',
    hero_image: '/images/hero-bg.jpg',
    location: 'Northern Tanzania',
    is_featured: true,
  },
  {
    id: 'dest-2',
    name: 'Zanzibar Archipelago',
    slug: 'zanzibar-archipelago',
    description: 'Explore spice gardens, coastal markets, and a vibrant island heritage.',
    hero_image: '/images/spice-tour.jpg',
    location: 'Indian Ocean',
    is_featured: true,
  },
]

export const fallbackStories: StoryItem[] = [
  {
    id: 'story-1',
    title: 'A Morning with the Chagga Farmers of Kilimanjaro',
    slug: 'a-morning-with-the-chagga-farmers-of-kilimanjaro',
    excerpt: 'Before sunrise, we were already learning about coffee cultivation and local traditions.',
    cover_image: '/images/coffee-tour.jpg',
    publish_date: '2026-08-15',
    category_name: 'Farm Stories',
  },
  {
    id: 'story-2',
    title: 'Why Zanzibar’s Spice Farms Feel Like a Living Museum',
    slug: 'why-zanzibar-spice-farms-feel-like-a-living-museum',
    excerpt: 'Every scent tells a story about culture, food, and community on the island of cloves.',
    cover_image: '/images/spice-tour.jpg',
    publish_date: '2026-08-08',
    category_name: 'Destinations',
  },
]

export const fallbackGallery: GalleryItem[] = [
  { id: 'g1', title: 'Farm field', image_url: '/images/hero-bg.jpg', category: 'Agriculture' },
  { id: 'g2', title: 'Coffee harvest', image_url: '/images/coffee-tour.jpg', category: 'Coffee' },
  { id: 'g3', title: 'Spice farm', image_url: '/images/spice-tour.jpg', category: 'Spice' },
  { id: 'g4', title: 'Village life', image_url: '/images/village-cooking.jpg', category: 'Culture' },
]

export const fallbackTestimonials: TestimonialItem[] = [
  {
    id: 't1',
    customer_name: 'Sarah M.',
    country: 'United Kingdom',
    review: 'The farm visit felt authentic, personal, and deeply connected to the local community. It was the best part of our Tanzania trip.',
    profile_image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
    rating: 5,
  },
  {
    id: 't2',
    customer_name: 'Thomas K.',
    country: 'Kenya',
    review: 'We learned so much about food systems, local culture, and the pride farmers take in their work. Truly unforgettable.',
    profile_image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80',
    rating: 5,
  },
]

export async function getHomepageContent() {
  const supabase = await createClient()

  try {
    const [heroResult, introResult, categoriesResult, experiencesResult, destinationsResult, storiesResult, galleryResult, testimonialsResult] = await Promise.all([
      supabase.from('homepage_sections').select('*').eq('section_key', 'hero').maybeSingle(),
      supabase.from('homepage_sections').select('*').eq('section_key', 'intro').maybeSingle(),
      supabase.from('experience_categories').select('*').eq('is_published', true).order('created_at', { ascending: false }),
      supabase.from('experiences').select('*, destinations(name), experience_categories(name)').eq('is_published', true).eq('is_featured', true).order('created_at', { ascending: false }).limit(3),
      supabase.from('destinations').select('*').eq('is_published', true).eq('is_featured', true).order('created_at', { ascending: false }).limit(3),
      supabase.from('blog_posts').select('*, blog_categories(name)').eq('is_published', true).order('publish_date', { ascending: false }).limit(3),
      supabase.from('gallery_items').select('*').eq('is_published', true).order('display_order', { ascending: true }).limit(6),
      supabase.from('testimonials').select('*').eq('is_published', true).order('created_at', { ascending: false }).limit(3),
    ])

    const hero = heroResult.data?.content ? { ...fallbackHero, ...heroResult.data.content } : fallbackHero
    const intro = introResult.data?.content ? { ...fallbackIntro, ...introResult.data.content } : fallbackIntro

    return {
      hero,
      intro,
      categories: categoriesResult.data?.length ? categoriesResult.data : fallbackCategories,
      featuredExperiences: experiencesResult.data?.length ? experiencesResult.data : fallbackExperiences,
      destinations: destinationsResult.data?.length ? destinationsResult.data : fallbackDestinations,
      stories: storiesResult.data?.length ? storiesResult.data : fallbackStories,
      gallery: galleryResult.data?.length ? galleryResult.data : fallbackGallery,
      testimonials: testimonialsResult.data?.length ? testimonialsResult.data : fallbackTestimonials,
    }
  } catch {
    return {
      hero: fallbackHero,
      intro: fallbackIntro,
      categories: fallbackCategories,
      featuredExperiences: fallbackExperiences,
      destinations: fallbackDestinations,
      stories: fallbackStories,
      gallery: fallbackGallery,
      testimonials: fallbackTestimonials,
    }
  }
}
