import { FormElementAttributes } from '@/types/forms'
import { Input } from './input'
import { Textarea } from './textarea'

type FormElementWrapperProps = {
	attributes: FormElementAttributes
	errors: string[]
	disabled?: boolean
}

export function FormElementWrapper({ attributes, errors, disabled }: FormElementWrapperProps) {
	switch (attributes.element) {
		case 'input': {
			return <Input {...attributes} errors={errors} disabled={disabled} />
		}
		case 'textarea': {
			return <Textarea {...attributes} errors={errors} disabled={disabled} />
		}
		default: {
			return <></>
		}
	}
}
