'use server'

import { H1 } from '@/components/custom/headers'
import { ProfileEditForm } from './_components/profile-edit-form'
import { verifyUserService } from '@/data/services/auth'
import { User } from '@/interfaces/users'

async function ProfileEdit() {
	const data = { ...(await verifyUserService()) }.data as User

	return (
		<div className='h-full w-full flex flex-col gap-10'>
			<div className='h-fit w-full bg-white px-10 lg:px-10 py-10 shadow-md flex flex-col gap-10'>
				<H1>Редактировать профиль</H1>
			</div>
			<div className='w-full px-10 lg:px-20'>
				<div className='w-full max-w-screen-xl mx-auto flex flex-col gap-5'>
					<ProfileEditForm
						email={data?.email || ''}
						telephone={data?.userphonenumber_set?.[0]?.telephone || ''}
						user={data}
					/>
				</div>
			</div>
		</div>
	)
}

export default ProfileEdit
