'use server'

import { UserPlus } from 'lucide-react'
import { H1 } from '../../_components/components/custom/headers'
import { ButtonLink } from '../../_components/components/custom/links'
import { UserCard } from './_components/user-card'

const users = [
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
		id: 1,
		birth_date: '2000-06-12',
	},
]

async function Users() {
	return (
		<div className='h-full w-full flex flex-col gap-10'>
			<div className='h-fit w-full bg-white px-10 lg:px-10 py-10 shadow-md flex flex-col gap-10'>
				<H1>Пользователи</H1>
				<div className='flex'>
					<ButtonLink href='/demo/users/create/'>
						<>
							<UserPlus className='h-5 w-5' />
							Добавить пользователей
						</>
					</ButtonLink>
				</div>
			</div>
			<div className='w-full px-10 lg:px-20'>
				<div className='w-full max-w-screen-xl mx-auto flex flex-col gap-5'>
					{users.map((user, index) => (
						<UserCard user={user} key={index} />
					))}
				</div>
			</div>
		</div>
	)
}

export default Users
