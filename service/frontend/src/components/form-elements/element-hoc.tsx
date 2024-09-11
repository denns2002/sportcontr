import { FormElementAttributes } from '@/interfaces/forms'
import { Input } from './input'
import { Textarea } from './textarea'
import { FileUploader } from './file-uploader'
import { Checkbox } from './checkbox'

interface FormElementWrapperProps {
	attributes: FormElementAttributes
	errors?: string[]
	disabled?: boolean
	value?: string
	handleChange?(event: React.ChangeEvent<HTMLInputElement>): void 
}

export function FormElementWrapper({
	attributes,
	errors,
	disabled,
	handleChange,
	value = '',
}: FormElementWrapperProps) {
	switch (attributes.element) {
		case 'input': {
			return <Input {...attributes} errors={errors} disabled={disabled} value={value} handleChange={handleChange} />
		}
		case 'textarea': {
			return <Textarea {...attributes} errors={errors} disabled={disabled} value={value} />
		}
		case 'uploader': {
			return <FileUploader {...attributes} disabled={disabled} value={value} />
		}
		case 'checkbox': {
			return <Checkbox {...attributes} value={value} />
		}
		default: {
			return <></>
		}
	}
}
