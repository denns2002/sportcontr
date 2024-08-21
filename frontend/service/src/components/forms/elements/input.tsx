import { InputAttributes } from '@/types/forms'
import React from 'react'
import { ValidationError } from '@/components/errors/'

type InputPorps = InputAttributes & { errors: string[] }

export function Input({ label, errors, ...attributes }: InputPorps) {
	return (
		<div className='w-full'>
			<label className='font-medium' htmlFor=''>
				{label}
			</label>
			<input
				{...attributes}
				className='w-full mb-1 p-3 border-2 border-gray-300 rounded-lg focus:outline-none transition-all duration-300 focus:border-sky-500 mt-2'
			/>
			<ValidationError errors={errors} />
		</div>
	)
}
