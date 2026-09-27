import { createClient } from '@/utils/supabase/server'
import { TestimonialForm } from '@/components/admin/TestimonialForm'
import { notFound } from 'next/navigation'

export default async function EditTestimonialPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: testimonial } = await supabase
    .from('testimonials')
    .select('*')
    .eq('id', id)
    .single()

  if (!testimonial) {
    notFound()
  }

  return <TestimonialForm initialData={testimonial} />
}
