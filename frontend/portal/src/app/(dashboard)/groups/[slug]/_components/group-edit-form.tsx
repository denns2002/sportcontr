'use client'

import { DefaultButton, TransparentButton } from '@/components/custom/buttons'
import { ButtonLink } from '@/components/custom/links'
import { FormElementWrapper } from '@/components/form-elements'
import { deleteTrainerGroupAction, editTrainerGroupAction } from '@/data/actions/groups-trainer'
import { FormElementAttributes } from '@/interfaces/forms'
import { Group } from '@/interfaces/groups'
import { User } from '@/interfaces/users'
import { ArrowLeft, ChevronDown, FilePenLine, Plus, Trash2, X } from 'lucide-react'
import { useState } from 'react'
import { useFormState } from 'react-dom'

interface GroupEditFormProps {
	group: Group
	members: Array<User>
}

export function GroupEditForm({ group, members }: GroupEditFormProps) {
	const INITIAL_STATE = {
		data: group,
		validationErrors: {},
		requestError: null,
	}

	const [isActiveAdded, setIsActiveAdded] = useState(false)
	const [isActiveNew, setIsActiveNew] = useState(false)

	const [addedMembersIds, setAddedMembersIds] = useState(group.members)
	const [usersIds, setUsersIds] = useState<Array<number>>(
		members
			.filter((member) => !addedMembersIds.includes(member.id) && !member.is_trainer)
			.map((member) => member.id)
	)

	const [formState, formAction] = useFormState(
		editTrainerGroupAction.bind(null, group.slug, addedMembersIds),
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
							value={formState.data[attributes.name]}
						/>
					</div>
				))}
			</div>
			<div className='w-full'>
				<div className='w-full bg-white p-5 shadow-md flex flex-row items-center'>
					<div className='font-medium'>Состав группы:</div>
					<div className='flex-1' />
					<div>
						<TransparentButton
							type='button'
							full={false}
							handler={() => setIsActiveAdded((prev) => !prev)}
						>
							<ChevronDown
								className={`h-5 w-5 ${
									isActiveAdded ? '-rotate-180' : null
								} transition-all duration-300`}
							/>
						</TransparentButton>
					</div>
				</div>
				<div
					className={`${
						isActiveAdded ? null : 'hidden'
					} w-full flex flex-col bg-white shadow-md border-t-2 border-primary`}
				>
					{addedMembersIds.length > 0 ? (
						members.map((member, index) => {
							if (member.is_trainer || usersIds.includes(member.id)) {
								return null
							}

							return (
								<div
									className='w-full flex flex-row items-center p-5 hover:bg-hover hover:text-active transition-all duration-300'
									key={index}
								>
									<div className='flex flex-row gap-2'>
										<span>{member.last_name}</span>
										<span>{member.first_name}</span>
									</div>
									<div className='flex-1' />
									<DefaultButton
										color='error'
										type='button'
										full={false}
										handler={() => {
											setAddedMembersIds((prev: Array<number>) => {
												let newMembers = [...prev.filter((e) => e !== member.id)]

												return newMembers
											})

											setUsersIds((prev: Array<number>) => {
												let newMembers = [...prev]

												newMembers.push(member.id)

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
			</div>
			<div className='w-full'>
				<div className='w-full bg-white p-5 shadow-md flex flex-row items-center'>
					<div className='font-medium'>Добавить участников:</div>
					<div className='flex-1' />
					<div>
						<TransparentButton
							type='button'
							full={false}
							handler={() => setIsActiveNew((prev) => !prev)}
						>
							<ChevronDown
								className={`h-5 w-5 ${
									isActiveNew ? '-rotate-180' : null
								} transition-all duration-300`}
							/>
						</TransparentButton>
					</div>
				</div>
				<div
					className={`${
						isActiveNew ? null : 'hidden'
					} w-full flex flex-col bg-white shadow-md border-t-2 border-primary`}
				>
					{usersIds.length > 0 ? (
						members.map((member, index) => {
							if (member.is_trainer || addedMembersIds.includes(member.id)) {
								return null
							}

							return (
								<div
									className='w-full flex flex-row items-center p-5 hover:bg-hover hover:text-active transition-all duration-300'
									key={index}
								>
									<div className='flex flex-row gap-2'>
										<span>{member.last_name}</span>
										<span>{member.first_name}</span>
									</div>
									<div className='flex-1' />
									<DefaultButton
										type='button'
										full={false}
										handler={() => {
											setAddedMembersIds((prev: Array<number>) => {
												let newMembers = [...prev]

												newMembers.push(member.id)

												return newMembers
											})

											setUsersIds((prev: Array<number>) => {
												let newMembers = [...prev.filter((e) => e !== member.id)]

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
			</div>
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
						<FilePenLine className='h-5 w-5' />
						<span>Сохранить</span>
					</>
				</DefaultButton>
				<DefaultButton
					color='error'
					type='button'
					full={false}
					handler={() => {
						deleteTrainerGroupAction(group.slug)
					}}
				>
					<>
						<Trash2 className='h-5 w-5' />
						<span>Удалить</span>
					</>
				</DefaultButton>
			</div>
		</form>
	)
}
