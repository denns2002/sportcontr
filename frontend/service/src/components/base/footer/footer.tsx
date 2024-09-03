import { FooterLink } from './footer-link'

export function Footer() {
	const navLinks = [
		{
			href: '#',
			label: 'О нас',
		},
		{
			href: '#',
			label: 'Лицензция',
		},
		{
			href: '#',
			label: 'Связаться с нами',
		},
	]

	return (
		<footer className='min-h-32 w-full bg-slate-50 flex lg:flex-row flex-col lg:gap-0 gap-2 justify-center items-center lg:px-28 px-10 py-10'>
			<span className='text-gray-500 text-base'>
				© 2024 Веб-конструктор<sup className='text-xs'>TM</sup>. Все права защищены.
			</span>
			<div className='flex-1' />
			<nav className='flex flex-row lg:gap-x-10 gap-5 flex-wrap justify-center items-center'>
				{navLinks.map((link, index) => (
					<FooterLink href={link.href} key={index}>
						{link.label}
					</FooterLink>
				))}
			</nav>
		</footer>
	)
}
