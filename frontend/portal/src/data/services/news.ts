'use server'

import { NewsData } from '@/interfaces/news'
import { getTokenService } from './auth'

export async function getNewsService(isPublished?: boolean) {
	const url = new URL('/api/news/', process.env.API_BASE_URL)

	const token = await getTokenService()

	var headers = {}

	if (token !== undefined) {
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
			headers,
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

	const token = await getTokenService()

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				Authorization: `Token ${token}`,
			},
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

	const token = await getTokenService()

	var headers = {}

	if (token !== undefined) {
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
			headers: {
				Authorization: `Token ${token}`,
			},
			cache: 'no-cache',
		})

		console.log(response);
		

		const responseData = await response.json()

		return responseData
	} catch (error) {
		console.error('Get Projects Service Error:', error)

		throw error
	}
}

export async function patchNewsDetailsService(slug: string, newsData: FormData) {
	const url = new URL(`/api/news/detail/${slug}/`, process.env.API_BASE_URL)

	const token = await getTokenService()

	try {
		const response = await fetch(url, {
			method: 'PATCH',
			headers: {
				Authorization: `Token ${token}`,
			},
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

	const token = await getTokenService()

	try {
		const response = await fetch(url, {
			method: 'PUT',
			headers: {
				Authorization: `Token ${token}`,
			},
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
