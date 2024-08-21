'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const config = {
	maxAge: 60 * 60 * 24 * 7, // 1 неделя
	path: '/',
	domain: process.env.HOST ?? 'localhost',
	httpOnly: true,
	secure: process.env.NODE_ENV === 'production',
}

export async function signoutAction() {
	cookies().set('token', '', { ...config, maxAge: 0 })

	redirect('/')
}
