export interface FormElementAttributes {
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
		| 'file'
		| 'tel'
	placeholder: string
	required: boolean
	label: string
	id: string
	element: 'input' | 'textarea' | 'uploader'
}
