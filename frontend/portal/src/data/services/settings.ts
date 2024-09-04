'use server'

import { getTokenService } from './auth'
import { Settings, SettingsData } from '@/interfaces/settings'

export async function getSettingsService() {
	const url = new URL(`/api/settings/`, process.env.API_BASE_URL)

	try {
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			cache: 'no-cache',
		})

		const responseData = await response.json()

		return responseData
	} catch (error) {
		console.error('GET Settings Service Error:', error)

		throw error
	}
}

export async function postSettingsService(settingsData: FormData) {
	const url = new URL(`/api/settings/`, process.env.API_BASE_URL)

	const token = await getTokenService()

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				Authorization: `Token ${token}`,
			},
			body: settingsData,
			cache: 'no-cache',
		})

		const responseData = await response.json()

		return responseData
	} catch (error) {
		console.error('POST Settings Service Error:', error)

		throw error
	}
}

export async function patchSettingsService(settingsData: FormData) {
	const url = new URL(`/api/settings/`, process.env.API_BASE_URL)

	const token = await getTokenService()

	try {
		const response = await fetch(url, {
			method: 'PATCH',
			headers: {
				Authorization: `Token ${token}`,
			},
			body: settingsData,
			cache: 'no-cache',
		})

		if (response.status === 404) {
			return await postSettingsService(settingsData)
		}

		const responseData = await response.json()

		return responseData
	} catch (error) {
		console.error('PATCH Settings Service Error:', error)

		throw error
	}
}

export async function putSettingsService(settingsData: FormData) {
	const url = new URL(`/api/settings/`, process.env.API_BASE_URL)

	const token = await getTokenService()

	try {
		const response = await fetch(url, {
			method: 'PUT',
			headers: {
				Authorization: `Token ${token}`,
			},
			body: settingsData,
			cache: 'no-cache',
		})

		const responseData = await response.json()

		return responseData
	} catch (error) {
		console.error('PUT Settings Service Error:', error)

		throw error
	}
}

export async function deleteSettingsService() {
	const url = new URL(`/api/settings/`, process.env.API_BASE_URL)

	const token = await getTokenService()

	try {
		const response = await fetch(url, {
			method: 'DELETE',
			headers: {
				Authorization: `Token ${token}`,
			},
			cache: 'no-cache',
		})

		const responseData = await response.json()

		return responseData
	} catch (error) {
		console.error('DELETE Settings Service Error:', error)

		throw error
	}
}
