'use client'

import { DefaultButton } from '@/app/demo/_components/components/custom/buttons'
import { ButtonLink } from '@/app/demo/_components/components/custom/links'
import { FormElementWrapper } from '@/app/demo/_components/components/form-elements'
import { FormElementAttributes } from '@/app/demo/_interfaces/forms'
import { editProfileAction } from '@/data/actions/profile'
import { User } from '@/interfaces/users'
import { ArrowLeft, FilePenLine } from 'lucide-react'
import { useFormState } from 'react-dom'

interface ProfileEditFormProps {
	email: string
	telephone: string
	user: User
}

export function ProfileEditForm({ user, ...data }: ProfileEditFormProps) {
	const INITIAL_STATE = {
		data: user,
		validationErrors: {},
		requestError: null,
	}

	const [formState, formAction] = useFormState(editProfileAction.bind(null, user), INITIAL_STATE)

	const elements: FormElementAttributes[] = [
		// {
		// 	name: 'email',
		// 	type: 'email',
		// 	label: 'Почта',
		// 	placeholder: 'mail@mail.mail',
		// 	required: true,
		// 	element: 'input',
		// 	id: 'title',
		// },
		// {
		// 	name: 'telephone',
		// 	type: 'tel',
		// 	label: 'Номер телефона',
		// 	placeholder: '+7-777-777-77-77',
		// 	required: false,
		// 	element: 'input',
		// 	id: 'title',
		// },
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
				<div className='w-full bg-white p-5 shadow-md' key={index}>
					<FormElementWrapper
						attributes={attributes}
						errors={formState?.validationErrors[attributes.name]}
						value={formState?.data[attributes.name]}
					/>
				</div>
			))}
			<div className='w-full flex flex-row flex-wrap gap-y-5 gap-x-10'>
				<ButtonLink href={`/demo/profile/`} color='gray'>
					<>
						<ArrowLeft className='h-5 w-5' />
						<span>Вернуться</span>
					</>
				</ButtonLink>
				<div className='flex-1' />
				<DefaultButton type='submit' disabled full={false}>
					<>
						<FilePenLine className='h-5 w-5' />
						<span>Сохранить</span>
					</>
				</DefaultButton>
			</div>
		</form>
	)
}
