'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'
import { patchUserDetailsService } from '@/data/services/users'
import { postEmailService } from '@/data/services/email'
import { Regex } from 'lucide-react'
import { Router } from 'next/router'
import { User } from '@/interfaces/users'

const schemaSignin = z.object({
	// email: z
	// 	.string()
	// 	.min(1, { message: 'Адрес почты должен содержать минимум 1 символ' })
	// 	.email({ message: 'Вы ввели некоректный адрес почты' }),
	// telephone: z
	// 	.string()
	// 	.min(1, { message: 'Номер телефона должен содержать минимум 1 символ' })
	// 	.regex(new RegExp(/^(\+\d{1,3}[- ]?)?\d{10}$/), 'Вы ввели некоректный номер телефона'),
})

export async function editProfileAction(user: User, prevState: any, formData: FormData) {
	const validatedFields = schemaSignin.safeParse({
		// email: formData.get('email'),
		// telephone: formData.get('telephone'),
	})

	// if (!validatedFields.success) {
	// 	return {
	// 		...prevState,
	// 		validationErrors: validatedFields.error.flatten().fieldErrors,
	// 		requestError: null,
	// 		message: 'Missing Fields. Validation failed',
	// 	}
	// }

	console.log(formData);

	// if (prevState?.data?.email.toLowerCase() !== validatedFields?.data?.email.toLowerCase()) {
	// 	const responseEmail = await postEmailService(validatedFields?.data?.email.toLowerCase())

	// 	if (!responseEmail) {
	// 		return {
	// 			...prevState,
	// 			requestError: null,
	// 			validationErrors: {},
	// 			message: 'Упс! Что-то пошло не так. Попробуйте еще раз',
	// 		}
	// 	}

	// 	if (responseEmail.message) {
	// 		return {
	// 			...prevState,
	// 			requestError: responseEmail.message,
	// 			validationErrors: {},
	// 			message: 'Ошибка изменения почты',
	// 		}
	// 	}
	// }

	const userData = new FormData()

	const avatar = formData.get('avatar') as File

	if (
		avatar.name !== 'undefined' &&
		avatar.size !== 0 &&
		avatar.type !== 'application/octet-stream'
	) {
		userData.append('avatar', avatar)
	}

	const responseData = await patchUserDetailsService(user.id!, userData)

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
			message: 'Ошибка редактирования профиля',
		}
	}

	redirect('/profile/')
}
