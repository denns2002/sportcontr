'use client'

import { FormElementAttributes } from '@/interfaces/forms'
import { ArrowUpFromLine } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

type InputPorps = FormElementAttributes & {
	disabled?: boolean
	value?: string
}

export function FileUploader({ label, id, value, ...attributes }: InputPorps) {
	const [file, setFile] = useState<File>()

	function handleUpload(event: React.FormEvent<HTMLInputElement>) {
		if (!event?.currentTarget?.files?.[0]) {
			console.log('file upload error')

			return
		}

		setFile(event?.currentTarget?.files?.[0])
	}

	return (
		<div className='w-full flex flex-row flex-wrap gap-5'>
			{file ? (
				<Image
					src={URL.createObjectURL(file)}
					alt='image'
					width={1000}
					height={1000}
					className='object-cover max-h-[20rem] w-full sm:h-[10rem] sm:w-[10rem]'
				/>
			) : value ? (
				<Image
					src={value}
					alt='image'
					width={1000}
					height={1000}
					className='object-cover w-full sm:h-[10rem] sm:w-[10rem]'
				/>
			) : null}
			<label
				className='flex-1 cursor-pointer flex flex-row justify-center items-center gap-2 border-2 border-dashed border-primary p-2'
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
				<input {...attributes} id={id} hidden onChange={handleUpload} />
			</label>
		</div>
	)
}
