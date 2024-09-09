'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface DropdownLinkProps {
	href: string
	children: React.ReactElement | string
}

export function DropdownLink({ href, children }: DropdownLinkProps) {
	const pathname = usePathname()

	return (
		<Link
			href={href}
			className={`${
				pathname.startsWith(href) ? 'underline underline-offset-[0.25rem] text-sky-700' : null
			} text-base hover:text-sky-500 transition-all duration-300 py-4 font-medium`}
		>
			<span className='px-5'>{children}</span>
		</Link>
	)
}
