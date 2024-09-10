'use server'

import { redirect } from 'next/navigation'
import { deleteGroupDetailsService } from '@/data/services/groups-base'

export async function deleteGroupAction(slug: string) {
	const responseData = await deleteGroupDetailsService(slug)

	redirect('/groups/')
}
