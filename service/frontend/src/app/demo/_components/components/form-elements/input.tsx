import { FormElementAttributes } from '@/interfaces/forms'
import { ValidationError } from '@/components/errors/'

type InputPorps = FormElementAttributes & {
	errors?: string[]
	disabled?: boolean
	value?: string
	handleChange?(event: React.ChangeEvent<HTMLInputElement>): void
}

export function Input({ label, errors, id, value, handleChange, ...attributes }: InputPorps) {
	return (
		<div className='w-full'>
			<label className='font-medium' htmlFor={id}>
				{label}
			</label>
			<input
				{...attributes}
				id={id}
				defaultValue={value}
				onChange={handleChange ? (event) => handleChange(event) : () => {}}
				className='w-full mb-1 p-3 border-2 border-primary focus:outline-none transition-all duration-300 focus:border-hover mt-2'
			/>
			{errors ? <ValidationError errors={errors} /> : null}
		</div>
	)
}
