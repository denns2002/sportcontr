'use client'

import { FormElementAttributes } from '@/interfaces/forms'
import { ArrowUpFromLine } from 'lucide-react'

type InputPorps = FormElementAttributes & {
	file?: File
	disabled?: boolean
	handler?(event: React.FormEvent<HTMLInputElement>): void
}

export function FileUploader({ label, id, file, handler, ...attributes }: InputPorps) {
	return (
		<label
			className='cursor-pointer flex flex-row justify-center items-center gap-2 border-2 border-dashed border-primary p-2'
			htmlFor={id}
		>
			{file ? (
				<div className='font-medium'>{file?.name}</div>
			) : (
				<>
					<div className='font-medium'>{label}</div>
					<ArrowUpFromLine className='h-5 w-5' />
				</>
			)}
			<input {...attributes} id={id} hidden onChange={handler} />
		</label>
	)
}
