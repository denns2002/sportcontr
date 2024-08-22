'use client'

import { useFormStatus } from 'react-dom'

type DefaultButtonProps = {
	children: React.ReactElement | string
	type: 'button' | 'submit' | 'reset'
	loadingText?: string
	disabled?: boolean
	color?: 'blue' | 'red' | 'green' | 'black'
	size?: 'default' | 'small'
	full?: boolean
	handler?(): void
}

const COLORS = {
	blue: 'bg-sky-500',
	red: 'bg-red-500',
	green: 'bg-green-500',
	black: 'bg-black',
	gray: 'bg-gray-600',
}

const SIZES = {
	default: 'px-4 py-3',
	small: 'px-2 p-2',
}

export function DefaultButton({
	children,
	type,
	loadingText,
	disabled,
	handler = () => {},
	color = 'black',
	size = 'default',
	full = true,
}: DefaultButtonProps) {
	const status = useFormStatus()

	return (
		<button
			onClick={() => handler()}
			className={`${full && 'w-full'} flex flex-row gap-2 items-center justify-center ${
				SIZES[size]
			} rounded-lg ${
				COLORS[color]
			} text-white shadow-md shadow-gray-400 hover:bg-opacity-80 transition-all duration-300 font-medium
			disabled:bg-gray-400 disabled:shadow-none text-base`}
			type={type}
			disabled={disabled}
		>
			{loadingText && status.pending ? loadingText : children}
		</button>
	)
}
