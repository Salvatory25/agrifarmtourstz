import { createClient } from '@/utils/supabase/server'
import { Star } from 'lucide-react'

export default async function TestimonialsPage() {
  const supabase = await createClient()
  const { data: testimonials } = await supabase
    .from('testimonials')
    .select('*, experiences(name)')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold text-[var(--foreground)]">Testimonials</h1>
        <p className="text-[var(--muted-foreground)]">Customer reviews and ratings.</p>
      </div>

      {!testimonials || testimonials.length === 0 ? (
        <div className="bg-white rounded-xl border border-[var(--border)] p-12 text-center">
          <Star className="w-10 h-10 text-gray-200 mx-auto mb-3" />
          <p className="text-gray-400">No testimonials yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white rounded-xl border border-[var(--border)] p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={'w-4 h-4 ' + (i < (t.rating || 0) ? 'text-[var(--accent)] fill-[var(--accent)]' : 'text-gray-200')} />
                  ))}
                </div>
                <span className={'inline-flex px-2 py-0.5 rounded-full text-xs font-medium ' + (t.is_published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800')}>
                  {t.is_published ? 'Published' : 'Hidden'}
                </span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-4">"{t.review}"</p>
              <div className="border-t border-gray-100 pt-3">
                <p className="font-medium text-gray-900 text-sm">{t.customer_name}</p>
                <p className="text-xs text-gray-400">{t.country}{t.experiences?.name ? ' · ' + t.experiences.name : ''}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
