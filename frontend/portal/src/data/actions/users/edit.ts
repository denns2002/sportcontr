'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'
import { patchUserDetailsService } from '@/data/services/users'
import { User } from '@/interfaces/users'

const schemaSignin = z.object({
	first_name: z.string().min(1, { message: 'Имя должно содержать минимум 1 символ' }),
	last_name: z.string().min(1, { message: 'Фамилия должна содержать минимум 1 символ' }),
})

export async function editUserAction(user: User, prevState: any, formData: FormData) {
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

	userData.append('first_name', validatedFields.data.first_name)
	userData.append('last_name', validatedFields.data.last_name)
	userData.append('middle_name', formData.get('middle_name') || '')
	userData.append('birth_date', formData.get('birth_date') || '')

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
			message: 'Ошибка редактирования пользователя',
		}
	}

	redirect('/users/')
}
