'use client'

import { useFormStatus } from 'react-dom'

type DefaultButtonProps = {
	children: React.ReactElement | string
	type: 'button' | 'submit' | 'reset'
	loadingText?: string
	disabled?: boolean
	color?: 'blue' | 'red' | 'green' | 'black'
	full?: boolean
	handler(): void
}

const COLORS = {
	blue: 'bg-sky-500',
	red: 'bg-red-500',
	green: 'bg-green-500',
	black: 'bg-black',
}

export function DefaultButton({
	children,
	type,
	loadingText,
	disabled,
	handler = () => {},
	color = 'black',
	full = true,
}: DefaultButtonProps) {
	const status = useFormStatus()

	return (
		<button
			onClick={() => handler()}
			className={`${full && 'w-full'} flex flex-row gap-2 items-center justify-center px-4 py-3 rounded-lg ${COLORS[color]} text-white shadow-md shadow-gray-400 hover:bg-opacity-80 transition-all duration-300 text-lg font-medium
			disabled:bg-gray-400 disabled:shadow-none`}
			type={type}
			disabled={disabled}
		>
			{loadingText && status.pending ? loadingText : children}
		</button>
	)
}
