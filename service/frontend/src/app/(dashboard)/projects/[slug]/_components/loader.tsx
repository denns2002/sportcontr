'use client'

import { Loader2 } from 'lucide-react'
import { useFormStatus } from 'react-dom'

export function Loader() {
	const { pending } = useFormStatus()

	return pending ? (
		<div className=''>
			<div className='fixed inset-0 z-40 flex justify-center items-center bg-gray-800 opacity-30'>
				<Loader2 className='h-10 w-10 text-white animate-spin' />
			</div>
		</div>
	) : null
}
