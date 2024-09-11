import { ButtonLink } from '@/app/demo/_components/components/custom/links'
import { User as UserType } from '@/app/demo/_interfaces/users'
import { FileText, User } from 'lucide-react'
import Image from 'next/image'

interface UserCardProps {
	user: UserType
}

export function UserCard({ user }: UserCardProps) {
	return (
		<div className='w-full bg-white flex flex-row flex-wrap gap-5 p-5 shadow-md'>
			{user.avatar ? (
				<Image
					src={user.avatar}
					width={100}
					height={100}
					alt='avatar'
					className='object-cover h-[3.25rem] w-[3.25rem]'
				/>
			) : (
				<div className='bg-gray-400 p-1 text-white'>
					<User className='h-11 w-11' />
				</div>
			)}
			<div className='flex justify-center items-center text-lg font-medium gap-2 flex-1'>
				<span>{user.last_name}</span>
				<span>{user.first_name}</span>
				<span>{user.middle_name}</span>
			</div>
			<div className='flex gap-5 justify-center items-center flex-1'>
				<span className='text-lg font-medium'>{user.username}</span>
			</div>
			<ButtonLink href={`/demo/users/${user.id}/`}>
				<>
					<FileText className='h-5 w-5' />
					<span>Редактировать</span>
				</>
			</ButtonLink>
		</div>
	)
}
