'use server'

import Link from 'next/link'
import { HeaderLink } from './header-link'
import { DropdownMenu } from './dropdown-menu'
import { ButtonLink, TransparentLink } from '@/components/custom/links'
import { UserRound } from 'lucide-react'
import { verifyUserService } from '@/data/services/auth'
import Image from 'next/image'

const NAV_LINKS = [
	{
		href: '/advantages/',
		label: 'Преимущества',
	},
	{
		href: '/tariffs/',
		label: 'Тарифы',
	},
	{
		href: '/demo/',
		label: 'Демо-просмотр',
	},
]

export async function Header() {
	const { authenticated, data: user } = await verifyUserService()

	return (
		<header className='w-full mt-5 h-20 py-8 max-w-screen-xl mx-auto bg-white rounded-2xl flex items-center px-10 shadow-md'>
			<Link href='/' className='font-semibold text-xl'>
				ЛОГОТИП
			</Link>
			<nav className='hidden lg:flex flex-1 gap-14 justify-center items-center'>
				{NAV_LINKS.map((link, index) => (
					<HeaderLink href={link.href} key={index}>
						{link.label}
					</HeaderLink>
				))}
			</nav>
			{authenticated ? (
				<div className='lg:flex flex-row gap-14 h-full hidden justify-center items-center'>
					<HeaderLink href='/projects/'>Проекты</HeaderLink>
					{user.avatar ? (
						<Link href='/profile/'>
							<Image
								src={user.avatar}
								alt='avatar'
								width={500}
								height={500}
								className='object-cover h-[2.75rem] w-[2.75rem] rounded-full'
							/>
						</Link>
					) : (
						<Link
							href='/profile/'
							className='rounded-full bg-gray-500 p-1 drop-shadow-md hover:drop-shadow-lg hover:bg-opacity-80 transition-all duration-300'
						>
							<UserRound className='h-10 w-10 text-white' />
						</Link>
					)}
				</div>
			) : (
				<div className='h-full hidden lg:flex justify-center items-center gap-2'>
					<TransparentLink href='/signin/'>Войти</TransparentLink>
					<ButtonLink href='/signup/'>Зарегистрироваться</ButtonLink>
				</div>
			)}
			<DropdownMenu navLinks={NAV_LINKS} authenticated={authenticated} first_name={user?.first_name} last_name={user?.last_name} avatar={user?.avatar} />
		</header>
	)
}
