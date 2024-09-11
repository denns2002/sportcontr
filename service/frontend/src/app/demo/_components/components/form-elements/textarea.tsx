import { FormElementAttributes } from '@/interfaces/forms'
import { ValidationError } from '@/components/errors/'

type TextareaPorps = FormElementAttributes & {
	errors?: string[]
	disabled?: boolean
	value?: string
}

export function Textarea({ label, errors, id, value, ...attributes }: TextareaPorps) {
	return (
		<div className='w-full'>
			<label className='font-medium' htmlFor={id}>
				{label}
			</label>
			<textarea
				{...attributes}
				rows={5}
				defaultValue={value}
				id={id}
				className='w-full mb-1 p-3 border-2 border-primary focus:outline-none transition-all duration-300 focus:border-hover mt-2'
			/>
			{errors ? <ValidationError errors={errors} /> : null}
		</div>
	)
}
