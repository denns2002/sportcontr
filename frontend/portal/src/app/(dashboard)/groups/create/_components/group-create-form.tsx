'use client'

import { DefaultButton } from '@/components/custom/buttons'
import { ButtonLink } from '@/components/custom/links'
import { FormElementWrapper } from '@/components/form-elements'
import { createTrainerGroupAction } from '@/data/actions/groups-trainer'
import { FormElementAttributes } from '@/interfaces/forms'
import { User } from '@/interfaces/users'
import { ArrowLeft, FilePlus2, Plus, X } from 'lucide-react'
import { useState } from 'react'
import { useFormState } from 'react-dom'

interface GroupCreateFormProps {
	members: Array<User>
}

export function GroupCreateForm({ members }: GroupCreateFormProps) {
	const INITIAL_STATE = {
		data: null,
		validationErrors: {},
		requestError: null,
	}

	const [isActive, setIsActive] = useState(false)

	const [membersIds, setMembersIds] = useState<Array<number>>([])

	const [formState, formAction] = useFormState(
		createTrainerGroupAction.bind(null, membersIds),
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
		},
		{
			name: 'description',
			type: 'text',
			label: 'Описание',
			placeholder: 'Группа школы по самому популярному в мире спорту...',
			required: false,
			element: 'textarea',
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
			<div className='w-full'>
				<div
					className='w-full bg-white p-5 shadow-md flex flex-col gap-5 hover:cursor-pointer'
					onClick={() => setIsActive((prev) => !prev)}
				>
					<label className='font-medium'>Состав группы:</label>
				</div>
				<div
					className={`${
						isActive ? null : 'hidden'
					} w-full flex flex-col gap-5 py-5 bg-white shadow-md border-t-2 border-primary`}
				>
					{members.map((member, index) => {
						if (member.is_trainer) {
							return null
						}

						return (
							<div className='w-full flex flex-row items-center px-5 py-2 shadow-md' key={index}>
								<div className='flex flex-row gap-2'>
									<span>{member.last_name}</span>
									<span>{member.first_name}</span>
								</div>
								<div className='flex-1' />
								{membersIds.length > 0 && membersIds?.includes(member.id) ? (
									<DefaultButton
										color='error'
										type='button'
										full={false}
										handler={() =>
											setMembersIds((prev: Array<number>) => {
												let newMembers = [...prev.filter((e) => e !== member.id)]

												return newMembers
											})
										}
										size='small'
									>
										<X className='h-5 w-5' />
									</DefaultButton>
								) : (
									<DefaultButton
										type='button'
										full={false}
										handler={() =>
											setMembersIds((prev: Array<number>) => {
												let newMembers = [...prev]

												newMembers.push(member.id)

												return newMembers
											})
										}
										size='small'
									>
										<Plus className='h-5 w-5' />
									</DefaultButton>
								)}
							</div>
						)
					})}
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
						<FilePlus2 className='h-5 w-5' />
						<span>Создать</span>
					</>
				</DefaultButton>
			</div>
		</form>
	)
}
