import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyUserService } from '@/data/services/auth'

const protectedRoutes: string[] = ['/profile/', '/projects/']

const authRoutes: string[] = ['/signin/', '/signup/']

function checkIfStringStartsWith(toCheck: string, substrings: string[]) {
	return substrings.some((substring) => toCheck.startsWith(substring))
}

export async function middleware(request: NextRequest) {
	const response = await verifyUserService()

	const headers = new Headers(request.headers)

	if (!response.authenticated) {
		headers.set('Set-Cookie', 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT')
	}

	if (
		checkIfStringStartsWith(request.nextUrl.pathname, protectedRoutes) &&
		response.authenticated === false
	) {
		return NextResponse.redirect(new URL('/signin', request.url))
	}

	if (authRoutes.includes(request.nextUrl.pathname) && response.authenticated === true) {
		return NextResponse.redirect(new URL('/', request.url))
	}

	return NextResponse.next({ headers })
}
