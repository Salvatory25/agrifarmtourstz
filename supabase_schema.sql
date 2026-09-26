-- AGRIFARM TOURS TZ - SUPABASE POSTGRESQL SCHEMA

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ROLES & PROFILES
CREATE TABLE public.roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(50) NOT NULL UNIQUE, -- 'SUPER_ADMIN', 'CONTENT_ADMIN', 'BOOKING_ADMIN'
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role_id UUID REFERENCES public.roles(id) ON DELETE SET NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. DESTINATIONS
CREATE TABLE public.destinations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  hero_image TEXT,
  location TEXT,
  travel_information TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  seo_title VARCHAR(255),
  seo_description TEXT,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. EXPERIENCE CATEGORIES
CREATE TABLE public.experience_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. EXPERIENCES
CREATE TABLE public.experiences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  destination_id UUID REFERENCES public.destinations(id) ON DELETE SET NULL,
  category_id UUID REFERENCES public.experience_categories(id) ON DELETE SET NULL,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  short_description TEXT,
  full_description TEXT,
  duration VARCHAR(100), -- e.g. "3 Days", "4 Hours"
  price DECIMAL(10, 2),
  currency VARCHAR(10) DEFAULT 'USD',
  capacity INTEGER,
  meeting_point TEXT,
  best_season VARCHAR(100),
  featured_image TEXT,
  highlights JSONB, -- Array of strings
  whats_included JSONB, -- Array of strings
  whats_not_included JSONB, -- Array of strings
  is_featured BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT FALSE,
  seo_title VARCHAR(255),
  seo_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. EXPERIENCE IMAGES (Gallery per experience)
CREATE TABLE public.experience_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  experience_id UUID REFERENCES public.experiences(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text VARCHAR(255),
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. AVAILABILITY & CALENDAR
CREATE TABLE public.availability (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  experience_id UUID REFERENCES public.experiences(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  capacity_total INTEGER NOT NULL,
  capacity_booked INTEGER DEFAULT 0,
  is_blocked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(experience_id, date)
);

-- 7. BOOKINGS & GUESTS
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reference_code VARCHAR(50) NOT NULL UNIQUE,
  experience_id UUID REFERENCES public.experiences(id) ON DELETE RESTRICT,
  availability_id UUID REFERENCES public.availability(id) ON DELETE RESTRICT,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50),
  customer_country VARCHAR(100),
  number_of_guests INTEGER NOT NULL DEFAULT 1,
  total_price DECIMAL(10, 2),
  currency VARCHAR(10) DEFAULT 'USD',
  special_requests TEXT,
  internal_notes TEXT,
  status VARCHAR(50) DEFAULT 'PENDING', -- 'PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.booking_guests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  full_name VARCHAR(255) NOT NULL,
  age_group VARCHAR(50), -- e.g., 'Adult', 'Child'
  dietary_requirements TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. STORIES / BLOG
CREATE TABLE public.blog_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID REFERENCES public.blog_categories(id) ON DELETE SET NULL,
  author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image TEXT,
  tags JSONB, -- Array of strings
  is_featured BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT FALSE,
  publish_date TIMESTAMPTZ,
  seo_title VARCHAR(255),
  seo_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. TESTIMONIALS
CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  experience_id UUID REFERENCES public.experiences(id) ON DELETE SET NULL,
  customer_name VARCHAR(255) NOT NULL,
  country VARCHAR(100),
  profile_image TEXT,
  review TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. TEAM MEMBERS
CREATE TABLE public.team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  biography TEXT,
  photo_url TEXT,
  social_links JSONB, -- e.g., {"linkedin": "...", "twitter": "..."}
  display_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. GENERAL GALLERY
CREATE TABLE public.gallery_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255),
  image_url TEXT NOT NULL,
  category VARCHAR(100),
  display_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. FAQS
CREATE TABLE public.faqs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category VARCHAR(100),
  display_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. SITE SETTINGS (Singleton pattern conceptually)
CREATE TABLE public.site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name VARCHAR(255) DEFAULT 'AgriFarm Tours TZ',
  logo_url TEXT,
  favicon_url TEXT,
  email VARCHAR(255),
  phone VARCHAR(50),
  whatsapp VARCHAR(50),
  address TEXT,
  business_hours TEXT,
  social_media JSONB,
  google_maps_embed TEXT,
  booking_contact_email VARCHAR(255),
  default_currency VARCHAR(10) DEFAULT 'USD',
  footer_content TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Note: 'media' table is not strictly needed if we use Supabase Storage natively,
-- but can be used for custom media library metadata if required later.

-- FUNCTION TO AUTO-UPDATE updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger setup example for experiences
CREATE TRIGGER update_experiences_modtime
BEFORE UPDATE ON public.experiences
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
-- (You should attach this trigger to all tables with an updated_at column)
