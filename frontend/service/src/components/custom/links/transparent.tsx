import Link from 'next/link'

type TransparentLinkProps = {
	href: string
	children: React.ReactElement | string
	size?: 'default' | 'small'
	external?: boolean
}

const SIZES = {
	default: 'px-4 py-3',
	small: 'px-2 py-2',
}

export function TransparentLink({
	href,
	children,
	size = 'default',
	external = false,
}: TransparentLinkProps) {
	return external ? (
		<a
			href={href}
			target="_blank"
			className={`flex items-center justify-center ${SIZES[size]} rounded-lg hover:bg-gray-200 transition-all duration-300 font-medium text-base`}
		>
			{children}
		</a>
	) : (
		<Link
			href={href}
			className={`flex items-center justify-center ${SIZES[size]} rounded-lg hover:bg-gray-200 transition-all duration-300 font-medium text-base`}
		>
			{children}
		</Link>
	)
}
