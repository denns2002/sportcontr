export interface User {
	id?: number
	username: string
	email?: string
	is_superuser: boolean
	is_staff?: boolean
	is_active?: boolean
	is_verified?: boolean
	is_trainer?: boolean
	first_name: string
	last_name: string
	middle_name?: string
	birth_date?: string
	avatar?: string
	created_at?: string
	updated_at?: string
	userphonenumber_set?: { telephone: string }[]
}

export interface UserData {
	username: string
	first_name: string
	last_name: string
	middle_name?: string
	birth_date?: string
	is_trainer?: boolean
	is_superuser?: boolean
	userphonenumber_set: { telephone: string }[]
}

export interface UserCreateData {
	first_name: string
	last_name: string
	middle_name?: string
	birth_date?: string
}
