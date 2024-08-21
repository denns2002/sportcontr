'use server'

import { ProjectDataChange, ProjectCreate, ProjectSettingsChange } from '@/types/projects'
import { getTokenService } from './auth'

const token = getTokenService()

export async function getUserProjectsService() {
	const url = new URL('/api/projects/project-list/', 'http://127.0.0.1:8000')

	try {
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${await token}`,
			},
			cache: 'no-cache',
		})

		return response.json()
	} catch (error) {
		console.error('Get Projects Service Error:', error)

		throw error
	}
}

export async function postProjectService(projectData: ProjectCreate) {
	const url = new URL('/api/projects/project-list/', 'http://127.0.0.1:8000')

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${await token}`,
			},
			body: JSON.stringify({ ...projectData }),
			cache: 'no-cache',
		})

		return response.json()
	} catch (error) {
		console.error('Create Project Service Error:', error)

		throw error
	}
}

export async function patchProjectService(slug: string, projectData: ProjectDataChange) {
	const url = new URL(`/api/projects/project-detail/${slug}`, 'http://127.0.0.1:8000')

	try {
		const response = await fetch(url, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${await token}`,
			},
			body: JSON.stringify({ ...projectData }),
			cache: 'no-cache',
		})

		return response.json()
	} catch (error) {
		console.error('Change (PATCH) Data Project Service Error:', error)

		throw error
	}
}

export async function putProjectService(slug: string, projectData: ProjectDataChange) {
	const url = new URL(`/api/projects/project-detail/${slug}`, 'http://127.0.0.1:8000')

	try {
		const response = await fetch(url, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${await token}`,
			},
			body: JSON.stringify({ ...projectData }),
			cache: 'no-cache',
		})

		return response.json()
	} catch (error) {
		console.error('Change (PUT) Project Data Service Error:', error)

		throw error
	}
}

export async function getProjectService(slug: string) {
	const url = new URL(`/api/projects/project-detail/${slug}`, 'http://127.0.0.1:8000')

	try {
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${await token}`,
			},
			cache: 'no-cache',
		})

		return response.json()
	} catch (error) {
		console.error('Get Project Service Error:', error)

		throw error
	}
}

export async function deleteProjectService(slug: string) {
	const url = new URL(`/api/projects/project-detail/${slug}`, 'http://127.0.0.1:8000')

	try {
		const response = await fetch(url, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${await token}`,
			},
			cache: 'no-cache',
		})

		return response.json()
	} catch (error) {
		console.error('DELETE Project Service Error:', error)

		throw error
	}
}

export async function patchProjectSettingsService(
	slug: string,
	projectData: ProjectSettingsChange
) {
	const url = new URL(`/api/projects/project-change-url/${slug}`, 'http://127.0.0.1:8000')

	try {
		const response = await fetch(url, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${await token}`,
			},
			body: JSON.stringify({ ...projectData }),
			cache: 'no-cache',
		})

		return response.json()
	} catch (error) {
		console.error('Change (PATCH) Project Settings Service Error:', error)

		throw error
	}
}

export async function putProjectSettingsService(slug: string, projectData: ProjectSettingsChange) {
	const url = new URL(`/api/projects/project-change-url/${slug}`, 'http://127.0.0.1:8000')

	try {
		const response = await fetch(url, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${await token}`,
			},
			body: JSON.stringify({ ...projectData }),
			cache: 'no-cache',
		})

		return response.json()
	} catch (error) {
		console.error('Change (PUT) Project Settings Service Error:', error)

		throw error
	}
}
