'use server'

import { H1 } from '@/components/custom/headers'
import { getTrainersGroupDetailsService } from '@/data/services/groups-trainers'
import { getUsersService } from '@/data/services/users'
import { GroupCreateForm } from './_components/group-create-form'

async function GroupCreate() {
	const members = await getUsersService()

	return (
		<div className='h-full w-full flex justify-center'>
			<div className='w-full max-w-screen-xl mx-auto'>
				<H1>Создать группу</H1>
				<GroupCreateForm members={members} />
			</div>
		</div>
	)
}

export default GroupCreate
