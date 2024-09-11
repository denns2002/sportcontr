'use server'

import { UserCreateData } from '@/interfaces/users'
import { getUsersService, postUsersService } from '@/data/services/users'

export async function createUsersAction(
	usersData: Array<UserCreateData>,
	prevState: any,
	formData: FormData
) {
	const responseData = await postUsersService(usersData)

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

	return {
		...prevState,
		data: responseData,
		validationErrors: {},
		requestError: null,
		message: 'Все прошло успешно',
	}
}
