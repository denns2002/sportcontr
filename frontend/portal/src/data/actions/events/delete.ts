'use server'

import { deleteEventDetailsService } from '@/data/services/events'
import { redirect } from 'next/navigation'

export async function deleteEventAction(slug: string) {
	const responseData = await deleteEventDetailsService(slug)

	redirect('/events/')
}
