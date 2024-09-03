import Link from 'next/link'

interface DropdownLinkProps {
	href: string
	children: React.ReactElement | string
}

export function DropdownLink({ href, children }: DropdownLinkProps) {
	return (
		<Link
			href={href}
			className='text-base hover:text-sky-500 transition-all duration-300 py-4 font-medium'
		>
			<span className='px-5'>{children}</span>
		</Link>
	)
}
