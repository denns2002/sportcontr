'use server'

import { verifyUserService } from '@/data/services/auth'
import { Menu as NavMenu } from './menu'
import { ModalNavbar } from './modal'

interface NavbarProps {
	modules: {
		events: boolean
		news: boolean
		groups: boolean
	}
}

export async function Navbar({ modules }: NavbarProps) {
	const { authenticated, data } = await verifyUserService()

	return (
		<aside className='h-full'>
			<div className='fixed top-0 bottom-0 left-0 h-full hidden lg:block'>
				<NavMenu
					modules={modules}
					authenticated={authenticated}
					
					lastName={data?.last_name || ''}
					firstName={data?.first_name || ''}

				/>
			</div>
			<ModalNavbar
				modules={modules}
				authenticated={authenticated}
				lastName={data?.last_name || ''}
				firstName={data?.first_name || ''}
			/>
		</aside>
	)
}
