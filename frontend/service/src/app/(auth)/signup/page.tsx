'use server'

import { SignUpForm } from "./_components/signup-form"

function SignUp() {
	return (
		<div className='h-full w-full flex flex-col items-center gap-10'>
			<SignUpForm />
		</div>
	)
}

export default SignUp
