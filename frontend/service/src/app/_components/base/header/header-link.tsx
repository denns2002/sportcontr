'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface HeaderLinkProps {
	href: string
	children: React.ReactElement | string
}

export function HeaderLink({ href, children }: HeaderLinkProps) {
	const pathname = usePathname()

	return (
		<Link
			href={href}
			className={`${
				pathname.startsWith(href) ? 'underline underline-offset-[0.25rem] text-sky-700' : null
			} text-base hover:text-sky-500 transition-all duration-300 font-medium`}
		>
			{children}
		</Link>
	)
}
