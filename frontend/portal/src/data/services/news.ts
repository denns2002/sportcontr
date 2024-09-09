'use server'

import { NewsData } from '@/interfaces/news'
import { getCookie } from '../actions/cookies/get'

export async function getNewsService(isPublished?: boolean) {
	const url = new URL(
		`/api/news/${
			isPublished === undefined ? '' : isPublished ? '?is_published=True' : '?is_published=False'
		}`,
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
		console.error('Get Projects Service Error:', error)

		throw error
	}
}

export async function postNewsService(newsData: FormData) {
	const url = new URL('/api/news/', process.env.API_BASE_URL)

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
			body: newsData,
		})

		const responseData = await response.json()

		return responseData
	} catch (error) {
		console.error('Get Projects Service Error:', error)

		throw error
	}
}

export async function getNewsDetailsService(slug: string) {
	const url = new URL(`/api/news/detail/${slug}/`, process.env.API_BASE_URL)

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

export async function patchNewsDetailsService(slug: string, newsData: FormData) {
	const url = new URL(`/api/news/detail/${slug}/`, process.env.API_BASE_URL)

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
			body: newsData,
		})

		const responseData = await response.json()

		return responseData
	} catch (error) {
		console.error('Get Projects Service Error:', error)

		throw error
	}
}

export async function putNewsDetailsService(slug: string, newsData: FormData) {
	const url = new URL(`/api/news/detail/${slug}/`, process.env.API_BASE_URL)

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
			body: newsData,
		})

		const responseData = await response.json()

		return responseData
	} catch (error) {
		console.error('Get Projects Service Error:', error)

		throw error
	}
}

export async function deleteNewsDetailsService(slug: string) {
	const url = new URL(`/api/news/detail/${slug}/`, process.env.API_BASE_URL)

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
