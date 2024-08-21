import Link from 'next/link'

type TextLinkProps = {
	href: string
	children: React.ReactElement | string
}

export function TextLink({ href, children }: TextLinkProps) {
	return (
		<Link href={href} className='font-medium hover:underline transition-all duration-300'>
			{children}
		</Link>
	)
}
