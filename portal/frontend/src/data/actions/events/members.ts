'use server'

import { redirect } from 'next/navigation'
import { patchEventMembersService } from '@/data/services/events'

export async function editEventMembersAction(
	slug: string,
  members: Array<number>,
	prevState: any,
	formData: FormData
) {

	const responseData = await patchEventMembersService(slug, members)

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
			message: 'Ошибка редактирования списка участников мероприятия',
		}
	}

	redirect(`/events/${slug}/`)
}
