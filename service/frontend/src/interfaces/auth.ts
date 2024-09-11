export interface SiginUserData {
	username: string
	password: string
}

export interface SignupUserData {
	username: string
	email?: string
	password: string
	password_2: string
  first_name: string
  last_name: string
	middle_name?: string
	is_verified?: boolean
}
