'use server'

import { patchGroupDetailsService } from '@/data/services/groups-base'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const schemaSignin = z.object({
	name: z.string().min(1, { message: 'Название должно содержать минимум 1 символ' }),
	description: z.string().min(1, { message: 'Описание должно содержать минимум 1 символ' }),
})

export async function editGroupAction(
	slug: string,
	members: Array<number>,
	trainers: Array<number>,
	prevState: any,
	formData: FormData
) {
	const validatedFields = schemaSignin.safeParse({
		name: formData.get('name'),
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

	const responseData = await patchGroupDetailsService(slug, {
		...validatedFields.data,
		members,
		trainers,
	})

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
			message: 'Ошибка редактирования группы',
		}
	}

	redirect('/groups/')
}
