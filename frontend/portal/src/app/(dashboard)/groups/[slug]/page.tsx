'use server'

import { H1 } from '@/components/custom/headers'
import { getTrainersGroupDetailsService } from '@/data/services/groups-trainers'
import { GroupEditForm } from './_components/group-edit-form'
import { getUsersService } from '@/data/services/users'
import { withAuth } from '@/hocs/'
import { notFound } from 'next/navigation'

interface GroupEditProps {
	params: { slug: string }
	roles?: Array<string>
}

async function GroupEdit({ params, roles }: GroupEditProps) {
	const data = await getTrainersGroupDetailsService(params.slug)

	if (data.detail) {
		notFound()
	}

	const users = await getUsersService()

	return (
		<div className='h-full w-full flex flex-col gap-10'>
			<div className='h-fit w-full bg-white px-10 lg:px-10 py-10 shadow-md flex flex-col gap-10'>
				<H1>Редактировать группу</H1>
			</div>
			<div className='w-full px-10 lg:px-20'>
				<div className='w-full max-w-screen-xl mx-auto flex flex-col gap-5'>
					<GroupEditForm group={data} users={users} />
				</div>
			</div>
		</div>
	)
}

export default withAuth(GroupEdit, ['admin'], true)
