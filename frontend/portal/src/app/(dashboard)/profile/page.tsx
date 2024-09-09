'use server'

import { verifyUserService } from '@/data/services/auth'
import { signoutAction } from '@/data/actions/auth'
import { Camera, LockKeyhole, LogOut, SlidersVertical, User } from 'lucide-react'
import { getUserAge, parseDate } from '@/lib/dates'
import { ButtonLink } from '@/components/custom/links'
import { DefaultButton } from '@/components/custom/buttons'
import Image from 'next/image'
import { withAuth } from '@/hocs'

async function Profile() {
	const { data } = await verifyUserService()

	return (
		<div className='h-full w-full flex flex-col gap-5 justify-center'>
			<div className='w-full max-w-screen-xl mx-auto flex flex-col gap-5'>
				<div className='w-full my-auto mx-auto bg-white shadow-md flex flex-row items-center flex-wrap gap-5'>
					<div className='h-[20rem] w-full md:w-fit flex justify-center items-center'>
						{data.avatar ? (
							<Image
								src={data.avatar}
								alt='avatar'
								width={1000}
								height={1000}
								className='object-cover h-[20rem] w-[15rem]'
							/>
						) : (
							<div className='flex justify-center items-center bg-gray-500 h-[20rem] w-[15rem]'>
								<Camera className='h-20 w-20 text-white' />
							</div>
						)}
					</div>
					<div className='flex flex-1 flex-row flex-wrap gap-5 p-5'>
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
								<span className='text-xl font-semibold'>Возраст:</span>
								<span className='text-base text-gray-500'>{`${getUserAge(
									data?.birth_date
								)} лет, (${parseDate(data?.birth_date)})`}</span>
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
				</div>
				<div className='flex flex-row gap-10 flex-wrap gap-y-5'>
					<ButtonLink href='/profile/edit/'>
						<>
							<SlidersVertical className='h-5 w-5' />
							<span>Редактировать</span>
						</>
					</ButtonLink>
					<ButtonLink href='/profile/change-password/' color='gray'>
						<>
							<LockKeyhole className='h-5 w-5' />
							<span>Изменить пароль</span>
						</>
					</ButtonLink>
					<div className='flex-1' />
					<DefaultButton color='error' type='button' full={false} handler={signoutAction}>
						<>
							<LogOut className='h-5 w-5' />
							<span>Выйти</span>
						</>
					</DefaultButton>
				</div>
			</div>
		</div>
	)
}

export default withAuth(Profile, ['admin', 'trainer', 'sportsman'], true)
