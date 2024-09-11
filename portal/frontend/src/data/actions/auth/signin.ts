'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { siginUserService } from '@/data/services/auth'

const schemaSignin = z.object({
	username: z
		.string()
		.min(3, { message: 'Имя пользователя должно содержать минимум 3 символа' })
		.max(20, {
			message: 'Имя пользователя не может содержать более 20 символов',
		}),
	password: z.string().min(5, { message: 'Пароль должен содержать минимум 6 символов' }).max(40, {
		message: 'Пароль должен не может содержать более 6 до 40 символов',
	}),
})

export async function signinAction(prevState: any, formData: FormData) {
	const validatedFields = schemaSignin.safeParse({
		username: formData.get('username'),
		password: formData.get('password'),
	})

	if (!validatedFields.success) {
		return {
			...prevState,
			validationErrors: validatedFields.error.flatten().fieldErrors,
			requestError: null,
			message: 'Missing Fields. Validation failed',
		}
	}

	const responseData = await siginUserService(validatedFields.data)

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
			message: 'Ошибка входа',
		}
	}

	cookies().set('token', responseData.token, {
		maxAge: 60 * 60 * 24 * 7,
		path: '/',
		sameSite: 'lax',
		httpOnly: true,
		secure: false,
	})

	redirect('/')
}

export async function signoutAction() {
	cookies().set('token', '', {
		maxAge: 0,
		path: '/',
		sameSite: 'lax',
		httpOnly: true,
		secure: false,
	})

	redirect('/')
}
