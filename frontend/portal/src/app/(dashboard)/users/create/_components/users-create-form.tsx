'use client'

import { DefaultButton } from '@/components/custom/buttons'
import { ButtonLink } from '@/components/custom/links'
import { FormElementWrapper } from '@/components/form-elements'
import { createUsersAction } from '@/data/actions/users'
import { FormElementAttributes } from '@/interfaces/forms'
import { UserCreateData } from '@/interfaces/users'
import { ArrowLeft, FilePenLine } from 'lucide-react'
import { useState } from 'react'
import { useFormState } from 'react-dom'

export function UsersCreateForm() {
	const INITIAL_STATE = {
		data: null,
		validationErrors: {},
		requestError: null,
	}

	const elements: FormElementAttributes[] = [
		{
			name: 'last_name',
			type: 'text',
			label: 'Фамилия',
			placeholder: 'Иванов',
			required: true,
			element: 'input',
			id: 'last_name',
		},
		{
			name: 'first_name',
			type: 'text',
			label: 'Имя',
			placeholder: 'Иван',
			required: true,
			element: 'input',
			id: 'first_name',
		},
		{
			name: 'middle_name',
			type: 'text',
			label: 'Отчество',
			placeholder: 'Иванович',
			required: false,
			element: 'input',
			id: 'middle_name',
		},
		{
			name: 'birth_date',
			type: 'date',
			label: 'День рождения',
			placeholder: '01.01.2000',
			required: false,
			element: 'input',
			id: 'birth_date',
		},
	]

	const [usersData, setUsersData] = useState<Array<UserCreateData>>([])

	const [formState, formAction] = useFormState(
		createUsersAction.bind(null, usersData),
		INITIAL_STATE
	)

	return (
		<form action={formAction} className='w-full flex flex-col gap-5'>
			{elements.map((attributes, index) => (
				<div className='w-full bg-white p-5 shadow-md' key={index}>
					<FormElementWrapper
						attributes={attributes}
					/>
				</div>
			))}


			<div className='w-full flex flex-row flex-wrap gap-y-5 gap-x-10'>
				<ButtonLink href={`/users/`} color='gray'>
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
