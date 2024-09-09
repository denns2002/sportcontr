'use client'

import { FormElementAttributes } from '@/interfaces/forms'
import { signinAction } from '@/data/actions/auth'
import { useFormState } from 'react-dom'
import { RequestError } from '@/components/errors'
import { DefaultButton } from '@/components/custom/buttons'
import { TextLink } from '@/components/custom/links'
import { FormElementWrapper } from '@/components/form-elements'

const INITIAL_STATE = {
	data: null,
	validationErrors: {},
	requestError: null,
}

export function SignInForm() {
	const [formState, formAction] = useFormState(signinAction, INITIAL_STATE)

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
			name: 'password',
			type: 'password',
			label: 'Пароль',
			placeholder: '******',
			required: true,
			element: 'input',
			id: 'password',
		},
	]

	return (
		<form
			action={formAction}
			className='w-full max-w-xl my-auto mx-auto bg-white px-8 py-8 flex flex-col shadow-md'
		>
			<h1 className='font-medium text-3xl text-center mb-5'>Авторизация</h1>
			<div className='flex flex-col gap-5'>
				{elements.map((attributes, index) => (
					<FormElementWrapper
						attributes={attributes}
						errors={formState?.validationErrors[attributes.name]}
						key={index}
					/>
				))}
			</div>
			<div className='flex flex-row gap-1 mt-5'>
				<span className='text-gray-500'>Забыли пароль?</span>
				<TextLink href='#'>Восстановить</TextLink>
			</div>
			<div className='mt-5 flex flex-col gap-1 items-center'>
				<DefaultButton full={true} type='submit' loadingText='...'>
					Войти
				</DefaultButton>
				<RequestError detail={formState?.requestError} />
			</div>
		</form>
	)
}
