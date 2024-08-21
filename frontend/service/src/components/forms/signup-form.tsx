'use client'

import { InputAttributes } from '@/types/forms'
import { Input } from './elements/input'
import { signinAction } from '@/data/actions/auth'
import { useFormState } from 'react-dom'
import { RequestError } from '@/components/errors'
import { DefaultButton } from '@/components/custom/buttons'
import { TextLink } from '@/components/custom/links'

const INITIAL_STATE = {
	data: null,
	validationErrors: {},
}

export function SignUpForm() {
	const [formState, formAction] = useFormState(signinAction, INITIAL_STATE)

	const inputs: InputAttributes[] = [
		{
			name: 'username',
			type: 'text',
			label: 'Имя пользователя',
			placeholder: 'Имя пользователя',
			required: true,
		},
    {
			name: 'email',
			type: 'email',
			label: 'Почта',
			placeholder: 'mail@mail.mail',
			required: true,
		},
		{
			name: 'firstName',
			type: 'text',
			label: 'Имя',
			placeholder: 'Иван',
			required: true,
		},
    {
			name: 'secondName',
			type: 'text',
			label: 'Фамилия',
			placeholder: 'Иванов',
			required: true,
		},
		{
			name: 'password',
			type: 'password',
			label: 'Пароль',
			placeholder: '******',
			required: true,
		},
    {
			name: 'passwordConfirm',
			type: 'password',
			label: 'Подтвердите пароль',
			placeholder: '******',
			required: true,
		},
		{
			name: 'passwordConfirm',
			type: 'password',
			label: 'Подтвердите пароль',
			placeholder: '******',
			required: true,
		},
		{
			name: 'passwordConfirm',
			type: 'password',
			label: 'Подтвердите пароль',
			placeholder: '******',
			required: true,
		},
		{
			name: 'passwordConfirm',
			type: 'password',
			label: 'Подтвердите пароль',
			placeholder: '******',
			required: true,
		},
		{
			name: 'passwordConfirm',
			type: 'password',
			label: 'Подтвердите пароль',
			placeholder: '******',
			required: true,
		},
	]

	return (
		<form
			// action={formAction}
			className='w-full max-w-xl bg-white px-10 py-10 flex flex-col rounded-lg shadow-md'
		>
			<h1 className='font-medium text-3xl'>Регистрация</h1>
			<span className='text-gray-500 text-lg mt-5 mb-5'>Введите данные, чтобы создать аккаунт</span>
			<div className='flex flex-col gap-5'>
				{inputs.map((attributes, index) => (
					<Input
						{...attributes}
						errors={formState?.validationErrors[attributes.name]}
						key={index}
					/>
				))}
			</div>
			<div className='mt-5 flex flex-col gap-1 items-center'>
      <DefaultButton type='submit' loadingText='...'>
					ЗАРЕГИСТРИРОВАТЬСЯ
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
