'use server'

import { SignUpForm } from "@/components/forms"

function SignUp() {
	return (
		<div className='h-full w-full flex flex-col items-center gap-10'>
			<SignUpForm />
		</div>
	)
}

export default SignUp
