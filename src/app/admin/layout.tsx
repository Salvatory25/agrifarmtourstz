import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { Sidebar } from './components/Sidebar'
import { Topbar } from './components/Topbar'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/admin/login')
  }

  // Optionally fetch user profile to check role
  /*
  const { data: profile } = await supabase
    .from('profiles')
    .select('role_id, first_name, avatar_url')
    .eq('id', user.id)
    .single()
  */

  return (
    <div className="flex h-screen bg-[#f5f6f8] overflow-hidden">
      {/* Sidebar */}
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <Topbar user={user} />
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
