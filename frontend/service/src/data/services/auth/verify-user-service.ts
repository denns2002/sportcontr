import { getTokenService } from './get-token-service'

export async function verifyUserService() {
	const url = new URL('/users/verify/', process.env.API_BASE_URL)

	const token = await getTokenService()

	if (!token) {
		return { authenticated: false, data: null, error: null }
	}

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ token: token }),
			cache: 'no-cache',
		})

		const responseData = await response.json()

		if (responseData.detail) {
			return { authenticated: false, data: null, error: responseData.detail }
		}

		console.log(responseData)

		return { authenticated: true, data: responseData.user, error: null }
	} catch (error) {
		console.log(error)

		return { authenticated: false, data: null, error: error }
	}
}
