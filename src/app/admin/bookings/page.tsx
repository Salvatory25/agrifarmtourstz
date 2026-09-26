import { createClient } from '@/utils/supabase/server'
import { CalendarCheck, Clock, CheckCircle, XCircle } from 'lucide-react'

const STATUS_COLORS: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  CONFIRMED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800',
  COMPLETED: 'bg-blue-100 text-blue-800',
}

export default async function BookingsPage() {
  const supabase = await createClient()
  const { data: bookings } = await supabase
    .from('bookings')
    .select('*, experiences(name)')
    .order('created_at', { ascending: false })

  const stats = {
    pending: bookings?.filter(b => b.status === 'PENDING').length || 0,
    confirmed: bookings?.filter(b => b.status === 'CONFIRMED').length || 0,
    completed: bookings?.filter(b => b.status === 'COMPLETED').length || 0,
    cancelled: bookings?.filter(b => b.status === 'CANCELLED').length || 0,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold text-[var(--foreground)]">Bookings</h1>
        <p className="text-[var(--muted-foreground)]">Manage all booking requests and reservations.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Pending', value: stats.pending, icon: Clock, color: 'text-yellow-600' },
          { label: 'Confirmed', value: stats.confirmed, icon: CalendarCheck, color: 'text-green-600' },
          { label: 'Completed', value: stats.completed, icon: CheckCircle, color: 'text-blue-600' },
          { label: 'Cancelled', value: stats.cancelled, icon: XCircle, color: 'text-red-600' },
        ].map(s => (
          <div key={s.label} className="bg-white p-5 rounded-xl border border-[var(--border)] shadow-sm flex items-center gap-4">
            <s.icon className={'w-8 h-8 ' + s.color} />
            <div>
              <p className="text-2xl font-bold text-[var(--foreground)]">{s.value}</p>
              <p className="text-xs text-gray-500 uppercase tracking-wider">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-[var(--border)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider border-b border-[var(--border)]">
                <th className="px-6 py-4 font-medium">Reference</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Experience</th>
                <th className="px-6 py-4 font-medium">Guests</th>
                <th className="px-6 py-4 font-medium">Total</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)] text-sm">
              {!bookings || bookings.length === 0 ? (
                <tr><td colSpan={7} className="px-6 py-12 text-center text-gray-400">No bookings yet.</td></tr>
              ) : bookings.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-mono font-medium text-[var(--primary)]">{b.reference_code}</td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{b.customer_name}</p>
                    <p className="text-xs text-gray-400">{b.customer_email}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{b.experiences?.name || '—'}</td>
                  <td className="px-6 py-4 text-gray-600">{b.number_of_guests}</td>
                  <td className="px-6 py-4 text-gray-600">{b.total_price ? `${b.currency} ${b.total_price}` : '—'}</td>
                  <td className="px-6 py-4 text-gray-500 text-xs">{new Date(b.created_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className={'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ' + (STATUS_COLORS[b.status] || 'bg-gray-100 text-gray-800')}>
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
