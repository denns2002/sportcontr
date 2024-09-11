import Link from 'next/link'

interface ButtonLinkProps {
	href: string
	children: React.ReactElement | string
	color?: 'primary' | 'error' | 'warning' | 'gray'
	size?: 'default' | 'small'
	external?: boolean
	download?: boolean
}

const COLORS = {
	primary: 'bg-primary hover:bg-hover hover:text-active',
	error: 'bg-error hover:bg-white hover:text-error',
	warning: 'bg-warning hover:bg-white hover:text-warning',
	gray: 'bg-gray-600 hover:bg-gray-300 hover:text-gray-900',
}

const SIZES = {
	default: 'px-4 py-3',
	small: 'px-2 py-2',
}

export function ButtonLink({
	href,
	children,
	color = 'primary',
	size = 'default',
	external = false,
	download = false,
}: ButtonLinkProps) {
	if (external) {
		return (
			<a
				href={href}
				target='_blank'
				className={`flex flex-row gap-2 items-center justify-center ${SIZES[size]} ${COLORS[color]} text-white font-medium text-base shadow-md transition-all duration-300`}
			>
				{children}
			</a>
		)
	}

	if (download) {
		return (
			<a
				href={href}
				download={true}
				className={`flex flex-row gap-2 items-center justify-center ${SIZES[size]} ${COLORS[color]} text-white font-medium text-base shadow-md transition-all duration-300`}
			>
				{children}
			</a>
		)
	}

	return (
		<Link
			href={href}
			className={`flex flex-row gap-2 items-center justify-center ${SIZES[size]} ${COLORS[color]} text-white font-medium text-base shadow-md transition-all duration-300`}
		>
			{children}
		</Link>
	)
}
