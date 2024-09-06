'use server'

import { verifyUserService } from "@/data/services/auth"
import { ProfileEditForm } from "./_components/profile-edit-form"
import { H1 } from "@/components/custom/headers"
import { User } from "@/interfaces/users"

async function EditProfile() {
	const data = { ...(await verifyUserService()) }.data as User

	return (
		<div className='h-full w-full flex justify-center'>
			<div className='w-full max-w-screen-xl mx-auto'>
				<H1>Редактировать профиль</H1>
				<ProfileEditForm
					user={data}
				/>
			</div>
		</div>
	)
}

export default EditProfile
