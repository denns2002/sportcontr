import Link from 'next/link'

interface ButtonLinkProps {
	href: string
	children: React.ReactElement | string
	color?: 'blue' | 'red' | 'green' | 'black' | 'gray'
	size?: 'default' | 'small'
	external?: boolean
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
	small: 'px-2 py-2',
}

export function ButtonLink({
	href,
	children,
	color = 'black',
	size = 'default',
	external = false,
}: ButtonLinkProps) {
	return external ? (
		<a
			href={href}
			target='_blank'
			className={`flex flex-row gap-2 items-center justify-center ${SIZES[size]} rounded-lg ${COLORS[color]} text-white font-medium text-base shadow-md shadow-gray-400 transition-all duration-300 hover:bg-opacity-80`}
		>
			{children}
		</a>
	) : (
		<Link
			href={href}
			className={`flex flex-row gap-2 items-center justify-center ${SIZES[size]} rounded-lg ${COLORS[color]} text-white font-medium text-base shadow-md shadow-gray-400 transition-all duration-300 hover:bg-opacity-80`}
		>
			{children}
		</Link>
	)
}
