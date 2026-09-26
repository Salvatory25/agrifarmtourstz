'use client'

import { logout } from '../login/actions'
import { LogOut, User } from 'lucide-react'
import type { User as SupabaseUser } from '@supabase/supabase-js'

export function Topbar({ user }: { user: SupabaseUser | null }) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 md:px-8">
      <div className="flex items-center">
        {/* Mobile menu button could go here */}
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 text-sm text-gray-700">
          <User className="w-4 h-4" />
          <span>{user?.email}</span>
        </div>
        
        <div className="h-4 w-px bg-gray-300 mx-2" />
        
        <form action={logout}>
          <button 
            type="submit" 
            className="flex items-center text-sm font-medium text-gray-500 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </button>
        </form>
      </div>
    </header>
  )
}
