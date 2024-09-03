'use server'

import { deleteNewsDetailsService } from '@/data/services/news'
import { redirect } from 'next/navigation'

export async function deleteNewsAction(slug: string) {
	const responseData = await deleteNewsDetailsService(slug)

	redirect('/news/')
}
