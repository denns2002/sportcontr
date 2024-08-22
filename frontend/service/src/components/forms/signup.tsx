'use client'

import { FormElementAttributes } from '@/types/forms'
import { signinAction } from '@/data/actions/auth'
import { useFormState } from 'react-dom'
import { RequestError } from '@/components/errors'
import { DefaultButton } from '@/components/custom/buttons'
import { TextLink } from '@/components/custom/links'
import { FormElementWrapper } from './elements'

const INITIAL_STATE = {
	data: null,
	validationErrors: {},
}

export function SignUpForm() {
	const [formState, formAction] = useFormState(signinAction, INITIAL_STATE)

	const elements: FormElementAttributes[] = [
		{
			name: 'username',
			type: 'text',
			label: 'Имя пользователя',
			placeholder: 'Username',
			required: true,
			element: 'input',
		},
		{
			name: 'email',
			type: 'email',
			label: 'Почта',
			placeholder: 'mail@mail.mail',
			required: true,
			element: 'input',
		},
		{
			name: 'firstName',
			type: 'text',
			label: 'Имя',
			placeholder: 'Иван',
			required: true,
			element: 'input',
		},
		{
			name: 'secondName',
			type: 'text',
			label: 'Фамилия',
			placeholder: 'Иванов',
			required: true,
			element: 'input',
		},
		{
			name: 'password',
			type: 'password',
			label: 'Пароль',
			placeholder: '******',
			required: true,
			element: 'input',
		},
		{
			name: 'passwordConfirm',
			type: 'password',
			label: 'Подтвердите пароль',
			placeholder: '******',
			required: true,
			element: 'input',
		},
	]

	return (
		<form
			// action={formAction}
			className='w-full max-w-xl bg-white px-8 py-8 flex flex-col rounded-lg shadow-md'
		>
			<h1 className='font-medium text-3xl'>Регистрация</h1>
			<span className='text-gray-500 text-lg mt-5 mb-5'>Введите данные, чтобы создать аккаунт</span>
			<div className='flex flex-col gap-5'>
				{elements.map((attributes, index) => (
					<FormElementWrapper
						attributes={attributes}
						errors={formState?.validationErrors[attributes.name]}
						key={index}
					/>
				))}
			</div>
			<div className='mt-5 flex flex-col gap-1 items-center'>
				<DefaultButton type='submit' loadingText='...'>
					Зарегистрироваться
				</DefaultButton>
				<RequestError detail={formState?.requestError} />
			</div>
			<div className='flex flex-row gap-1 mt-5 justify-center'>
				<span className='text-gray-500'>Уже есть аккаунт?</span>
				<TextLink href='/signup'>Войти</TextLink>
			</div>
		</form>
	)
}
