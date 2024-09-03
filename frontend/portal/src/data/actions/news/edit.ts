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

	const responseData = await patchNewsDetailsService(slug, {
		...validatedFields.data,
		is_published,
	})

	console.log('cringe', formData.get('image'));

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
