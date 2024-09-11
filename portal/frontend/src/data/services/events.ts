'use server'

import { getCookie } from '../actions/cookies/get'

export async function getEventsService(isActive?: boolean) {
	const url = new URL(
		`/api/events/${isActive === undefined ? '' : isActive ? '?active=true' : '?active=false'}`,
		process.env.API_BASE_URL
	)

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
		console.error('Get Events Service Error:', error)

		throw error
	}
}

export async function postEventService(eventData: FormData) {
	const url = new URL('/api/events/', process.env.API_BASE_URL)

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
			cache: 'no-cache',
			body: eventData,
		})

		const responseData = await response.json()

		return responseData
	} catch (error) {
		console.error('Post Event Service Error:', error)

		throw error
	}
}

export async function getEventDetailsService(slug: string) {
	const url = new URL(`/api/events/detail/${slug}/`, process.env.API_BASE_URL)

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
		console.error('Get Event Service Error:', error)

		throw error
	}
}

export async function patchEventDetailsService(slug: string, eventData: FormData) {
	const url = new URL(`/api/events/detail/${slug}/`, process.env.API_BASE_URL)

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
			body: eventData,
		})

		const responseData = await response.json()

		return responseData
	} catch (error) {
		console.error('Get Projects Service Error:', error)

		throw error
	}
}

export async function putEventDetailsService(slug: string, eventData: FormData) {
	const url = new URL(`/api/events/detail/${slug}/`, process.env.API_BASE_URL)

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
			body: eventData,
		})

		const responseData = await response.json()

		return responseData
	} catch (error) {
		console.error('Get Projects Service Error:', error)

		throw error
	}
}

export async function deleteEventDetailsService(slug: string) {
	const url = new URL(`/api/events/detail/${slug}/`, process.env.API_BASE_URL)

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

export async function patchEventMembersService(slug: string, members: Array<number>) {
	const url = new URL(`/api/events/${slug}/members/add/`, process.env.API_BASE_URL)

	const token = await getCookie('token')

	var headers = {}

	if (token !== undefined && token) {
		headers = {
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`,
		}
	} else {
		headers = { 'Content-Type': 'application/json' }
	}

	try {
		const response = await fetch(url, {
			method: 'PATCH',
			headers: { ...headers },
			cache: 'no-cache',
			body: JSON.stringify({ members: members }),
		})

		const responseData = await response.json()

		return responseData
	} catch (error) {
		console.error('Get Projects Service Error:', error)

		throw error
	}
}

export async function putEventMembersService(slug: string, members: Array<number>) {
	const url = new URL(`/api/events/${slug}/members/add/`, process.env.API_BASE_URL)

	const token = await getCookie('token')

	var headers = {}

	if (token !== undefined && token) {
		headers = {
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`,
		}
	} else {
		headers = { 'Content-Type': 'application/json' }
	}

	try {
		const response = await fetch(url, {
			method: 'PUT',
			headers: { ...headers },
			cache: 'no-cache',
			body: JSON.stringify({ members: members }),
		})

		const responseData = await response.json()

		return responseData
	} catch (error) {
		console.error('Get Projects Service Error:', error)

		throw error
	}
}
