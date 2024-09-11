import Link from 'next/link'
import { HeaderLink } from './link'
import { Newspaper, Calendar, Settings, Users, User, Contact } from 'lucide-react'
import { TransparentLink } from '@/components/custom/links'
import Image from 'next/image'

const NAV_LINKS = [
	{
		name: 'news',
		href: '/demo/news/',
		label: 'Новости',
		icon: <Newspaper />,
		isPublic: true,
		roles: ['admin', 'trainer', 'sportsman'],
	},
	{
		name: 'events',
		href: '/demo/events/',
		label: 'Мероприятия',
		icon: <Calendar />,
		isPublic: true,
		roles: ['admin', 'trainer', 'sportsman'],
	},
	{
		name: 'groups',
		href: '/demo/groups/',
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

export function Menu({
	authenticated,
	lastName,
	firstName,
	modules,
	roles,
	avatar,
	logo,
}: MenuProps) {
	type modulesKeys = keyof typeof modules

	return (
		<nav className='h-full w-72 bg-primary py-8 flex flex-col overflow-y-auto gap-8'>
			{logo ? (
				<div className='flex justify-center items-center'>
					<Image src={logo} alt='avatar' width={1000} height={1000} className='object-cover w-64' />
				</div>
			) : (
				<div className='font-bold text-white text-3xl flex justify-center items-center'>
					ЛОГОТИП
				</div>
			)}
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
					<>
						<HeaderLink href='/demo/users/'>
							<>
								<Contact />
								<span>Пользователи</span>
							</>
						</HeaderLink>
						<HeaderLink href='/demo/settings/'>
							<>
								<Settings />
								<span>Настройки</span>
							</>
						</HeaderLink>
					</>
				)}
			</div>
			<div className='flex-1' />
			<HeaderLink href='/'><>Обратно в сервис</></HeaderLink>
			{authenticated ? (
				<Link
					href='/demo/profile/'
					className='flex flex-row items-center justify-center gap-5 px-5 group hover:bg-hover transition-all duration-300 py-3'
				>
					{avatar ? (
						<div className='h-[2.75rem] w-[2.75rem] flex justify-center items-center'>
							<Image
								src={avatar}
								alt='avatar'
								width={1000}
								height={1000}
								className='object-cover h-[2.75rem] w-[2.75rem]'
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
