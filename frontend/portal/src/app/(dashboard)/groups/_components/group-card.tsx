'use client'

import { ButtonLink } from '@/components/custom/links'
import { Group } from '@/interfaces/groups'
import { AlignLeft, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { User } from '@/interfaces/users'
import { TransparentButton } from '@/components/custom/buttons'

interface GroupCardProps {
	group: Group
	members: Array<User>
}

export function GroupCard({ group, members }: GroupCardProps) {
	const [isActive, setIsActive] = useState(false)

	return (
		<div>
			<div
				className='flex flex-row flex-wrap justify-around gap-5 bg-white shadow-md p-5 items-center'
			>
				<span className='text-lg font-medium'>{group.name}</span>
				<span className='text-base text-gray-500'>{group.members.length} участников</span>
				<div className='flex-1' />
				<div className='flex flex-row gap-5 justify-between'>
					<ButtonLink href={`/groups/${group.slug}/`}>
						<>
							<AlignLeft />
							<span>Редактировать</span>
						</>
					</ButtonLink>
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
							<div className='flex flex-row gap-2 p-5' key={index}>
								<span>{member.last_name}</span>
								<span>{member.first_name}</span>
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
