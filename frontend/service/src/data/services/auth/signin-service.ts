import { SiginUserProps } from '@/types/auth'

export async function siginUserService(userData: SiginUserProps) {
	const url = new URL('/users/login/', process.env.API_BASE_URL)

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ ...userData }),
			cache: 'no-cache',
		})

		return response.json()
	} catch (error) {
		console.error('Signin Service Error:', error)

		throw error
	}
}
