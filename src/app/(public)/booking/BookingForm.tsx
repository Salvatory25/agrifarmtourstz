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
      <div className="bg-green-50 border border-green-200 rounded-none p-12 text-center">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-serif font-bold text-green-800 mb-2">Thank You!</h3>
        <p className="text-green-700">Your booking request has been received. We will contact you within 24 hours to confirm your experience.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      
      {/* Full Name */}
      <div>
        <label htmlFor="booking-name" className="sr-only">Full name</label>
        <input id="booking-name" required name="name" value={form.name} onChange={handleChange}
          className="w-full bg-gray-100/70 border-0 rounded-full px-6 py-4 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2f4f22] transition-all" 
          placeholder="Full name" />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="booking-email" className="sr-only">Email address</label>
        <input id="booking-email" required type="email" name="email" value={form.email} onChange={handleChange}
          className="w-full bg-gray-100/70 border-0 rounded-full px-6 py-4 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2f4f22] transition-all" 
          placeholder="Email address" />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="booking-phone" className="sr-only">Phone / WhatsApp</label>
        <input id="booking-phone" name="phone" value={form.phone} onChange={handleChange}
          className="w-full bg-gray-100/70 border-0 rounded-full px-6 py-4 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2f4f22] transition-all" 
          placeholder="Phone / WhatsApp" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Experience Dropdown */}
        <div>
          <label htmlFor="booking-experience" className="sr-only">Experience</label>
          <select id="booking-experience" name="experience" value={form.experience} onChange={handleChange}
            className="w-full bg-gray-100/70 border-0 rounded-full px-6 py-4 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#2f4f22] transition-all">
            <option value="" disabled className="text-gray-400">Select tour...</option>
            {experiences.map(exp => (
              <option key={exp.id} value={exp.id}>
                {exp.name}
              </option>
            ))}
            <option value="custom">Custom Tour</option>
          </select>
        </div>

        {/* Date */}
        <div>
          <label htmlFor="booking-date" className="sr-only">Date</label>
          <input id="booking-date" type="date" name="date" value={form.date} onChange={handleChange}
            className="w-full bg-gray-100/70 border-0 rounded-full px-6 py-4 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2f4f22] transition-all" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Country */}
        <div>
          <label htmlFor="booking-country" className="sr-only">Country</label>
          <input id="booking-country" name="country" value={form.country} onChange={handleChange}
            className="w-full bg-gray-100/70 border-0 rounded-full px-6 py-4 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2f4f22] transition-all" 
            placeholder="Country" />
        </div>

        {/* Guests */}
        <div>
          <label htmlFor="booking-guests" className="sr-only">Guests</label>
          <input id="booking-guests" type="number" min="1" max="50" name="guests" value={form.guests} onChange={handleChange}
            className="w-full bg-gray-100/70 border-0 rounded-full px-6 py-4 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2f4f22] transition-all" 
            placeholder="Guests" />
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="booking-message" className="sr-only">Special Requests</label>
        <textarea id="booking-message" name="message" value={form.message} onChange={handleChange} rows={3}
          className="w-full bg-gray-100/70 border-0 rounded-none px-6 py-4 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2f4f22] transition-all resize-none" 
          placeholder="Tell us about your trip..." />
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button type="submit" disabled={status === 'loading'}
          className="w-full bg-[#395635] text-white py-4 rounded-full font-medium text-[15px] hover:bg-[#2b4228] disabled:opacity-60 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
          {status === 'loading' ? <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</> : 'Start your journey'}
        </button>
      </div>
    </form>
  )
}
