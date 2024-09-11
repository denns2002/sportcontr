'use client'

import { DefaultButton } from '@/app/demo/_components/components/custom/buttons'
import { ButtonLink } from '@/app/demo/_components/components/custom/links'
import { FormElementWrapper } from '@/app/demo/_components/components/form-elements'
import { Dropdown } from '@/app/demo/_components/custom/dropdown'
import { FormElementAttributes } from '@/app/demo/_interfaces/forms'
import { Group } from '@/app/demo/_interfaces/groups'
import { User } from '@/app/demo/_interfaces/users'
import { getUserAge } from '@/lib/dates'
import { ArrowLeft, FilePenLine, Plus, Trash2, X } from 'lucide-react'
import { useState } from 'react'

interface GroupEditFormProps {
	group: Group
	users: Array<User>
}

export function GroupEditForm({ group, users }: GroupEditFormProps) {
	type groupKeys = keyof typeof group

	const [addedMembersIds, setAddedMembersIds] = useState(group.members)
	const [usersIds, setUsersIds] = useState<Array<number>>(
		users
			?.filter((users) => !addedMembersIds?.includes(users?.id!) && !users?.is_trainer)
			.map((users) => users?.id!)
	)
	const [trainersIds, setTrainersIds] = useState<Array<number>>(group.trainers)

	const elements: FormElementAttributes[] = [
		{
			name: 'name',
			type: 'text',
			label: 'Название',
			placeholder: 'Название',
			required: true,
			element: 'input',
			id: 'name',
		},
		{
			name: 'description',
			type: 'text',
			label: 'Описание',
			placeholder: 'Группа школы по самому популярному в мире спорту...',
			required: false,
			element: 'textarea',
			id: 'description',
		},
	]

	return (
		<form className='w-full flex flex-col gap-5'>
			<div className='w-full flex flex-col gap-5'>
				{elements.map((attributes, index) => (
					<div className='w-full bg-white p-5 shadow-md' key={index}>
						<FormElementWrapper
							attributes={attributes}
							value={group[attributes.name as groupKeys] as string}
						/>
					</div>
				))}
			</div>
			<Dropdown label='Добавленные участники'>
				<div className='w-full flex flex-col'>
					{addedMembersIds.length > 0 ? (
						users.map((user, index) => {
							if (user.is_trainer || usersIds.includes(user?.id!)) {
								return null
							}

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
			<Dropdown label='Добавить в состав'>
				<div className='w-full flex flex-col'>
					{usersIds.length > 0 ? (
						users.map((user, index) => {
							if (user.is_trainer || addedMembersIds.includes(user?.id!)) {
								return null
							}

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
						<span className='p-5'>Больше некого добавлять...</span>
					)}
				</div>
			</Dropdown>
			<Dropdown label='Назначить тренера'>
				<div className='w-full flex flex-col'>
					{users
						.filter((user) => user.is_trainer)
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
									{trainersIds.includes(user.id!) ? (
										<DefaultButton
											color='error'
											type='button'
											full={false}
											handler={() => {
												setTrainersIds((prev: Array<number>) => {
													let newMembers = [...prev.filter((e) => e !== user.id)]

													return newMembers
												})
											}}
											size='small'
										>
											<X className='h-5 w-5' />
										</DefaultButton>
									) : (
										<DefaultButton
											type='button'
											full={false}
											handler={() => {
												setTrainersIds((prev: Array<number>) => {
													let newMembers = [...prev]

													newMembers.push(user?.id!)

													return newMembers
												})
											}}
											size='small'
										>
											<Plus className='h-5 w-5' />
										</DefaultButton>
									)}
								</div>
							)
						})}
				</div>
			</Dropdown>
			<div className='w-full flex flex-row flex-wrap gap-y-5 gap-x-10'>
				<ButtonLink href='/demo/groups/' color='gray'>
					<>
						<ArrowLeft className='h-5 w-5' />
						<span>Вернуться</span>
					</>
				</ButtonLink>
				<div className='flex-1' />
				<DefaultButton disabled type='submit' full={false}>
					<>
						<FilePenLine className='h-5 w-5' />
						<span>Сохранить</span>
					</>
				</DefaultButton>
				<DefaultButton color='error' type='button' full={false} disabled>
					<>
						<Trash2 className='h-5 w-5' />
						<span>Удалить</span>
					</>
				</DefaultButton>
			</div>
		</form>
	)
}
