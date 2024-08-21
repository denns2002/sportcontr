import Link from 'next/link'

type TransparentLinkProps = {
	href: string
	children: React.ReactElement | string
}

export function TransparentLink({ href, children }: TransparentLinkProps) {
	return (
		<Link
			href={href}
			className='flex items-center justify-center px-4 py-3 rounded-lg hover:bg-gray-200 transition-all duration-300 font-medium'
		>
			{children}
		</Link>
	)
}
