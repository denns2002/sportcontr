'use server'

import { SiginUserData, SignupUserData } from '@/interfaces/auth'
import { cookies } from 'next/headers'
import { signoutAction } from '../actions/auth'
import { getCookie } from '../actions/cookies/get'

export async function verifyEmailService() {
	const url = new URL('/api/users/email-verify/', process.env.API_BASE_URL)

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

		return response.json()
	} catch (error) {
		console.error('Signin Service Error:', error)

		return false
	}
}

export async function siginUserService(userData: SiginUserData) {
	const url = new URL('/api/users/login/', process.env.API_BASE_URL)

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ ...userData }),
			cache: 'no-cache',
		})

		return await response.json()
	} catch (error) {
		console.error('Signin Service Error:', error)

		return false
	}
}

export async function signoutUserService() {
	const url = new URL('/api/users/logout/', process.env.API_BASE_URL)

	const token = await getCookie('token')

	if (!token) {
		return { authenticated: false, data: null, error: null }
	}

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

		if (responseData.detail) {
			return { authenticated: false, data: null, error: responseData.detail }
		}

		return { authenticated: true, data: responseData.user, error: null }
	} catch (error) {
		console.error('Verify Service Error:', error)

		return { authenticated: false, data: null, error: error }
	}
}

export async function signupUserService(userData: SignupUserData) {
	const url = new URL('/api/users/register/', process.env.API_BASE_URL)

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ ...userData }),
			cache: 'no-cache',
		})

		const responseData = await response.json()

		if (responseData.detail) {
			return { authenticated: false, data: null, error: responseData.detail }
		}

		return { authenticated: true, data: responseData.user, error: null }
	} catch (error) {
		console.error('Verify Service Error:', error)

		return { authenticated: false, data: null, error: error }
	}
}

export async function verifyUserService(message?: string) {
	const url = new URL('/api/users/verify/', process.env.API_BASE_URL)

	const token = await getCookie('token')

	console.log(message, token);

	if (!token) {
		return { authenticated: false, data: null, error: null }
	}

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
			body: JSON.stringify({ token: token }),
			cache: 'no-cache',
		})

		const responseData = await response.json()

		if (responseData.detail) {
			return { authenticated: false, data: null, error: responseData.detail }
		}

		return { authenticated: true, data: responseData.user, error: null }
	} catch (error) {
		console.error('Verify Service Error:', error)

		return { authenticated: false, data: null, error: error }
	}
}
