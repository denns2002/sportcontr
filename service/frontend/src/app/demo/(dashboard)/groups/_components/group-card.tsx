'use client'

import { TransparentButton } from '@/app/demo/_components/components/custom/buttons'
import { ButtonLink } from '@/app/demo/_components/components/custom/links'
import { Group } from '@/app/demo/_interfaces/groups'
import { User } from '@/app/demo/_interfaces/users'
import { getUserAge } from '@/lib/dates'
import { AlignLeft, ChevronDown } from 'lucide-react'
import { useState } from 'react'

interface GroupCardProps {
	group: Group
	members: Array<User>
	isEditable: boolean
}

export function GroupCard({ group, members, isEditable }: GroupCardProps) {
	const [isActive, setIsActive] = useState(false)

	return (
		<div>
			<div className='flex flex-row flex-wrap justify-around gap-5 bg-white shadow-md p-5 items-center'>
				<span className='text-lg font-medium'>{group.name}</span>
				<span className='text-base text-gray-500'>{group.members.length} участников</span>
				<div className='flex-1' />
				<div className='flex flex-row gap-5 justify-between'>
					{isEditable ? (
						<ButtonLink href={`/demo/groups/${group.slug}/`}>
							<>
								<AlignLeft />
								<span>Редактировать</span>
							</>
						</ButtonLink>
					) : null}
					<TransparentButton type='button' handler={() => setIsActive((prev) => !prev)}>
						<ChevronDown
							className={`h-5 w-5 ${isActive ? '-rotate-180' : null} transition-all duration-300`}
						/>
					</TransparentButton>
				</div>
			</div>
			<div
				className={`${
					isActive ? null : 'hidden'
				} flex flex-col bg-white shadow-md border-t-2 border-primary`}
			>
				{members.length > 0 ? (
					members.map((member, index) => {
						return (
							<div className='flex flex-row flex-wrap gap-2 p-5' key={index}>
								<span>{member.last_name}</span>
								<span>{member.first_name}</span>
								<span>{member.middle_name},</span>
								<span>{getUserAge(member.birth_date!)}</span>
								<span>лет</span>
							</div>
						)
					})
				) : (
					<span className='p-5'>Состав группы пуст....</span>
				)}
			</div>
		</div>
	)
}
