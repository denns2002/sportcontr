'use server'

import { UserCreateData } from '@/interfaces/users'
import { getCookie } from '../actions/cookies/get'

export async function getUsersService() {
	const url = new URL(`/api/users/user-list/`, process.env.API_BASE_URL)

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
		console.error('Get Projects Service Error:', error)

		throw error
	}
}

export async function getUserDetailsService(id: number) {
	const url = new URL(`/api/users/user-detail/${id}/`, process.env.API_BASE_URL)

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
		console.error('Get Projects Service Error:', error)

		throw error
	}
}

export async function patchUserDetailsService(id: number, userData: FormData) {
	const url = new URL(`/api/users/user-detail/${id}/`, process.env.API_BASE_URL)

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
			method: 'PATCH',
			headers: { ...headers },
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
	} catch (error) {
		console.error('Get Projects Service Error:', error)

		throw error
	}
}

export async function postUsersService(usersList: Array<UserCreateData>) {
	const url = new URL(`/api/users/register-many/`, process.env.API_BASE_URL)

	const token = await getCookie('token')

	var headers = {}

	if (token !== undefined && token) {
		headers = {
			Authorization: `Token ${token}`,
			'Content-Type': 'application/json',
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
			body: JSON.stringify({ users: usersList }),
		})

		console.log('service-response', response)

		const responseData = await response.json()

		console.log('service-data', responseData)

		return responseData
	} catch (error) {
		console.error('Get Projects Service Error:', error)

		throw error
	}
}
