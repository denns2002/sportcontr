'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'
import { patchSettingsService } from '@/data/services/settings'

const schemaSignin = z.object({
	title: z.string().min(1, { message: 'Заголовок должен содержать минимум 1 символ' }),
})

export async function editSettingsAction(
	modules: Array<string>,
	palette: string,
	font: string,
	prevState: any,
	formData: FormData
) {
	const validatedFields = schemaSignin.safeParse({
		title: formData.get('title'),
	})

	if (!validatedFields.success) {
		return {
			...prevState,
			validationErrors: validatedFields.error.flatten().fieldErrors,
			requestError: null,
			message: 'Missing Fields. Validation failed',
		}
	}

	const settingsData = new FormData()

	settingsData.append('title', validatedFields.data.title)
	settingsData.append('palette', palette)
	settingsData.append('typography', font)
	settingsData.append('groups', modules.includes('groups') ? 'true' : 'false')
	settingsData.append('events', modules.includes('events') ? 'true' : 'false')
	settingsData.append('news', modules.includes('news') ? 'true' : 'false')

	const favicon = formData.get('favicon') as File
	const logo = formData.get('logo') as File

	if (
		favicon.name !== 'undefined' &&
		favicon.size !== 0 &&
		favicon.type !== 'application/octet-stream'
	) {
		settingsData.append('favicon', favicon)
	}

	if (logo.name !== 'undefined' && logo.size !== 0 && logo.type !== 'application/octet-stream') {
		settingsData.append('logo', logo)
	}

	const responseData = await patchSettingsService(settingsData)

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
			message: 'Ошибка редактирования настроек',
		}
	}

	redirect(`/`)
}
