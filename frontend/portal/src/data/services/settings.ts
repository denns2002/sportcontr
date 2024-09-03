'use server'

import { getTokenService } from './auth'
import { Settings, SettingsData } from '@/interfaces/settings'

export async function getSettingsService() {
	const url = new URL(`/api/settings/`, process.env.API_BASE_URL)

	const token = await getTokenService()

	try {
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${token}`,
			},
			cache: 'no-cache',
		})

		const responseData = await response.json()

		if (responseData.message) {
			await postSettingsService(
				{
					title: 'Test',
					palette: 'sky',
					typography: 'font-onest',
					events: true,
					groups: true,
					news: true,
				},
				null
			)
		}

		return responseData
	} catch (error) {
		console.error('GET Settings Service Error:', error)

		throw error
	}
}

export async function postSettingsService(settingsData: SettingsData, formData: any) {
	const url = new URL(`/api/settings/`, process.env.API_BASE_URL)

	const token = await getTokenService()

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${token}`,
			},
			body: JSON.stringify({ ...settingsData }),
			cache: 'no-cache',
		})

		const responseData = await response.json()

		return responseData
	} catch (error) {
		console.error('POST Settings Service Error:', error)

		throw error
	}
}

export async function patchSettingsService(settingsData: SettingsData, formData: any) {
	const url = new URL(`/api/settings/`, process.env.API_BASE_URL)

	const token = await getTokenService()

	try {
		const response = await fetch(url, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${token}`,
			},
			body: JSON.stringify({ ...settingsData, ...formData }),
			cache: 'no-cache',
		})

		const responseData = await response.json()

		return responseData
	} catch (error) {
		console.error('PATCH Settings Service Error:', error)

		throw error
	}
}

export async function putSettingsService(settings: SettingsData, formData: any) {
	const url = new URL(`/api/settings/`, process.env.API_BASE_URL)

	const token = await getTokenService()

	try {
		const response = await fetch(url, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${token}`,
			},
			body: JSON.stringify({ ...settings, ...formData }),
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
				'Content-Type': 'application/json',
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
