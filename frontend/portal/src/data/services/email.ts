'use server'

import { getCookie } from "../actions/cookies/get"

export async function postEmailService(email: string) {
	const url = new URL('/api/users/change-email/', process.env.API_BASE_URL)

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
			method: 'POST',
			headers: { ...headers },
			cache: 'no-cache',
			body: JSON.stringify({ email }),
		})

		const responseData = await response.json()

		return responseData
	} catch (error) {
		console.error('Post Email Change Service Error:', error)

		throw error
	}
}

export async function getEmailVerifyService() {
	const url = new URL(`/api/users/email-verify-new/`, process.env.API_BASE_URL)

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
		console.error('Get Email Change Service Error:', error)

		throw error
	}
}
