import Link from 'next/link'

interface HeaderLinkProps {
	href: string
	children: React.ReactElement | string
}

export function HeaderLink({ href, children }: HeaderLinkProps) {
  return (
      <Link href={href} className='text-base hover:text-sky-500 transition-all duration-300 font-medium'>
        {children}
      </Link>
  )
}
