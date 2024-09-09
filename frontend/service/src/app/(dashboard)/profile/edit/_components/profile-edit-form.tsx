'use client'

import { DefaultButton } from '@/components/custom/buttons'
import { ButtonLink } from '@/components/custom/links'
import { FormElementWrapper } from '@/components/form-elements'
import { editProfileAction } from '@/data/actions/profile'
import { FormElementAttributes } from '@/interfaces/forms'
import { User } from '@/interfaces/users'
import { ArrowLeft, FilePenLine } from 'lucide-react'
import { useFormState } from 'react-dom'

interface ProfileEditFormProps {
	user: User
}

export function ProfileEditForm({ user }: ProfileEditFormProps) {
	const INITIAL_STATE = {
		data: user,
		validationErrors: {},
		requestError: null,
	}

	const [formState, formAction] = useFormState(editProfileAction.bind(null, user), INITIAL_STATE)

	const elements: FormElementAttributes[] = [
		{
			name: 'username',
			type: 'text',
			label: 'Имя пользователя',
			placeholder: 'Username',
			required: true,
			element: 'input',
			id: 'username',
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
			name: 'last_name',
			type: 'text',
			label: 'Фамилия',
			placeholder: 'Иванов',
			required: true,
			element: 'input',
			id: 'last_name',
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
		{
			name: 'avatar',
			type: 'file',
			label: 'Загрузить аватарку',
			placeholder: 'Картинка котика',
			required: false,
			element: 'uploader',
			id: 'avatar',
		},
	]

	return (
		<form action={formAction} className='w-full flex flex-col gap-5'>
			{elements.map((attributes, index) => (
				<div className='w-full bg-white p-5 shadow-md rounded-lg' key={index}>
					<FormElementWrapper
						attributes={attributes}
						errors={formState?.validationErrors[attributes.name]}
						value={formState?.data[attributes.name]}
					/>
				</div>
			))}
			<div className='w-full flex flex-row flex-wrap gap-y-5 gap-x-10'>
				<ButtonLink href={`/profile/`} color='gray'>
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
