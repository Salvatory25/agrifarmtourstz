'use client'

import { useState } from 'react'
import { login } from './actions'

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function handleSubmit(formData: FormData) {
    setPending(true)
    setError(null)
    const result = await login(formData)
    
    if (result?.error) {
      setError(result.error)
      setPending(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--muted)] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-[var(--border)]">
        <div className="p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-serif text-[var(--primary)] mb-2">AgriFarm Tours TZ</h1>
            <p className="text-[var(--muted-foreground)]">Sign in to your admin dashboard</p>
          </div>
          
          <form action={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 rounded-lg border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-colors"
                placeholder="admin@agrifarmtours.co.tz"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-4 py-3 rounded-lg border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-colors"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={pending}
              className="w-full bg-[var(--primary)] text-white font-medium py-3 rounded-lg hover:bg-[#223a1a] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary)] disabled:opacity-70 flex justify-center items-center"
            >
              {pending ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
        
        <div className="bg-[var(--muted)] px-8 py-4 border-t border-[var(--border)] text-center text-sm text-[var(--muted-foreground)]">
          Secure Admin Portal
        </div>
      </div>
    </div>
  )
}
