'use server'

import { H1 } from '@/components/custom/headers'
import { getUserDetailsService } from '@/data/services/users'
import { withAuth } from '@/hocs'
import { UserEditForm } from './_components/user-edit-form'

interface UsersEditProps {
	params: { id: number }
	roles: Array<string>
}

async function UsersEdit({ params }: UsersEditProps) {
	const user = await getUserDetailsService(params.id)

	return (
		<div className='h-full w-full flex flex-col gap-10'>
			<div className='h-fit w-full bg-white px-10 lg:px-10 py-10 shadow-md flex flex-col gap-10'>
				<H1>Редактировать пользователя</H1>
			</div>
			<div className='w-full px-10 lg:px-20'>
				<div className='w-full max-w-screen-xl mx-auto flex flex-col gap-5'>
					<UserEditForm user={user} />
				</div>
			</div>
		</div>
	)
}

export default withAuth(UsersEdit, ['admin'], true)
