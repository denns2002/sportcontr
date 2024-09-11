'use server'

import { SignInForm } from "./_components/signin-form"

function SignIn() {
	return (
		<div className='h-full w-full flex flex-col items-center '>
			<SignInForm />
		</div>
	)
}

export default SignIn
