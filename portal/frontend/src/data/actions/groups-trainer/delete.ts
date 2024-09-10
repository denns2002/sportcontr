'use server'

import { redirect } from 'next/navigation'
import { deleteTrainersGroupDetailsService } from '@/data/services/groups-trainers'

export async function deleteTrainerGroupAction(slug: string) {
	const responseData = await deleteTrainersGroupDetailsService(slug)

	redirect('/groups/')
}
