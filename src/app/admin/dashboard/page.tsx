import { createClient } from '@/utils/supabase/server'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Fetch real statistics
  const [
    { count: experiencesCount },
    { count: bookingsCount },
    { count: destinationsCount }
  ] = await Promise.all([
    supabase.from('experiences').select('*', { count: 'exact', head: true }),
    supabase.from('bookings').select('*', { count: 'exact', head: true }).eq('status', 'PENDING'),
    supabase.from('destinations').select('*', { count: 'exact', head: true }),
  ])

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[var(--foreground)]">
            Good morning, AgriFarm Team 👋
          </h1>
          <p className="text-[var(--muted-foreground)]">
            Here's what's happening with your platform today.
          </p>
        </div>
        
        <Link 
          href="/admin/experiences/new"
          className="inline-flex items-center justify-center bg-[var(--primary)] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#223a1a] transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Experience
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat Cards */}
        <div className="bg-white p-6 rounded-xl border border-[var(--border)] shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Experiences</h3>
          <p className="text-3xl font-bold text-[var(--primary)] mt-2">{experiencesCount || 0}</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-[var(--border)] shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Pending Bookings</h3>
          <p className="text-3xl font-bold text-[var(--secondary)] mt-2">{bookingsCount || 0}</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-[var(--border)] shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Destinations</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{destinationsCount || 0}</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-[var(--border)] shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Available Dates</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">--</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-xl border border-[var(--border)] shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-medium text-gray-900">Recent Bookings</h2>
          </div>
          <div className="p-6 text-sm text-gray-500 text-center">
            No recent bookings found.
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[var(--border)] shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-medium text-gray-900">Upcoming Tours</h2>
          </div>
          <div className="p-6 text-sm text-gray-500 text-center">
            No upcoming tours found.
          </div>
        </div>
      </div>
    </div>
  )
}
