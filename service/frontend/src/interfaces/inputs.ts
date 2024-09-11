export interface InputAttributes {
	name: string
	type:
		| 'number'
		| 'date'
		| 'datetime-local'
		| 'email'
		| 'password'
		| 'month'
		| 'text'
		| 'time'
		| 'url'
	disabled?: boolean
	value?: string
	placeholder: string
	required: boolean
	label: string
	errors?: string[]
	touched?: boolean
}
