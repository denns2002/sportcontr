'use server'

import { H1 } from '@/app/demo/_components/components/custom/headers'
import { GroupCreateForm } from './_components/group-create-form'

async function GroupCreate() {
	const users = [
		{
			last_name: 'Иванов',
			first_name: 'Иван',
			middle_name: 'Иванович',
			username: 'username',
			is_superuser: false,
			is_trainer: false,
			avatar: undefined,
			id: 0,
			birth_date: '2000-06-12',
		},
		{
			last_name: 'Иванов',
			first_name: 'Иван',
			middle_name: 'Иванович',
			username: 'username',
			is_superuser: false,
			is_trainer: false,
			avatar: undefined,
			id: 1,
			birth_date: '2000-06-12',
		},
		{
			last_name: 'Иванов',
			first_name: 'Иван',
			middle_name: 'Иванович',
			username: 'username',
			is_superuser: false,
			is_trainer: false,
			avatar: undefined,
			id: 2,
			birth_date: '2000-06-12',
		},
		{
			last_name: 'Иванов',
			first_name: 'Иван',
			middle_name: 'Иванович',
			username: 'username',
			is_superuser: false,
			is_trainer: false,
			avatar: undefined,
			id: 3,
			birth_date: '2000-06-12',
		},
		{
			last_name: 'Иванов',
			first_name: 'Иван',
			middle_name: 'Иванович',
			username: 'username',
			is_superuser: false,
			is_trainer: false,
			avatar: undefined,
			id: 4,
			birth_date: '2000-06-12',
		},
		{
			last_name: 'Иванов',
			first_name: 'Иван',
			middle_name: 'Иванович',
			username: 'username',
			is_superuser: false,
			is_trainer: false,
			avatar: undefined,
			id: 5,
			birth_date: '2000-06-12',
		},
		{
			last_name: 'Иванов',
			first_name: 'Иван',
			middle_name: 'Иванович',
			username: 'username',
			is_superuser: false,
			is_trainer: false,
			avatar: undefined,
			id: 6,
			birth_date: '2000-06-12',
		},
		{
			last_name: 'Иванов',
			first_name: 'Иван',
			middle_name: 'Иванович',
			username: 'username',
			is_superuser: false,
			is_trainer: false,
			avatar: undefined,
			id: 7,
			birth_date: '2000-06-12',
		},
		{
			last_name: 'Иванов',
			first_name: 'Иван',
			middle_name: 'Иванович',
			username: 'username',
			is_superuser: false,
			is_trainer: false,
			avatar: undefined,
			id: 8,
			birth_date: '2000-06-12',
		},
		{
			last_name: 'Иванов',
			first_name: 'Иван',
			middle_name: 'Иванович',
			username: 'username',
			is_superuser: false,
			is_trainer: false,
			avatar: undefined,
			id: 9,
			birth_date: '2000-06-12',
		},
		{
			last_name: 'Михайлов',
			first_name: 'Михаил',
			middle_name: 'Михайлович',
			username: 'username',
			is_superuser: false,
			is_trainer: true,
			avatar: undefined,
			id: 10,
			birth_date: '2000-06-12',
		},
	]

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

export default GroupCreate
