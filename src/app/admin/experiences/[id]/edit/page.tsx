import { createClient } from '@/utils/supabase/server'
import { ExperienceForm } from '@/components/admin/ExperienceForm'
import { notFound } from 'next/navigation'

export default async function EditExperiencePage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: experience } = await supabase
    .from('experiences')
    .select('*')
    .eq('id', id)
    .single()

  if (!experience) {
    notFound()
  }

  return <ExperienceForm initialData={experience} />
}
