'use server'

import { getUserDetailsService } from '@/data/services/users'
import { UserEditForm } from './_components/user-edit-form'
import { H1 } from '@/app/demo/_components/components/custom/headers'

interface UsersEditProps {
	params: { id: number }
	roles: Array<string>
}

const user = {
	last_name: 'Иванов',
	first_name: 'Иван',
	middle_name: 'Иванович',
	username: 'username',
	is_superuser: false,
	is_trainer: false,
	avatar: undefined,
	id: 1,
	birth_date: '2000-06-12',
}

async function UsersEdit({ params }: UsersEditProps) {
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

export default UsersEdit
