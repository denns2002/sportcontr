'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'
import { patchNewsDetailsService } from '@/data/services/news'

const schemaSignin = z.object({
	title: z.string().min(1, { message: 'Заголовок должен содержать минимум 1 символ' }),
	description: z.string().min(1, { message: 'Описание должно содержать минимум 1 символ' }),
})

export async function editNewsAction(
	slug: string,
	is_published: boolean,
	prevState: any,
	formData: FormData
) {
	const validatedFields = schemaSignin.safeParse({
		title: formData.get('title'),
		description: formData.get('description'),
	})

	if (!validatedFields.success) {
		return {
			...prevState,
			validationErrors: validatedFields.error.flatten().fieldErrors,
			requestError: null,
			message: 'Missing Fields. Validation failed',
		}
	}

	const newsData = new FormData()

	newsData.append('title', validatedFields.data.title)
	newsData.append('description', validatedFields.data.description)
	newsData.append('is_published', is_published ? 'true' : 'false')

	const image = formData.get('image') as File

	if (
		image.name !== 'undefined' &&
		image.size !== 0 &&
		image.type !== 'application/octet-stream'
	) {
		newsData.append('image', image)
	}

	console.log('action', newsData, image)

	const responseData = await patchNewsDetailsService(slug, newsData)

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
			message: 'Ошибка редактирования новости',
		}
	}

	redirect(`/news/${slug}/`)
}
