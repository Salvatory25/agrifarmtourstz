'use client'

import { useState } from 'react'
import { Send, CheckCircle2, Loader2 } from 'lucide-react'

interface Experience {
  id: string
  name: string
  price: number | null
  currency: string
  duration: string | null
}

export default function BookingForm({ experiences }: { experiences: Experience[] }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({
    name: '', email: '', phone: '', country: '', experience: '', date: '', guests: '1', message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    // Simulate submission (replace with actual Supabase insert or email API)
    await new Promise(r => setTimeout(r, 1500))
    setStatus('success')
  }

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-12 text-center">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-serif font-bold text-green-800 mb-2">Thank You!</h3>
        <p className="text-green-700">Your booking request has been received. We will contact you within 24 hours to confirm your experience.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 border border-[var(--border)] shadow-sm space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Full Name *</label>
          <input id="booking-name" required name="name" value={form.name} onChange={handleChange}
            className="w-full border border-[var(--border)] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" placeholder="Your full name" />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Email Address *</label>
          <input id="booking-email" required type="email" name="email" value={form.email} onChange={handleChange}
            className="w-full border border-[var(--border)] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" placeholder="you@example.com" />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Phone / WhatsApp</label>
          <input id="booking-phone" name="phone" value={form.phone} onChange={handleChange}
            className="w-full border border-[var(--border)] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" placeholder="+1 234 567 8900" />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Country of Origin</label>
          <input id="booking-country" name="country" value={form.country} onChange={handleChange}
            className="w-full border border-[var(--border)] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" placeholder="e.g. United States" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Preferred Experience</label>
          <select id="booking-experience" name="experience" value={form.experience} onChange={handleChange}
            className="w-full border border-[var(--border)] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] bg-white">
            <option value="">Select an experience...</option>
            {experiences.map(exp => (
              <option key={exp.id} value={exp.id}>
                {exp.name}{exp.price ? ` — ${exp.currency} ${exp.price}` : ''}
              </option>
            ))}
            <option value="custom">I need a custom tour</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Preferred Date</label>
          <input id="booking-date" type="date" name="date" value={form.date} onChange={handleChange}
            className="w-full border border-[var(--border)] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Number of Guests</label>
        <input id="booking-guests" type="number" min="1" max="50" name="guests" value={form.guests} onChange={handleChange}
          className="w-full border border-[var(--border)] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--foreground)] mb-2">Special Requests / Message</label>
        <textarea id="booking-message" name="message" value={form.message} onChange={handleChange} rows={4}
          className="w-full border border-[var(--border)] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] resize-none"
          placeholder="Tell us about your group, dietary requirements, or any questions..." />
      </div>

      <button type="submit" disabled={status === 'loading'}
        className="w-full bg-[var(--primary)] text-white py-4 rounded-full font-medium text-lg hover:bg-[#223a1a] disabled:opacity-60 transition-all flex items-center justify-center gap-2">
        {status === 'loading' ? <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</> : <><Send className="w-5 h-5" /> Submit Booking Request</>}
      </button>
    </form>
  )
}
