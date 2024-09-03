'use server'

import { GroupData } from '@/interfaces/groups'
import { getTokenService } from './auth'

export async function getGroupsService() {
	const url = new URL('/api/groups/', process.env.API_BASE_URL)

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

export async function postGroupService(groupData: GroupData) {
	const url = new URL('/api/groups/', process.env.API_BASE_URL)

	const token = await getTokenService()

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${token}`,
			},
			cache: 'no-cache',
			body: JSON.stringify({ ...groupData }),
		})

		const responseData = await response.json()

		return responseData
	} catch (error) {
		console.error('Get Projects Service Error:', error)

		throw error
	}
}

export async function getGroupDetailsService(slug: string) {
	const url = new URL(`/api/groups/detail/${slug}/`, process.env.API_BASE_URL)

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

export async function patchGroupDetailsService(slug: string, groupData: GroupData) {
	const url = new URL(`/api/groups/detail/${slug}/`, process.env.API_BASE_URL)

	const token = await getTokenService()

	try {
		const response = await fetch(url, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${token}`,
			},
			cache: 'no-cache',
			body: JSON.stringify({ ...groupData }),
		})

		const responseData = await response.json()

		return responseData
	} catch (error) {
		console.error('Get Projects Service Error:', error)

		throw error
	}
}

export async function putGroupDetailsService(slug: string, groupData: GroupData) {
	const url = new URL(`/api/groups/detail/${slug}/`, process.env.API_BASE_URL)

	const token = await getTokenService()

	try {
		const response = await fetch(url, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${token}`,
			},
			cache: 'no-cache',
			body: JSON.stringify({ ...groupData }),
		})

		const responseData = await response.json()

		return responseData
	} catch (error) {
		console.error('Get Projects Service Error:', error)

		throw error
	}
}

export async function deleteGroupDetailsService(slug: string) {
	const url = new URL(`/api/groups/detail/${slug}/`, process.env.API_BASE_URL)

	const token = await getTokenService()

	try {
		const response = await fetch(url, {
			method: 'PATCH',
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
