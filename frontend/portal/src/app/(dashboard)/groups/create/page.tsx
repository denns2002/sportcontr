'use server'

import { H1 } from '@/components/custom/headers'
import { getUsersService } from '@/data/services/users'
import { GroupCreateForm } from './_components/group-create-form'
import { withAuth } from '@/hocs/'

interface GroupCreateProps {
	roles: Array<string>
}

async function GroupCreate({ roles }: GroupCreateProps) {
	const members = await getUsersService()

	console.log(members);
	

	return (
		<div className='h-full w-full flex justify-center'>
			<div className='w-full max-w-screen-xl mx-auto'>
				<H1>Создать группу</H1>
				<GroupCreateForm members={members} />
			</div>
		</div>
	)
}

export default withAuth(GroupCreate, ['admin', 'trainer'], true)
