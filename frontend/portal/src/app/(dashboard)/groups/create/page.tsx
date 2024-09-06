'use server'

import { H1 } from '@/components/custom/headers'
import { getUsersService } from '@/data/services/users'
import { GroupCreateForm } from './_components/group-create-form'
import { withAuth } from '@/hocs/'

interface GroupCreateProps {
	roles: Array<string>
}

async function GroupCreate({ roles }: GroupCreateProps) {
	const users = await getUsersService()

	return (
		<div className='h-full w-full flex flex-col gap-10'>
			<div className='h-fit w-full bg-white px-10 lg:px-10 py-10 shadow-md flex flex-col gap-10'>
				<H1>Создать группу</H1>
			</div>
			<div className='w-full px-10 lg:px-20'>
				<div className='w-full max-w-screen-xl mx-auto flex flex-col gap-5'>
					<GroupCreateForm users={users} />
				</div>
			</div>
		</div>
	)
}

export default withAuth(GroupCreate, ['admin'], true)
