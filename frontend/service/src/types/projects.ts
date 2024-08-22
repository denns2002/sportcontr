export type Project = {
	owner: number
	members: number[]
	title: string
	description: string
	on_prod: boolean
	url: string
	created_at: string
	updated_at: string
	slug: string
}

export type ProjectCreate = {
  title: string
	description: string
}

export type ProjectDataChange = {
  title: string
	description: string
}

export type ProjectSettingsChange = {
  on_prod: boolean
	url: string
} 
