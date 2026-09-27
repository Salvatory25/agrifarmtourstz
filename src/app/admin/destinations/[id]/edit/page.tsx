import { createClient } from '@/utils/supabase/server'
import { DestinationForm } from '@/components/admin/DestinationForm'
import { notFound } from 'next/navigation'

export default async function EditDestinationPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: destination } = await supabase
    .from('destinations')
    .select('*')
    .eq('id', id)
    .single()

  if (!destination) {
    notFound()
  }

  return <DestinationForm initialData={destination} />
}
