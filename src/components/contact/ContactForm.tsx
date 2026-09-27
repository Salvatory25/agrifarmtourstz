'use client'

import { useState } from 'react'

export function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      setSuccess(true)
      setFormData({
        name: '',
        company: '',
        phone: '',
        email: '',
        subject: '',
        message: ''
      })
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="bg-green-50 p-8 text-center">
        <h3 className="text-2xl font-bold text-green-900 mb-2">Message Sent!</h3>
        <p className="text-green-700">Thank you for reaching out. We will get back to you shortly.</p>
        <button 
          onClick={() => setSuccess(false)}
          className="mt-6 inline-block bg-[var(--primary)] text-white font-medium px-6 py-3 hover:bg-[#223a1a] transition-colors"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 text-sm font-medium">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">Name *</label>
          <input 
            required 
            type="text" 
            id="name" 
            value={formData.name}
            onChange={handleChange}
            placeholder="Name" 
            className="w-full px-4 py-3 bg-gray-50 border-none focus:ring-2 focus:ring-green-700 outline-none text-sm" 
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="company" className="text-sm font-medium text-gray-700">Company</label>
          <input 
            type="text" 
            id="company" 
            value={formData.company}
            onChange={handleChange}
            placeholder="Company" 
            className="w-full px-4 py-3 bg-gray-50 border-none focus:ring-2 focus:ring-green-700 outline-none text-sm" 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone</label>
          <input 
            type="tel" 
            id="phone" 
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone" 
            className="w-full px-4 py-3 bg-gray-50 border-none focus:ring-2 focus:ring-green-700 outline-none text-sm" 
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">Email *</label>
          <input 
            required 
            type="email" 
            id="email" 
            value={formData.email}
            onChange={handleChange}
            placeholder="Email" 
            className="w-full px-4 py-3 bg-gray-50 border-none focus:ring-2 focus:ring-green-700 outline-none text-sm" 
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-medium text-gray-700">Subject</label>
        <input 
          type="text" 
          id="subject" 
          value={formData.subject}
          onChange={handleChange}
          placeholder="Subject" 
          className="w-full px-4 py-3 bg-gray-50 border-none focus:ring-2 focus:ring-green-700 outline-none text-sm" 
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-gray-700">Message *</label>
        <textarea 
          required 
          id="message" 
          rows={5} 
          value={formData.message}
          onChange={handleChange}
          placeholder="Message" 
          className="w-full px-4 py-3 bg-gray-50 border-none focus:ring-2 focus:ring-green-700 outline-none text-sm resize-none"
        ></textarea>
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-[var(--primary)] text-white font-medium py-4 disabled:opacity-50 hover:bg-[#223a1a] transition-colors mt-4"
      >
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
