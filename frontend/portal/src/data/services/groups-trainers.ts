'use server'

import { TrainerGroupData } from '@/interfaces/groups'
import { getTokenService } from './auth'

export async function getTrainersGroupsService() {
	const url = new URL('/api/groups/trainer/', process.env.API_BASE_URL)

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

export async function postTrainersGroupService(groupData: TrainerGroupData) {
	const url = new URL('/api/groups/trainer/', process.env.API_BASE_URL)

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
			method: 'POST',
			headers: { ...headers },
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

export async function getTrainersGroupDetailsService(slug: string) {
	const url = new URL(`/api/groups/trainer/detail/${slug}/`, process.env.API_BASE_URL)

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

export async function patchTrainersGroupDetailsService(slug: string, groupData: TrainerGroupData) {
	const url = new URL(`/api/groups/trainer/detail/${slug}/`, process.env.API_BASE_URL)

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
			method: 'PATCH',
			headers: { ...headers },
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

export async function putTrainersGroupDetailsService(slug: string, groupData: TrainerGroupData) {
	const url = new URL(`/api/groups/trainer/detail/${slug}/`, process.env.API_BASE_URL)

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
			method: 'PUT',
			headers: { ...headers },
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

export async function deleteTrainersGroupDetailsService(slug: string) {
	const url = new URL(`/api/groups/detail/${slug}/`, process.env.API_BASE_URL)

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
			method: 'DELETE',
			headers: { ...headers },
			cache: 'no-cache',
		})
	} catch (error) {
		console.error('Get Projects Service Error:', error)

		throw error
	}
}
