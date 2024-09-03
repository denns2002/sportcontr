import { FormElementAttributes } from '@/interfaces/forms'
import { Input } from './input'
import { Textarea } from './textarea'
import { FileUploader } from './file-uploader';

interface FormElementWrapperProps {
	attributes: FormElementAttributes
	errors: string[]
	disabled?: boolean
	value?: string
	file?: File
	handler?(event: React.FormEvent<HTMLInputElement>): void
}

export function FormElementWrapper({ attributes, errors, disabled, file, value = '', handler }: FormElementWrapperProps) {
	switch (attributes.element) {
		case 'input': {
			return <Input {...attributes} errors={errors} disabled={disabled} value={value} />
		}
		case 'textarea': {
			return <Textarea {...attributes} errors={errors} disabled={disabled} value={value} />
		}
		case 'uploader' : {
			return <FileUploader {...attributes} disabled={disabled} handler={handler} file={file} />
		}
		default: {
			return <></>
		}
	}
}
