'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'
import { patchUserDetailsService } from '@/data/services/users'
import { Regex } from 'lucide-react'
import { Router } from 'next/router'
import { User } from '@/interfaces/users'

const schemaSignin = z.object({
	username: z
		.string()
		.min(3, { message: 'Имя пользователя должно содержать минимум 3 символа' })
		.max(20, {
			message: 'Имя пользователя не может содержать более 20 символов',
		}),
	first_name: z.string().min(1, { message: 'Имя должно содержать минимум 1 символ' }),
	last_name: z.string().min(1, { message: 'Фамилия должна содержать минимум 1 символ' }),
})

export async function editProfileAction(user: User, prevState: any, formData: FormData) {
	const validatedFields = schemaSignin.safeParse({
		username: formData.get('username'),
		first_name: formData.get('first_name'),
		last_name: formData.get('last_name'),
	})

	if (!validatedFields.success) {
		return {
			...prevState,
			validationErrors: validatedFields.error.flatten().fieldErrors,
			requestError: null,
			message: 'Missing Fields. Validation failed',
		}
	}

	const userData = new FormData()

	userData.append('username', validatedFields.data.username)
	userData.append('first_name', validatedFields.data.first_name)
	userData.append('last_name', validatedFields.data.last_name)
	userData.append('middle_name', formData.get('middle_name') || '')
	userData.append('birth_date', formData.get('birth_date') || '')

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
