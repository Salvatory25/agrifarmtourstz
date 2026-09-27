import { Mail, Phone, Calendar, UserPlus, Filter, Search, Download } from 'lucide-react'

export default function CRMPage() {
  // Mock data to demonstrate the CRM functionality
  const leads = [
    { id: 1, name: 'Emma Thompson', email: 'emma.t@example.com', phone: '+44 7700 900123', status: 'New', source: 'Website Signup', date: '2026-09-26' },
    { id: 2, name: 'Michael Chen', email: 'm.chen@example.com', phone: '+1 555 019 8234', status: 'Contacted', source: 'Contact Form', date: '2026-09-25' },
    { id: 3, name: 'Sarah Jenkins', email: 'sarah.j@example.com', phone: '+61 491 570 110', status: 'In Progress', source: 'WhatsApp', date: '2026-09-24' },
    { id: 4, name: 'David Smith', email: 'david.s@example.com', phone: '+255 754 123 456', status: 'Converted', source: 'Newsletter', date: '2026-09-20' },
  ]

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'New': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Contacted': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'In Progress': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'Converted': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[var(--foreground)]">CRM & Leads</h1>
          <p className="text-[var(--muted-foreground)]">Manage your customers, visitors, and website inquiries.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 bg-white border border-[var(--border)] text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button className="inline-flex items-center gap-2 bg-[var(--primary)] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#223a1a] transition-colors shadow-sm">
            <UserPlus className="w-4 h-4" /> Add Lead
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-5 rounded-xl border border-[var(--border)] shadow-sm">
          <p className="text-sm text-gray-500 font-medium">Total Leads</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">128</p>
          <p className="text-xs text-green-600 font-medium mt-2">+12 this week</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-[var(--border)] shadow-sm">
          <p className="text-sm text-gray-500 font-medium">New Inquiries</p>
          <p className="text-3xl font-bold text-blue-600 mt-1">14</p>
          <p className="text-xs text-gray-400 font-medium mt-2">Needs follow-up</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-[var(--border)] shadow-sm">
          <p className="text-sm text-gray-500 font-medium">Active Conversations</p>
          <p className="text-3xl font-bold text-purple-600 mt-1">26</p>
          <p className="text-xs text-gray-400 font-medium mt-2">In progress</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-[var(--border)] shadow-sm">
          <p className="text-sm text-gray-500 font-medium">Conversion Rate</p>
          <p className="text-3xl font-bold text-green-600 mt-1">18.5%</p>
          <p className="text-xs text-green-600 font-medium mt-2">+2.4% vs last month</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-[var(--border)] overflow-hidden">
        <div className="p-4 border-b border-[var(--border)] flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50/50">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by name, email or phone..." 
              className="w-full pl-9 pr-4 py-2 text-sm border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
            />
          </div>
          <button className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 bg-white border border-[var(--border)] px-3 py-2 rounded-lg">
            <Filter className="w-4 h-4" /> Filter by Status
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50/80 text-gray-500 text-xs uppercase tracking-wider border-b border-[var(--border)]">
                <th className="px-6 py-4 font-semibold">Lead Details</th>
                <th className="px-6 py-4 font-semibold">Contact Info</th>
                <th className="px-6 py-4 font-semibold">Source</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Date Added</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)] text-sm">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center text-green-800 text-sm font-bold">
                        {lead.name.charAt(0)}
                      </div>
                      <div className="font-medium text-gray-900">{lead.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="w-3.5 h-3.5" />
                        <span className="text-xs">{lead.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="w-3.5 h-3.5" />
                        <span className="text-xs">{lead.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                      {lead.source}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-xs">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(lead.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[var(--primary)] hover:text-green-900 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      View Details
                    </button>
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
