import { createClient } from '@/utils/supabase/server'
import { FAQForm } from '@/components/admin/FAQForm'
import { notFound } from 'next/navigation'

export default async function EditFAQPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: faq } = await supabase
    .from('faqs')
    .select('*')
    .eq('id', id)
    .single()

  if (!faq) {
    notFound()
  }

  return <FAQForm initialData={faq} />
}
