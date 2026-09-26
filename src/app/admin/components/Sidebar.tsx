'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Map, 
  Compass, 
  CalendarCheck, 
  CalendarDays, 
  Image as ImageIcon, 
  BookOpen, 
  MessageSquareQuote, 
  Users, 
  HelpCircle, 
  Layout, 
  FolderOpen, 
  Settings, 
  UsersRound 
} from 'lucide-react'
import { clsx } from 'clsx'

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Experiences', href: '/admin/experiences', icon: Compass },
  { name: 'Destinations', href: '/admin/destinations', icon: Map },
  { name: 'Bookings', href: '/admin/bookings', icon: CalendarCheck },
  { name: 'Calendar', href: '/admin/calendar', icon: CalendarDays },
  { name: 'Gallery', href: '/admin/gallery', icon: ImageIcon },
  { name: 'Stories', href: '/admin/stories', icon: BookOpen },
  { name: 'Testimonials', href: '/admin/testimonials', icon: MessageSquareQuote },
  { name: 'Team', href: '/admin/team', icon: Users },
  { name: 'FAQs', href: '/admin/faqs', icon: HelpCircle },
  { name: 'Homepage', href: '/admin/homepage', icon: Layout },
  { name: 'Media Library', href: '/admin/media', icon: FolderOpen },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
  { name: 'Users', href: '/admin/users', icon: UsersRound },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col w-64 bg-white border-r border-gray-200 h-full">
      <div className="h-16 flex items-center px-4 border-b border-gray-100 space-x-3">
        <Image src="/logo.png" alt="Logo" width={40} height={40} className="object-contain" />
        <span className="text-lg font-serif font-bold text-[var(--primary)] leading-tight">
          AGRI FARM<br/><span className="text-[10px] text-gray-500 uppercase tracking-widest font-sans">Tours TZ</span>
        </span>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-3 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname.startsWith(item.href)
            return (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  isActive 
                    ? 'bg-[var(--primary)] text-white' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900',
                  'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors'
                )}
              >
                <item.icon
                  className={clsx(
                    isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-500',
                    'flex-shrink-0 -ml-1 mr-3 h-5 w-5'
                  )}
                  aria-hidden="true"
                />
                <span className="truncate">{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
