export interface Project {
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

export interface ProjectCreate {
  title: string
	description: string
}

export interface ProjectDataChange {
  title: string
	description: string
}

export interface ProjectSettingsChange {
  on_prod: boolean
	url: string
} 
