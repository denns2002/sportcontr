'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'
import { signupUserService } from '@/data/services/auth'

const schemaSignin = z
	.object({
		username: z
			.string()
			.min(3, { message: 'Имя пользователя должно содержать минимум 3 символа' })
			.max(20, {
				message: 'Имя пользователя не может содержать более 20 символов',
			}),
		email: z.string().email({ message: '' }),
		password: z.string().min(5, { message: 'Пароль должен содержать минимум 6 символов' }).max(40, {
			message: 'Пароль должен не может содержать более 6 до 40 символов',
		}),
		password_2: z.string(),
		first_name: z.string().min(1, { message: 'Имя должно содержать минимум 1 символ' }),
		last_name: z.string().min(1, { message: 'Фамилия должна содержать минимум 1 символ' }),
	})
	.refine((data) => data.password === data.password_2, {
		message: 'Пароли должны совпадать',
		path: ['password_2'],
	})

export async function signupAction(prevState: any, formData: FormData) {
	const validatedFields = schemaSignin.safeParse({
		username: formData.get('username'),
		password: formData.get('password'),
		email: formData.get('email'),
		first_name: formData.get('first_name'),
		last_name: formData.get('last_name'),
		password_2: formData.get('password_2'),
	})

	if (!validatedFields.success) {
		return {
			...prevState,
			validationErrors: validatedFields.error.flatten().fieldErrors,
			requestError: null,
			message: 'Missing Fields. Validation failed',
		}
	}

	const userData = {
		username: validatedFields.data.username,
		email: validatedFields.data.email,
		password: validatedFields.data.password,
		password_2: validatedFields.data.password_2,
		first_name: validatedFields.data.first_name,
		last_name: validatedFields.data.last_name,
		middle_name: (formData.get('middle_name') as string) || '',
		is_verified: true,
	}

	const responseData = await signupUserService(userData)

	if (!responseData) {
		return {
			...prevState,
			requestError: null,
			validationErrors: {},
			message: 'Упс! Что-то пошло не так. Попробуйте еще раз',
		}
	}

	if (responseData.detail) {
		return {
			...prevState,
			requestError: responseData.detail,
			validationErrors: {},
			message: 'Ошибка регистрации',
		}
	}

	redirect('/signin/')
}
