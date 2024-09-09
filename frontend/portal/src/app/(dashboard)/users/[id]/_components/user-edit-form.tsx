'use client'

import { DefaultButton } from '@/components/custom/buttons'
import { ButtonLink } from '@/components/custom/links'
import { FormElementWrapper } from '@/components/form-elements'
import { editUserAction } from '@/data/actions/users'
import { FormElementAttributes } from '@/interfaces/forms'
import { User } from '@/interfaces/users'
import { ArrowLeft, FilePenLine } from 'lucide-react'
import { useFormState } from 'react-dom'

interface UserEditFormProps {
	user: User
}

export function UserEditForm({ user }: UserEditFormProps) {
	const INITIAL_STATE = {
		data: user,
		validationErrors: {},
		requestError: null,
	}

	const [formState, formAction] = useFormState(editUserAction.bind(null, user), INITIAL_STATE)

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

	return (
		<form action={formAction} className='w-full flex flex-col gap-5'>
			{elements.map((attributes, index) => (
				<div className='w-full bg-white p-5 shadow-md' key={index}>
					<FormElementWrapper
						attributes={attributes}
						errors={formState?.validationErrors[attributes.name]}
						value={formState?.data[attributes.name]}
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
