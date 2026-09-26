import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Edit, Users } from 'lucide-react'

export default async function TeamPage() {
  const supabase = await createClient()
  const { data: members } = await supabase.from('team_members').select('*').order('display_order', { ascending: true })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[var(--foreground)]">Team Members</h1>
          <p className="text-[var(--muted-foreground)]">Manage your team profiles shown on the About page.</p>
        </div>
        <Link href="/admin/team/new" className="inline-flex items-center bg-[var(--primary)] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#223a1a] transition-colors">
          <Plus className="w-4 h-4 mr-2" />Add Member
        </Link>
      </div>

      {!members || members.length === 0 ? (
        <div className="bg-white rounded-xl border border-[var(--border)] p-12 text-center">
          <Users className="w-10 h-10 text-gray-200 mx-auto mb-3" />
          <p className="text-gray-400">No team members yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {members.map((m) => (
            <div key={m.id} className="bg-white rounded-xl border border-[var(--border)] p-6 shadow-sm text-center group relative">
              <div className="relative w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 bg-gray-100">
                {m.photo_url
                  ? <Image src={m.photo_url} alt={m.name} fill className="object-cover" />
                  : <div className="absolute inset-0 flex items-center justify-center text-2xl font-serif text-gray-300">{m.name.charAt(0)}</div>}
              </div>
              <p className="font-serif font-bold text-gray-900">{m.name}</p>
              <p className="text-xs text-[var(--accent)] font-medium mt-1 mb-3">{m.position}</p>
              <span className={'inline-flex px-2 py-0.5 rounded-full text-xs font-medium ' + (m.is_published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800')}>
                {m.is_published ? 'Visible' : 'Hidden'}
              </span>
              <Link href={`/admin/team/${m.id}/edit`} className="absolute top-4 right-4 text-gray-300 hover:text-[var(--primary)] transition-colors">
                <Edit className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
