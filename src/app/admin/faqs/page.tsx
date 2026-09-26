import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { Plus, Edit, HelpCircle } from 'lucide-react'

export default async function FAQsPage() {
  const supabase = await createClient()
  const { data: faqs } = await supabase.from('faqs').select('*').order('display_order', { ascending: true })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[var(--foreground)]">FAQs</h1>
          <p className="text-[var(--muted-foreground)]">Frequently asked questions shown to visitors.</p>
        </div>
        <Link href="/admin/faqs/new" className="inline-flex items-center bg-[var(--primary)] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#223a1a] transition-colors">
          <Plus className="w-4 h-4 mr-2" />Add FAQ
        </Link>
      </div>

      {!faqs || faqs.length === 0 ? (
        <div className="bg-white rounded-xl border border-[var(--border)] p-12 text-center">
          <HelpCircle className="w-10 h-10 text-gray-200 mx-auto mb-3" />
          <p className="text-gray-400">No FAQs yet. Add your first one.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={faq.id} className="bg-white rounded-xl border border-[var(--border)] p-6 shadow-sm flex items-start justify-between gap-4">
              <div className="flex items-start gap-4 flex-1">
                <span className="w-7 h-7 bg-[var(--muted)] rounded-full flex items-center justify-center text-xs font-bold text-[var(--primary)] flex-shrink-0 mt-0.5">{i + 1}</span>
                <div>
                  <p className="font-medium text-gray-900 mb-1.5">{faq.question}</p>
                  <p className="text-sm text-gray-500 line-clamp-2">{faq.answer}</p>
                  {faq.category && <span className="inline-block mt-2 text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{faq.category}</span>}
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className={'text-xs px-2 py-0.5 rounded-full ' + (faq.is_published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700')}>
                  {faq.is_published ? 'Published' : 'Hidden'}
                </span>
                <Link href={`/admin/faqs/${faq.id}/edit`} className="text-gray-400 hover:text-blue-600"><Edit className="w-4 h-4" /></Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
