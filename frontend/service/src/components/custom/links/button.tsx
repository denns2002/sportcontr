import Link from 'next/link'

type ButtonLinkProps = {
	href: string
	children: React.ReactElement | string
	color?: 'blue' | 'red' | 'green' | 'black' | 'gray'
	size?: 'default' | 'small'
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

export function ButtonLink({ href, children, color = 'black', size = 'default' }: ButtonLinkProps) {
	return (
		<Link
			href={href}
			className={`flex flex-row gap-2 items-center justify-center ${SIZES[size]} rounded-lg ${COLORS[color]} text-white shadow-md shadow-gray-400 transition-all duration-300 font-medium hover:bg-opacity-80`}
		>
			{children}
		</Link>
	)
}
