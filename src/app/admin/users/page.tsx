import { createClient } from '@/utils/supabase/server'
import { UsersRound, Shield } from 'lucide-react'

export default async function UsersPage() {
  const supabase = await createClient()
  const { data: profiles } = await supabase.from('profiles').select('*, roles(name)').order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold text-[var(--foreground)]">Admin Users</h1>
        <p className="text-[var(--muted-foreground)]">Manage team members who have access to this admin panel.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-[var(--border)] overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider border-b border-[var(--border)]">
              <th className="px-6 py-4 font-medium">User</th>
              <th className="px-6 py-4 font-medium">Role</th>
              <th className="px-6 py-4 font-medium">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)] text-sm">
            {!profiles || profiles.length === 0 ? (
              <tr><td colSpan={3} className="px-6 py-12 text-center">
                <UsersRound className="w-8 h-8 text-gray-200 mx-auto mb-2" />
                <p className="text-gray-400">No users found.</p>
              </td></tr>
            ) : profiles.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--primary)] flex items-center justify-center text-white text-xs font-bold">
                      {p.first_name?.charAt(0) || '?'}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{p.first_name} {p.last_name}</p>
                      <p className="text-xs text-gray-400 font-mono">{p.id.slice(0, 8)}...</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 text-[var(--primary)]">
                    <Shield className="w-3.5 h-3.5" />
                    <span className="text-xs font-medium">{p.roles?.name || 'No Role'}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-400 text-xs">{new Date(p.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
