import { FormElementAttributes } from '@/interfaces/forms'
import { ValidationError } from '@/components/errors/'

type TextareaPorps = FormElementAttributes & {
	errors: string[]
	disabled?: boolean
	value?: string
}

export function Textarea({ label, errors, value, ...attributes }: TextareaPorps) {
	return (
		<div className='w-full'>
			<label className='font-medium' htmlFor=''>
				{label}
			</label>
			<textarea
				{...attributes}
				rows={5}
				defaultValue={value}
				className='w-full mb-1 p-3 border-2 border-gray-300 rounded-lg focus:outline-none transition-all duration-300 focus:border-sky-500 mt-2'
			/>
			<ValidationError errors={errors} />
		</div>
	)
}
