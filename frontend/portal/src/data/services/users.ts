'use server'

import { getTokenService } from './auth'
import { User, UserData } from '@/interfaces/users'

export async function getUsersService() {
	const url = new URL(`/api/users/user-list/`, process.env.API_BASE_URL)

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

		return responseData
	} catch (error) {
		console.error('Get Projects Service Error:', error)

		throw error
	}
}

export async function getUserDetailsService(id: number) {
	const url = new URL(`/api/users/user-detail/${id}/`, process.env.API_BASE_URL)

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

		return responseData
	} catch (error) {
		console.error('Get Projects Service Error:', error)

		throw error
	}
}

export async function patchUserDetailsService(id: number, userData: FormData) {
	const url = new URL(`/api/users/user-detail/${id}/`, process.env.API_BASE_URL)

	const token = await getTokenService()

	console.log(userData);
	

	try {
		const response = await fetch(url, {
			method: 'PATCH',
			headers: {
				Authorization: `Token ${token}`,
			},
			cache: 'no-cache',
			body: userData,
		})

		const responseData = await response.json()

		return responseData
	} catch (error) {
		console.error('Get Projects Service Error:', error)

		throw error
	}
}

export async function putUserDetailsService(id: number, userData: FormData) {
	const url = new URL(`/api/users/user-detail/${id}/`, process.env.API_BASE_URL)

	const token = await getTokenService()

	try {
		const response = await fetch(url, {
			method: 'PUT',
			headers: {
				Authorization: `Token ${token}`,
			},
			cache: 'no-cache',
			body: userData,
		})

		const responseData = await response.json()

		return responseData
	} catch (error) {
		console.error('Get Projects Service Error:', error)

		throw error
	}
}

export async function deleteUserDetailsService(id: number) {
	const url = new URL(`/api/users/user-detail/${id}/`, process.env.API_BASE_URL)

	const token = await getTokenService()

	try {
		const response = await fetch(url, {
			method: 'DELETE',
			headers: {
				Authorization: `Token ${token}`,
			},
			cache: 'no-cache',
		})
	} catch (error) {
		console.error('Get Projects Service Error:', error)

		throw error
	}
}
