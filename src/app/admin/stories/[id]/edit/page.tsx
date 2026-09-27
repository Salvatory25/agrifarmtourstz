import { createClient } from '@/utils/supabase/server'
import { StoryForm } from '@/components/admin/StoryForm'
import { notFound } from 'next/navigation'

export default async function EditStoryPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: story } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single()

  if (!story) {
    notFound()
  }

  return <StoryForm initialData={story} />
}
