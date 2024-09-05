'use server'

import { H1 } from '@/components/custom/headers'
import { ProfileEditForm } from './_components/profile-edit-form'
import { verifyUserService } from '@/data/services/auth'
import { User } from '@/interfaces/users'

async function ProfileEdit() {
	const data = { ...(await verifyUserService()) }.data as User

	return (
		<div className='h-full w-full flex justify-center'>
			<div className='w-full max-w-screen-xl mx-auto'>
				<H1>Редактировать профиль</H1>
				<ProfileEditForm
					email={data.email || ''}
					telephone={data?.userphonenumber_set?.[0].telephone || ''}
					user={data}
				/>
			</div>
		</div>
	)
}

export default ProfileEdit
