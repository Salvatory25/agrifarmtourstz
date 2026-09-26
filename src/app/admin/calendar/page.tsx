import { createClient } from '@/utils/supabase/server'
import { CalendarDays } from 'lucide-react'

export default async function CalendarPage() {
  const supabase = await createClient()
  const today = new Date()
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1)
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0)

  const { data: availability } = await supabase
    .from('availability')
    .select('*, experiences(name)')
    .gte('date', firstDay.toISOString().split('T')[0])
    .lte('date', lastDay.toISOString().split('T')[0])
    .order('date', { ascending: true })

  const monthName = today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[var(--foreground)]">Availability Calendar</h1>
          <p className="text-[var(--muted-foreground)]">Manage tour availability and blocked dates.</p>
        </div>
        <div className="flex items-center gap-2 text-[var(--primary)] font-medium">
          <CalendarDays className="w-5 h-5" />
          {monthName}
        </div>
      </div>

      {!availability || availability.length === 0 ? (
        <div className="bg-white rounded-xl border border-[var(--border)] p-12 text-center">
          <CalendarDays className="w-10 h-10 text-gray-200 mx-auto mb-3" />
          <p className="text-gray-400">No availability slots set for this month.</p>
          <p className="text-sm text-gray-300 mt-1">Set availability for each experience to allow bookings.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-[var(--border)] overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider border-b border-[var(--border)]">
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Experience</th>
                <th className="px-6 py-4 font-medium">Capacity</th>
                <th className="px-6 py-4 font-medium">Booked</th>
                <th className="px-6 py-4 font-medium">Available</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)] text-sm">
              {availability.map((slot) => (
                <tr key={slot.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{new Date(slot.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</td>
                  <td className="px-6 py-4 text-gray-600">{slot.experiences?.name || '—'}</td>
                  <td className="px-6 py-4 text-gray-600">{slot.capacity_total}</td>
                  <td className="px-6 py-4 text-gray-600">{slot.capacity_booked}</td>
                  <td className="px-6 py-4 font-medium text-green-600">{slot.capacity_total - slot.capacity_booked}</td>
                  <td className="px-6 py-4">
                    <span className={'inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ' + (slot.is_blocked ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700')}>
                      {slot.is_blocked ? 'Blocked' : 'Open'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
