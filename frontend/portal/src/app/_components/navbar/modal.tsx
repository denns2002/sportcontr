'use client'

import { DefaultButton } from '@/components/custom/buttons'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Menu as NavMenu } from './menu'

type ModalNavbar = {
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

export function ModalNavbar({
	authenticated,
	lastName,
	firstName,
	modules,
	roles,
	avatar,
	logo,
}: ModalNavbar) {
	const [isActive, setIsActive] = useState(false)

	return (
		<>
			<div className='fixed top-0 right-0 z-50 lg:hidden'>
				<DefaultButton
					type='button'
					full={false}
					size='small'
					handler={() => setIsActive((prev) => !prev)}
				>
					{isActive ? <X className='h-8 w-8' /> : <Menu className='h-8 w-8' />}
				</DefaultButton>
			</div>
			{isActive && (
				<div className={`h-full lg:hidden z-50 ${!isActive && 'hidden'}`}>
					<div className='fixed inset-0 bg-gray-800 opacity-25' />
					<div className='fixed top-0 left-0 bottom-0'>
						<NavMenu
							roles={roles}
							modules={modules}
							authenticated={authenticated}
							lastName={lastName}
							firstName={firstName}
							avatar={avatar}
							logo={logo}
						/>
					</div>
				</div>
			)}
		</>
	)
}
