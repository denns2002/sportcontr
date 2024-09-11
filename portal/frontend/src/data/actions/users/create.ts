'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'
import { UserCreateData } from '@/interfaces/users'
import { getUsersService } from '@/data/services/users'

const schemaSignin = z.object({
	first_name: z.string().min(1, { message: 'Имя должно содержать минимум 1 символ' }),
	last_name: z.string().min(1, { message: 'Фамилия должна содержать минимум 1 символ' }),
})

export async function createUsersAction(
	usersData: Array<UserCreateData>,
	prevState: any,
	formData: FormData
) {
	// const validatedFields = schemaSignin.safeParse({
	// 	username: formData.get('username'),
	// 	first_name: formData.get('first_name'),
	// 	last_name: formData.get('last_name'),
	// })

	// if (!validatedFields.success) {
	// 	return {
	// 		...prevState,
	// 		validationErrors: validatedFields.error.flatten().fieldErrors,
	// 		requestError: null,
	// 		message: 'Missing Fields. Validation failed',
	// 	}
	// }

	const responseData = await getUsersService()

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

	// redirect('/users/')
}
