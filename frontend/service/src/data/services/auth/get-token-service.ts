import { cookies } from 'next/headers'

export async function getTokenService() {
	return cookies().get('token')?.value
}
