'use client'

import { Dropdown } from '@/app/_components/custom/dropdown'
import { DefaultButton } from '@/components/custom/buttons'
import { ButtonLink } from '@/components/custom/links'
import { editEventMembersAction } from '@/data/actions/events'
import { Event } from '@/interfaces/events'
import { Group } from '@/interfaces/groups'
import { User } from '@/interfaces/users'
import { getUserAge } from '@/lib/dates'
import { ArrowLeft, ChevronDown, FilePenLine, Plus, X } from 'lucide-react'
import { useState } from 'react'
import { useFormState } from 'react-dom'

interface EventMembersEditFormProps {
	groups: Array<Group>
	event: Event
	users: Array<User>
}

export function EventMembersEditForm({ groups, event, users }: EventMembersEditFormProps) {
	const INITIAL_STATE = {
		data: event.members,
		validationErrors: {},
		requestError: null,
	}

	const [activeGroup, setActiveGroup] = useState(groups?.[0])

	const [addedMembersIds, setAddedMembersIds] = useState<Array<number>>(event.members!)
	const [usersIds, setUsersIds] = useState<Array<number>>(
		activeGroup.members.filter((member) => !event.members?.includes(member))
	)

	const [formState, formAction] = useFormState(
		editEventMembersAction.bind(null, event.slug!, addedMembersIds),
		INITIAL_STATE
	)

	return (
		<form action={formAction} className='w-full flex flex-col gap-5'>
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
								setUsersIds(group.members)
							}}
						>
							{group.name}
						</div>
					))}
				</div>
			</Dropdown>
			<Dropdown label='Заявленный состав'>
				<div className='w-full flex flex-col'>
					{addedMembersIds.length > 0 ? (
						users
							.filter(
								(user) =>
									activeGroup.members.includes(user.id!) && addedMembersIds.includes(user.id!)
							)
							.map((user, index) => {
								return (
									<div
										className='w-full flex flex-row items-center p-5 hover:bg-hover hover:text-active transition-all duration-300'
										key={index}
									>
										<div className='flex flex-row flex-wrap gap-2'>
											<span>{user.last_name}</span>
											<span>{user.first_name}</span>
											<span>{user.middle_name},</span>
											<span>{getUserAge(user.birth_date!)}</span>
											<span>лет</span>
										</div>
										<div className='flex-1' />
										<DefaultButton
											color='error'
											type='button'
											full={false}
											handler={() => {
												setAddedMembersIds((prev: Array<number>) => {
													let newMembers = [...prev.filter((e) => e !== user.id)]

													return newMembers
												})

												setUsersIds((prev: Array<number>) => {
													let newMembers = [...prev]

													newMembers.push(user?.id!)

													return newMembers
												})
											}}
											size='small'
										>
											<X className='h-5 w-5' />
										</DefaultButton>
									</div>
								)
							})
					) : (
						<span className='p-5'>Состав группы будет пустым...</span>
					)}
				</div>
			</Dropdown>
			<Dropdown label='Заявить участников' defaultState={false}>
				<div className='w-full flex flex-col'>
					{usersIds.length > 0 ? (
						users
							.filter(
								(user) =>
									activeGroup.members.includes(user.id!) && !addedMembersIds.includes(user.id!)
							)
							.map((user, index) => {
								return (
									<div
										className='w-full flex flex-row items-center p-5 hover:bg-hover hover:text-active transition-all duration-300'
										key={index}
									>
										<div className='flex flex-row flex-wrap gap-2'>
											<span>{user.last_name}</span>
											<span>{user.first_name}</span>
											<span>{user.middle_name},</span>
											<span>{getUserAge(user.birth_date!)}</span>
											<span>лет</span>
										</div>
										<div className='flex-1' />
										<DefaultButton
											type='button'
											full={false}
											handler={() => {
												setAddedMembersIds((prev: Array<number>) => {
													let newMembers = [...prev]

													newMembers.push(user?.id!)

													return newMembers
												})

												setUsersIds((prev: Array<number>) => {
													let newMembers = [...prev.filter((e) => e !== user.id)]

													return newMembers
												})
											}}
											size='small'
										>
											<Plus className='h-5 w-5' />
										</DefaultButton>
									</div>
								)
							})
					) : (
						<div className='p-5'>Больше некого добавлять...</div>
					)}
				</div>
			</Dropdown>
			<div className='flex flex-row flex-wrap gap-5 '>
				<ButtonLink href={`/events/${event.slug}/members/`} color='gray'>
					<>
						<ArrowLeft className='h-5 w-5' />
						<span>Вернуться</span>
					</>
				</ButtonLink>
				<div className='flex-1' />
				<DefaultButton type='submit' full={false}>
					<>
						<FilePenLine className='h-5 w-5' />
						<span>Сохранить</span>
					</>
				</DefaultButton>
			</div>
		</form>
	)
}
