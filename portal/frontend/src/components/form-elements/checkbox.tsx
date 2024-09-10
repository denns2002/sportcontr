import { FormElementAttributes } from '@/interfaces/forms'
import { Check } from 'lucide-react'
import { useState } from 'react'

type InputPorps = FormElementAttributes & { value?: any }

export function Checkbox({ label, id, value, ...attributes }: InputPorps) {
	console.log('cringe', value)

	const [isChecked, setIsChecked] = useState<boolean>(value)

	return (
		<div className='w-full flex flex-row gap-5 items-center'>
			<label className='font-medium' htmlFor={id}>
				{label}
			</label>
			<div className='flex-1' />
			<input {...attributes} id={id} checked={isChecked} hidden />
			<div
				className='h-full cursor-pointer border-primary border-2 hover:border-hover transition-all duration-300'
				onClick={() => setIsChecked((prev) => !prev)}
			>
				<div className={`bg-white p-1 ${isChecked ? 'text-primary' : 'text-white'} shadow-md`}>
					<Check className='h-5 w-5' strokeWidth={3} />
				</div>
			</div>
		</div>
	)
}
