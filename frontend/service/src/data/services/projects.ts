'use server'

import { ProjectDataChange, ProjectCreate, ProjectSettingsChange } from '@/interfaces/projects'
import { getTokenService } from './auth'

export async function getUserProjectsService() {
	const url = new URL('/api/projects/project-list/', process.env.API_BASE_URL)

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

export async function postProjectService(projectData: ProjectCreate) {
	const url = new URL('/api/projects/project-list/', process.env.API_BASE_URL)

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
			body: JSON.stringify({ ...projectData }),
			cache: 'no-cache',
		})

		const responseData = await response.json()

		return responseData
	} catch (error) {
		console.error('Create Project Service Error:', error)

		throw error
	}
}

export async function patchProjectService(slug: string, projectData: ProjectDataChange) {
	const url = new URL(`/api/projects/project-detail/${slug}/`, process.env.API_BASE_URL)

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
			body: JSON.stringify({ ...projectData }),
			cache: 'no-cache',
		})

		const responseData = await response.json()

		return responseData
	} catch (error) {
		console.error('Change (PATCH) Data Project Service Error:', error)

		throw error
	}
}

export async function putProjectService(slug: string, projectData: ProjectDataChange) {
	const url = new URL(`/api/projects/project-detail/${slug}/`, process.env.API_BASE_URL)

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
			body: JSON.stringify({ ...projectData }),
			cache: 'no-cache',
		})

		const responseData = await response.json()

		return responseData
	} catch (error) {
		console.error('Change (PUT) Project Data Service Error:', error)

		throw error
	}
}

export async function getProjectService(slug: string) {
	const url = new URL(`/api/projects/project-detail/${slug}/`, process.env.API_BASE_URL)

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
		console.error('Get Project Service Error:', error)

		throw error
	}
}

export async function deleteProjectService(slug: string) {
	const url = new URL(`/api/projects/project-detail/${slug}/`, process.env.API_BASE_URL)

	const token = await getTokenService()

	try {
		const response = await fetch(url, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${token}`,
			},
			cache: 'no-cache',
		})
	} catch (error) {
		console.error('DELETE Project Service Error:', error)

		throw error
	}
}

export async function patchProjectSettingsService(
	slug: string,
	projectData: ProjectSettingsChange
) {
	const url = new URL(`/api/projects/project-change-url/${slug}/`, process.env.API_BASE_URL)

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
			body: JSON.stringify({ ...projectData }),
			cache: 'no-cache',
		})

		const responseData = await response.json()

		return responseData
	} catch (error) {
		console.error('Change (PATCH) Project Settings Service Error:', error)

		throw error
	}
}

export async function putProjectSettingsService(slug: string, projectData: ProjectSettingsChange) {
	const url = new URL(`/api/projects/project-change-url/${slug}/`, process.env.API_BASE_URL)

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
			body: JSON.stringify({ ...projectData }),
			cache: 'no-cache',
		})

		const responseData = await response.json()

		return responseData
	} catch (error) {
		console.error('Change (PUT) Project Settings Service Error:', error)

		throw error
	}
}
