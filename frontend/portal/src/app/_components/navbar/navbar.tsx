'use server'

import { verifyUserService } from '@/data/services/auth'
import { Menu as NavMenu } from './menu'
import { ModalNavbar } from './modal'

export async function Navbar() {
	const { authenticated, data } = await verifyUserService()

	return (
		<aside className='h-full'>
			<div className='fixed top-0 bottom-0 left-0 h-full hidden lg:block'>
				<NavMenu authenticated={authenticated} lastName={data?.last_name || ''} firstName={data?.first_name || ''} />
			</div>
			<ModalNavbar authenticated={authenticated} lastName={data?.last_name || ''} firstName={data?.first_name || ''} />
		</aside>
	)
}
