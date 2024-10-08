'use client'

import { Dropdown } from '@/app/_components/custom/dropdown'
import { DefaultButton, TransparentButton } from '@/components/custom/buttons'
import { ButtonLink } from '@/components/custom/links'
import { FormElementWrapper } from '@/components/form-elements'
import { createGroupAction } from '@/data/actions/groups-base'
import { createTrainerGroupAction } from '@/data/actions/groups-trainer'
import { FormElementAttributes } from '@/interfaces/forms'
import { User } from '@/interfaces/users'
import { getUserAge } from '@/lib/dates'
import { ArrowLeft, FilePlus2, Plus, X } from 'lucide-react'
import { useState } from 'react'
import { useFormState } from 'react-dom'

interface GroupCreateFormProps {
	users: Array<User>
}

export function GroupCreateForm({ users }: GroupCreateFormProps) {
	const INITIAL_STATE = {
		data: null,
		validationErrors: {},
		requestError: null,
	}

	const [addedMembersIds, setAddedMembersIds] = useState<Array<number>>([])
	const [usersIds, setUsersIds] = useState<Array<number>>(users.map((user) => user?.id!))
	const [trainersIds, setTrainersIds] = useState<Array<number>>([])

	const [formState, formAction] = useFormState(
		createGroupAction.bind(null, addedMembersIds, trainersIds),
		INITIAL_STATE
	)

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
		<form action={formAction} className='w-full flex flex-col gap-5'>
			<div className='w-full flex flex-col gap-5'>
				{elements.map((attributes, index) => (
					<div className='w-full bg-white p-5 shadow-md' key={index}>
						<FormElementWrapper
							attributes={attributes}
							errors={formState?.validationErrors[attributes.name]}
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
				<ButtonLink href='/groups/' color='gray'>
					<>
						<ArrowLeft className='h-5 w-5' />
						<span>Вернуться</span>
					</>
				</ButtonLink>
				<div className='flex-1' />
				<DefaultButton type='submit' full={false}>
					<>
						<FilePlus2 className='h-5 w-5' />
						<span>Создать</span>
					</>
				</DefaultButton>
			</div>
		</form>
	)
}
