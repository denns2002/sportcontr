'use client'

import { useFormStatus } from 'react-dom'

interface DefaultButtonProps {
	children: React.ReactElement | string
	type: 'button' | 'submit' | 'reset'
	loadingText?: string
	disabled?: boolean
	color?: 'primary' | 'error' | 'warning' | 'gray'
	size?: 'default' | 'small'
	full?: boolean
	handler?(): void
}

const COLORS = {
	primary: 'bg-primary hover:bg-hover hover:text-active',
	error: 'bg-error hover:bg-warning',
	warning: 'bg-warning hover:bg-white hover:text-warning',
	gray: 'bg-gray-600 hover:bg-gray-300 hover:text-gray-900',
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
	color = 'primary',
	size = 'default',
	full = false,
}: DefaultButtonProps) {
	const status = useFormStatus()

	return (
		<button
			onClick={() => handler()}
			className={`h-fit ${full && 'w-full'} flex flex-row gap-2 items-center justify-center ${
				SIZES[size]
			} ${
				COLORS[color]
			} text-white shadow-md transition-all duration-300 font-medium
			disabled:bg-gray-400 disabled:shadow-none disabled:text-white text-base`}
			type={type}
			disabled={disabled}
		>
			{loadingText && status.pending ? loadingText : children}
		</button>
	)
}
