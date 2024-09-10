'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface HeaderLinkProps {
	href: string
	children: React.ReactElement | 'string'
}

export function HeaderLink({ href, children }: HeaderLinkProps) {
	const pathname = usePathname()

	return (
		<Link
			href={href}
			className={`${
				pathname.startsWith(href) ? 'bg-active' : 'bg-primary'
			} text-white flex flex-row gap-4 px-5 py-3 font-medium hover:bg-hover hover:text-active transition-all duration-300`}
		>
			{children}
		</Link>
	)
}
