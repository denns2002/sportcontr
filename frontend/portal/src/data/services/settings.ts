'use server'

import { getCookie } from "../actions/cookies/get"

export async function getSettingsService() {
	const url = new URL(`/api/settings/`, process.env.API_BASE_URL)

	const token = await getCookie('token')

	var headers = {}

	if (token !== undefined && token) {
		headers = {
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`,
		}
	} else {
		headers = {
			'Content-Type': 'application/json',
		}
	}

	try {
		const response = await fetch(url, {
			method: 'GET',
			headers: { ...headers },
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

	const token = await getCookie('token')

	var headers = {}

	if (token !== undefined && token) {
		headers = {
			Authorization: `Token ${token}`,
		}
	} else {
		headers = {}
	}

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: { ...headers },
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

	const token = await getCookie('token')

	console.log('token', token);
	

	var headers = {}

	if (token !== undefined && token) {
		headers = {
			Authorization: `Token ${token}`,
		}
	} else {
		headers = {}
	}

	try {
		const response = await fetch(url, {
			method: 'PATCH',
			headers: { ...headers },
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

	const token = await getCookie('token')

	var headers = {}

	if (token !== undefined && token) {
		headers = {
			Authorization: `Token ${token}`,
		}
	} else {
		headers = {}
	}

	try {
		const response = await fetch(url, {
			method: 'PUT',
			headers: { ...headers },
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

	const token = await getCookie('token')

	var headers = {}

	if (token !== undefined && token) {
		headers = {
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`,
		}
	} else {
		headers = {
			'Content-Type': 'application/json',
		}
	}

	try {
		const response = await fetch(url, {
			method: 'DELETE',
			headers: { ...headers },
			cache: 'no-cache',
		})

		const responseData = await response.json()

		return responseData
	} catch (error) {
		console.error('DELETE Settings Service Error:', error)

		throw error
	}
}
