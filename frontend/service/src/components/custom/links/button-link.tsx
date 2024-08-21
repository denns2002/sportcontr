import Link from 'next/link'

type ButtonLinkProps = {
	href: string
	children: React.ReactElement | string
	color?: 'blue' | 'red' | 'green' | 'black'
}

const COLORS = {
	blue: 'bg-sky-500',
	red: 'bg-red-500',
	green: 'bg-green-500',
	black: 'bg-black',
}

export function ButtonLink({ href, children, color = 'black' }: ButtonLinkProps) {
	return (
		<Link
			href={href}
			className={`flex flex-row gap-2 items-center justify-center px-4 py-3 rounded-lg ${COLORS[color]} text-white shadow-md shadow-gray-400 transition-all duration-300 font-medium hover:bg-opacity-80`}
		>
			{children}
		</Link>
	)
}
