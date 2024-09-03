'use client'

import { useFormStatus } from 'react-dom'

interface TransparentButtonProps {
	children: React.ReactElement | string
	type: 'button' | 'submit' | 'reset'
	loadingText?: string
	disabled?: boolean
	size?: 'default' | 'small'
	full?: boolean
	handler?(): void
}

const SIZES = {
	default: 'px-4 py-3',
	small: 'px-2 py-2',
}

export function TransparentButton({
	children,
	type,
	loadingText,
	disabled,
	handler = () => {},
	size = 'default',
	full = true,
}: TransparentButtonProps) {
	const status = useFormStatus()

	return (
		<button
			onClick={() => handler()}
			className={`${full && 'w-full'} flex items-center justify-center ${
				SIZES[size]
			} rounded-lg hover:bg-gray-200 transition-all duration-300 font-medium text-base`}
			type={type}
			disabled={disabled}
		>
			{loadingText && status.pending ? loadingText : children}
		</button>
	)
}
