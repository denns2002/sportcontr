'use server'

import { redirect } from 'next/navigation'
import { deleteProjectService } from '@/data/services/projects'

export async function deleteProjectAction(slug: string) {
	const responseData = await deleteProjectService(slug)

	redirect('/projects/')
}
