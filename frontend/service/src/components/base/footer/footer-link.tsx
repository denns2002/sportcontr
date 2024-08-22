import Link from 'next/link'

type FooterLinkProps = {
	href: string
	children: React.ReactElement | string
}

export function FooterLink({ href, children }: FooterLinkProps) {
  return (
      <Link href={href} className='text-base text-gray-500 hover:underline'>
        {children}
      </Link>
  )
}
