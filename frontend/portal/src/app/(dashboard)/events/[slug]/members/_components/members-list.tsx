'use client'

import { Dropdown } from '@/app/_components/custom/dropdown'
import { Group } from '@/interfaces/groups'
import { User } from '@/interfaces/users'
import { getUserAge } from '@/lib/dates'
import { useState } from 'react'

interface MembersListProps {
	groups: Array<Group>
	members: Array<User>
}

export function MembersList({ groups, members }: MembersListProps) {
	const [activeGroup, setActiveGroup] = useState(groups?.[0])
	const [groupMembers, setGroupMembers] = useState<Array<User>>(
		members.filter((member) => activeGroup.members.includes(member.id!))
	)

	return (
		<div className='flex flex-col gap-5'>
			<Dropdown label='Выбирите группу'>
				<div className='flex flex-row flex-wrap gap-2 p-5'>
					{groups.map((group, index) => (
						<div
							key={index}
							className={`p-2 border-2 ${
								activeGroup.slug === group.slug
									? 'border-primary bg-primary text-white'
									: 'border-primary hover:border-hover hover:bg-hover hover:text-active transition-all duration-300'
							}`}
							onClick={() => {
								setActiveGroup(group)
								setGroupMembers(members.filter((member) => group?.members.includes(member.id || 0)))
							}}
						>
							{group.name}
						</div>
					))}
				</div>
			</Dropdown>
			<Dropdown label='Список участников'>
				<div className='flex flex-col'>
					{groupMembers.length > 0 ? (
						groupMembers.map((member, index) => {
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
						<span className='p-5'>Список участников пуст...</span>
					)}
				</div>
			</Dropdown>
		</div>
	)
}
