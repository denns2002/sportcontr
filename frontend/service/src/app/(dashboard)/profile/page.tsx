'use server'

import { DefaultButton } from '@/components/custom/buttons'
import { ButtonLink } from '@/components/custom/links'
import { signoutAction } from '@/data/actions/auth'
import { verifyUserService } from '@/data/services/auth'
import { parseDate } from '@/lib/dates'
import { LockKeyhole, LogOut, SlidersVertical, UserRound } from 'lucide-react'

async function Profile() {
	const { data } = await verifyUserService()

	return (
		<div className='h-full w-full mx-auto max-w-screen-lg flex flex-col'>
			<div className='w-full relative flex flex-col items-center mt-20'>
				<div className='h-40 w-40 absolute -top-20 rounded-full bg-gray-500 p-1 drop-shadow-md flex items-center justify-center'>
					<UserRound className='h-36 w-36 text-white' />
				</div>
				<div className='w-full bg-white rounded-lg shadow-md px-10 pb-5 pt-28 flex flex-col gap-10'>
					<div className='w-full flex flex-row gap-y-5 flex-wrap'>
						<div className='flex flex-col gap-5 flex-1 min-w-52'>
							<div className='flex flex-col gap-2'>
								<span className='text-2xl font-semibold'>Фамилия:</span>
								<span className='text-lg text-gray-500'>{data?.last_name}</span>
							</div>
							<div className='flex flex-col gap-2'>
								<span className='text-2xl font-semibold'>Имя:</span>
								<span className='text-lg text-gray-500'>{data?.first_name}</span>
							</div>
							<div className='flex flex-col gap-2'>
								<span className='text-2xl font-semibold'>Имя профиля:</span>
								<span className='text-lg text-gray-500'>{data?.username}</span>
							</div>
						</div>
						<div className='flex flex-col gap-5 flex-1 min-w-52'>
							<div className='flex flex-col gap-2'>
								<span className='text-2xl font-semibold'>Профиль создан:</span>
								<span className='text-lg text-gray-500'>{parseDate(data?.created_at)}</span>
							</div>
							<div className='flex flex-col gap-2'>
								<span className='text-2xl font-semibold'>Почта:</span>
								<span className='text-lg text-gray-500'>{data?.email}</span>
							</div>
							<div className='flex flex-col gap-2'>
								<span className='text-2xl font-semibold'>Номер телефона:</span>
								<span className='text-lg text-gray-500'>{data?.userphonenumber_set[0].telephone}</span>
							</div>
						</div>
					</div>
					<div className='flex flex-row gap-10 flex-wrap gap-y-5'>
						<ButtonLink href='/profile/edit' color='blue'>
							<>
								<SlidersVertical />
								<span>ИЗМЕНИТЬ ДАННЫЕ</span>
							</>
						</ButtonLink>
						<ButtonLink href='/profile/change-password'>
							<>
								<LockKeyhole />
								<span>ИЗМЕНИТЬ ПАРОЛЬ</span>
							</>
						</ButtonLink>
						<div className='flex-1' />
						<DefaultButton color='red' type='button' full={false} handler={signoutAction}>
							<>
								<LogOut />
								<span>ВЫЙТИ</span>
							</>
						</DefaultButton>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Profile
