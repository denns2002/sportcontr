import Link from 'next/link'

interface TextLinkProps {
	href: string
	children: React.ReactElement | string
	external?: boolean
}

export function TextLink({ href, children, external = false }: TextLinkProps) {
	return external ? (
		<a
			href={href}
			target='_blank'
			className='text-base font-medium hover:underline transition-all duration-300'
		>
			{children}
		</a>
	) : (
		<Link href={href} className='text-base font-medium hover:underline transition-all duration-300'>
			{children}
		</Link>
	)
}
