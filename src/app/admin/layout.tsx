import { Sidebar } from './components/Sidebar'
import { Topbar } from './components/Topbar'
import { createClient } from '@/utils/supabase/server'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="flex h-screen bg-[#f5f6f8] overflow-hidden">
      {user ? <Sidebar /> : null}

      <div className="flex-1 flex flex-col overflow-hidden">
        {user ? <Topbar user={user} /> : null}

        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
