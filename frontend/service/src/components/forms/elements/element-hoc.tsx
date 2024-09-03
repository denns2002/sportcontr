import { FormElementAttributes } from '@/types/forms'
import { Input } from './input'
import { Textarea } from './textarea'

interface FormElementWrapperProps {
	attributes: FormElementAttributes
	errors: string[]
	disabled?: boolean
	value?: string
}

export function FormElementWrapper({ attributes, errors, disabled, value = '' }: FormElementWrapperProps) {
	switch (attributes.element) {
		case 'input': {
			return <Input {...attributes} errors={errors} disabled={disabled} value={value} />
		}
		case 'textarea': {
			return <Textarea {...attributes} errors={errors} disabled={disabled} value={value} />
		}
		default: {
			return <></>
		}
	}
}
