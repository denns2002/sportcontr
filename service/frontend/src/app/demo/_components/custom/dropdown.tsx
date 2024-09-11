'use client'

import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { TransparentButton } from '../components/custom/buttons'

interface DropdownProps {
	label: string
	children: React.ReactElement | string
	defaultState?: boolean
	button?: React.ReactElement
}

export function Dropdown({ label, children, button, defaultState=true }: DropdownProps) {
	const [isActive, setIsActive] = useState(defaultState)

	return (
		<div className='w-full shadow-md'>
			<div className='flex flex-row gap-5 p-5 bg-white'>
				<div className='flex justify-center items-center'><label className='font-medium'>{label}:</label></div>
				<div className='flex-1' />{' '}
				<TransparentButton full={false} size='small' type='button' handler={() => setIsActive((prev) => !prev)}>
					<ChevronDown
						className={`h-5 w-5 ${isActive ? '-rotate-180' : null} transition-all duration-300`}
					/>
				</TransparentButton>
				{button}
			</div>
			<div
				className={`${
					isActive ? null : 'hidden'
				} flex flex-col bg-white shadow-md border-t-2 border-primary`}
			>
				{children}
			</div>
		</div>
	)
}
