export type FormElementAttributes = {
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
	placeholder: string
	required: boolean
	label: string
	element: 'input' | 'textarea'
}
