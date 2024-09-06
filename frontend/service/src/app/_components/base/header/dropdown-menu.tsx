'use client'

import { Menu, UserRound } from 'lucide-react'
import { useState } from 'react'
import { DropdownLink } from './dropdown-link'
import { ButtonLink, TransparentLink } from '@/components/custom/links'
import Link from 'next/link'
import { TransparentButton } from '@/components/custom/buttons/transparent'
import Image from 'next/image'

interface DropdownMenuProps {
	navLinks: {
		href: string
		label: string
	}[]
	authenticated: boolean
	first_name: string
	last_name: string
	avatar: string
}

export function DropdownMenu({
	navLinks,
	authenticated,
	first_name,
	last_name,
	avatar,
}: DropdownMenuProps) {
	const [isActive, setIsActive] = useState(false)

	return (
		<>
			<div className='lg:hidden flex-1' />
			<div className='lg:hidden'>
				<TransparentButton
					type='button'
					full={false}
					size='small'
					handler={() => setIsActive((prev) => !prev)}
				>
					<Menu className='h-6 w-6' />
				</TransparentButton>
			</div>
			<div className={`lg:hidden z-50 ${!isActive && 'hidden'}`}>
				<div className='fixed inset-0 bg-gray-800 opacity-25' onClick={() => setIsActive(false)} />
				<div className='fixed top-5 right-0 bottom-5 max-w-sm w-5/6 bg-white py-10 flex flex-col overflow-y-auto rounded-l-2xl drop-shadow-md'>
					<Link href='/' className='font-semibold text-xl flex justify-center mb-10'>
						ЛОГОТИП
					</Link>
					<div className='flex flex-col'>
						{navLinks.map((link, index) => (
							<DropdownLink href={link.href} key={index}>
								{link.label}
							</DropdownLink>
						))}
						{authenticated && <DropdownLink href='projects'>Проекты</DropdownLink>}
					</div>
					<div className='flex-1' />
					{authenticated ? (
						<Link
							href='/profile/'
							className='flex flex-row items-center justify-center gap-5 px-10 group'
						>
							{avatar ? (
									<Image
										src={avatar}
										alt='avatar'
										width={500}
										height={500}
										className='object-cover h-[2.75rem] w-[2.75rem] rounded-full'
									/>
							) : (
								<div
									className='rounded-full bg-gray-500 p-1 drop-shadow-md hover:drop-shadow-lg hover:bg-opacity-80 transition-all duration-300'
								>
									<UserRound className='h-10 w-10 text-white' />
								</div>
							)}
							<div className='flex-1 flex flex-row flex-wrap gap-2 text-base font-medium group-hover:text-sky-500 transition-all duration-500'>
								<span>{last_name}</span>
								<span>{first_name}</span>
							</div>
						</Link>
					) : (
						<div className='flex flex-col gap-5 px-10'>
							<TransparentLink href='/signin'>Войти</TransparentLink>
							<ButtonLink href='/signup'>Зарегистрироваться</ButtonLink>
						</div>
					)}
				</div>
			</div>
		</>
	)
}
