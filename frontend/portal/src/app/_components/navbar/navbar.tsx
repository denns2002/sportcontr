'use server'

import { verifyUserService } from '@/data/services/auth'
import { Menu as NavMenu } from './menu'
import { ModalNavbar } from './modal'
import { cookies } from 'next/headers';
import { getRoles } from '@/lib/roles';

interface NavbarProps {
	modules: {
		events: boolean
		news: boolean
		groups: boolean
	}
	logo: string
}

export async function Navbar({ modules, logo }: NavbarProps) {
	const { authenticated, data } = await verifyUserService()

	const roles: Array<string> = getRoles(data)

	return (
		<aside className='h-full'>
			<div className='fixed top-0 bottom-0 left-0 h-full hidden lg:block'>
				<NavMenu
					modules={modules}
					authenticated={authenticated}
					lastName={data?.last_name || ''}
					firstName={data?.first_name || ''}
					roles={roles}
					avatar={data?.avatar}
					logo={logo}
				/>
			</div>
			<ModalNavbar
				modules={modules}
				authenticated={authenticated}
				lastName={data?.last_name || ''}
				firstName={data?.first_name || ''}
				roles={roles}
				avatar={data?.avatar}
				logo={logo}
			/>
		</aside>
	)
}
