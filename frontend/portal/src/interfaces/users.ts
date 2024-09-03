export interface User {
	id: number
	username: string
	email: string
	is_staff: boolean
	is_active: boolean
	is_verified: boolean
	is_trainer: boolean
	first_name: string
	last_name: string
	created_at: string
	updated_at: string
	userphonenumber_set: { telephone: string }[]
}

export interface UserData {
	username: string
	email: string
	last_name: string
	userphonenumber_set: { telephone: string }[]
}
