'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'
import { postProjectService } from '@/data/services/projects'

const schemaSignin = z.object({
	title: z.string().min(1, { message: 'Название должно содержать минимум 1 символ' }),
	description: z.string().min(1, { message: 'Описание должно содержать минимум 1 символ' }),
})

export async function createProjectAction(prevState: any, formData: FormData) {
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

	const responseData = await postProjectService(validatedFields.data)

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
			message: 'Ошибка создание проекта',
		}
	}

	console.log(responseData)

	redirect(`/projects/${responseData.slug}`)
}
