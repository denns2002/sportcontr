'use server'

import { H1 } from '@/components/custom/headers'
import { getTrainersGroupDetailsService } from '@/data/services/groups-trainers'
import { GroupEditForm } from './_components/group-edit-form'
import { getUsersService } from '@/data/services/users'

interface GroupEditProps {
	params: { slug: string }
}

async function GroupEdit({ params }: GroupEditProps) {
	const data = await getTrainersGroupDetailsService(params.slug)

	const members = await getUsersService()

	return (
		<div className='h-full w-full flex justify-center'>
			<div className='w-full max-w-screen-xl mx-auto'>
				<H1>Редактировать группу</H1>
				<GroupEditForm group={data} members={members} />
			</div>
		</div>
	)
}

export default GroupEdit
