'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'
import { patchEventDetailsService } from '@/data/services/events'

const schemaSignin = z.object({
	name: z.string().min(1, { message: 'Название должно содержать минимум 1 символ' }),
	about: z.string().min(1, { message: 'Описание должно содержать минимум 1 символ' }),
	address: z.string().min(1, { message: 'Адрес должен содержать минимум 1 символ' }),
	reg_start: z.string(),
	reg_end: z.string(),
	date_start: z.string(),
	date_end: z.string(),
})

export async function editEventAction(
	slug: string,
	is_attestation: boolean,
	is_seminar: boolean,
	prevState: any,
	formData: FormData
) {
	const validatedFields = schemaSignin.safeParse({
		name: formData.get('name'),
		about: formData.get('about'),
		address: formData.get('address'),
		reg_start: formData.get('reg_start'),
		reg_end: formData.get('reg_end'),
		date_start: formData.get('date_start'),
		date_end: formData.get('date_end'),
	})

	if (!validatedFields.success) {
		return {
			...prevState,
			validationErrors: validatedFields.error.flatten().fieldErrors,
			requestError: null,
			message: 'Missing Fields. Validation failed',
		}
	}

	const eventData = new FormData()

	eventData.append('name', validatedFields.data.name)
	eventData.append('about', validatedFields.data.about)
	eventData.append('address', validatedFields.data.address)
	eventData.append('is_attestation', is_attestation ? 'true' : 'false')
	eventData.append('is_seminar', is_seminar ? 'true' : 'false')
	eventData.append('reg_start', validatedFields.data.reg_start)
	eventData.append('reg_end', validatedFields.data.reg_end)
	eventData.append('date_start', validatedFields.data.date_start)
	eventData.append('date_end', validatedFields.data.date_end)

	// const image = formData.get('image') as File

	// if (
	// 	image.name !== 'undefined' &&
	// 	image.size !== 0 &&
	// 	image.type !== 'application/octet-stream'
	// ) {
	// 	newsData.append('image', image)
	// }

	const responseData = await patchEventDetailsService(slug, eventData)

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
			message: 'Ошибка редактирования мероприятия',
		}
	}

	redirect(`/events/${slug}/`)
}
