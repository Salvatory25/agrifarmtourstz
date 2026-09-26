import { Settings, Mail, Phone, Globe } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-serif font-bold text-[var(--foreground)]">Settings</h1>
        <p className="text-[var(--muted-foreground)]">Manage your site settings and configuration.</p>
      </div>

      <div className="bg-white rounded-xl border border-[var(--border)] p-8 space-y-6">
        <h2 className="font-serif font-bold text-lg flex items-center gap-2"><Settings className="w-5 h-5" /> Site Configuration</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Company Name</label>
            <input defaultValue="AgriFarm Tours TZ" className="w-full border border-[var(--border)] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Default Currency</label>
            <select className="w-full border border-[var(--border)] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-white">
              <option>USD</option><option>TZS</option><option>EUR</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[var(--border)] p-8 space-y-6">
        <h2 className="font-serif font-bold text-lg flex items-center gap-2"><Mail className="w-5 h-5" /> Contact Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> Email</label>
            <input defaultValue="agrifarmtourstz@gmail.com" className="w-full border border-[var(--border)] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> Phone</label>
            <input defaultValue="+255785844931" className="w-full border border-[var(--border)] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1"><Globe className="w-3.5 h-3.5" /> WhatsApp</label>
            <input defaultValue="+255785844931" className="w-full border border-[var(--border)] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="bg-[var(--primary)] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#223a1a] transition-colors">
          Save Settings
        </button>
      </div>
    </div>
  )
}
