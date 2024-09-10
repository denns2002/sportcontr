'use server'

import { H1 } from '@/components/custom/headers'
import { getUsersService } from '@/data/services/users'
import { withAuth } from '@/hocs'
import { UserCard } from './_components/user-card'
import { User } from '@/interfaces/users'
import { ButtonLink } from '@/components/custom/links'
import { UserPlus } from 'lucide-react'

async function Users() {
	const users = (await getUsersService()) as Array<User>

	return (
		<div className='h-full w-full flex flex-col gap-10'>
			<div className='h-fit w-full bg-white px-10 lg:px-10 py-10 shadow-md flex flex-col gap-10'>
				<H1>Пользователи</H1>
				<div className='flex'>
					<ButtonLink href='/users/create/'>
						<>
							<UserPlus className='h-5 w-5' />
							Добавить пользователя
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

export default withAuth(Users, ['admin'], true)
