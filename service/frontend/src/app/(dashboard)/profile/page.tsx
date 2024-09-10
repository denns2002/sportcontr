'use server'

import { DefaultButton } from '@/components/custom/buttons'
import { ButtonLink } from '@/components/custom/links'
import { signoutAction } from '@/data/actions/auth'
import { verifyUserService } from '@/data/services/auth'
import { LockKeyhole, LogOut, SlidersVertical, UserRound } from 'lucide-react'
import Image from 'next/image'

async function Profile() {
	const { data } = await verifyUserService()

	return (
		<div className='h-full w-full mx-auto max-w-screen-lg flex flex-col'>
			<div className='w-full relative flex flex-col items-center mt-20'>
				{data?.avatar ? (
					<Image
						src={data?.avatar}
						alt='avatar'
						width={500}
						height={500}
						className='object-cover h-40 w-40 absolute -top-20 rounded-full  drop-shadow-md'
					/>
				) : (
					<div className='h-40 w-40 absolute -top-20 rounded-full bg-gray-500 p-1 drop-shadow-md flex items-center justify-center'>
						<UserRound className='h-36 w-36 text-white' />
					</div>
				)}
				<div className='w-full bg-white rounded-lg shadow-md px-10 pb-5 pt-28 flex flex-col gap-10'>
					<div className='w-full flex flex-row gap-y-5 flex-wrap'>
						<div className='flex flex-col gap-5 flex-1 min-w-52'>
							<div className='flex flex-col gap-2'>
								<span className='text-xl font-semibold'>Фамилия:</span>
								<span className='text-base text-gray-500'>{data?.last_name}</span>
							</div>
							<div className='flex flex-col gap-2'>
								<span className='text-xl font-semibold'>Имя:</span>
								<span className='text-base text-gray-500'>{data?.first_name}</span>
							</div>
							<div className='flex flex-col gap-2'>
								<span className='text-xl font-semibold'>Отчество:</span>
								<span className='text-base text-gray-500'>{data?.middle_name}</span>
							</div>
						</div>
						<div className='flex flex-col gap-5 flex-1 min-w-52'>
							<div className='flex flex-col gap-2'>
								<span className='text-xl font-semibold'>Имя пользователя:</span>
								<span className='text-base text-gray-500'>{data?.username}</span>
							</div>
							<div className='flex flex-col gap-2'>
								<span className='text-xl font-semibold'>Почта:</span>
								<span className='text-base text-gray-500'>{data?.email}</span>
							</div>
							<div className='flex flex-col gap-2'>
								<span className='text-xl font-semibold'>Номер телефона:</span>
								<span className='text-base text-gray-500'>
									{data?.userphonenumber_set[0]?.telephone || (
										<span className='text-red-500'>Нет телефона</span>
									)}
								</span>
							</div>
						</div>
					</div>
					<div className='flex flex-row gap-10 flex-wrap gap-y-5'>
						<ButtonLink href='/profile/edit' color='blue'>
							<>
								<SlidersVertical className='h-5 w-5' />
								<span>Редактировать</span>
							</>
						</ButtonLink>
						<ButtonLink href='/profile/change-password'>
							<>
								<LockKeyhole className='h-5 w-5' />
								<span>Изменить пароль</span>
							</>
						</ButtonLink>
						<div className='flex-1' />
						<DefaultButton color='red' type='button' full={false} handler={signoutAction}>
							<>
								<LogOut className='h-5 w-5' />
								<span>Выйти</span>
							</>
						</DefaultButton>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Profile
