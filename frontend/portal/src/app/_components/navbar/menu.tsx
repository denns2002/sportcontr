import Link from 'next/link'
import { HeaderLink } from './link'
import { Newspaper, Calendar, Settings, Users, User } from 'lucide-react'
import { TransparentLink } from '@/components/custom/links'
import Image from 'next/image'

const NAV_LINKS = [
	{
		name: 'news',
		href: '/news/',
		label: 'Новости',
		icon: <Newspaper />,
		isPublic: true,
		roles: ['admin', 'trainer', 'sportsman'],
	},
	{
		name: 'events',
		href: '/events/',
		label: 'Мероприятия',
		icon: <Calendar />,
		isPublic: true,
		roles: ['admin', 'trainer', 'sportsman'],
	},
	{
		name: 'groups',
		href: '/groups/',
		label: 'Группы',
		icon: <Users />,
		isPublic: false,
		roles: ['admin', 'trainer'],
	},
]

interface MenuProps {
	authenticated: boolean
	lastName: string
	firstName: string
	avatar: string
	logo: string
	modules: {
		events: boolean
		news: boolean
		groups: boolean
	}
	roles: Array<string>
}

export function Menu({ authenticated, lastName, firstName, modules, roles, avatar, logo }: MenuProps) {
	type modulesKeys = keyof typeof modules

	console.log(logo);
	

	return (
		<nav className='h-full w-72 bg-primary py-8 flex flex-col overflow-y-auto'>
			<div className='flex flex-col'>
				{NAV_LINKS.map((link, index) => {
					if (
						!modules[link.name as modulesKeys] ||
						(!link.isPublic && !authenticated) ||
						!link.roles.some((role) => roles.includes(role))
					) {
						return null
					}

					return (
						<HeaderLink href={link.href} key={index}>
							<>
								{link.icon}
								<span>{link.label}</span>
							</>
						</HeaderLink>
					)
				})}
				{authenticated && roles.includes('admin') && (
					<HeaderLink href='/settings/'>
						<>
							<Settings />
							<span>Настройки</span>
						</>
					</HeaderLink>
				)}
			</div>
			<div className='flex-1' />
			{authenticated ? (
				<Link
					href='/profile'
					className='flex flex-row items-center justify-center gap-5 px-5 group hover:bg-hover transition-all duration-300 py-3'
				>
					{avatar ? (
						<div className='h-[2.75rem] w-[2.75rem] flex justify-center items-center'>
							<Image
								src={avatar}
								alt='avatar'
								width={1000}
								height={1000}
								className='object-cover h-[2.75rem] w-2.75rem]'
							/>
						</div>
					) : (
						<div className='bg-white p-1 drop-shadow-md'>
							<User className='h-10 w-10 text-primary' />
						</div>
					)}
					<div className='flex-1 text-base font-medium text-white group-hover:text-active transition-all duration-300 flex flex-col'>
						<span>{lastName}</span>
						<span>{firstName}</span>
					</div>
				</Link>
			) : (
				<div className='px-5 text-white'>
					<TransparentLink href='/signin/'>Войти</TransparentLink>
				</div>
			)}
		</nav>
	)
}
