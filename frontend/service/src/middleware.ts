import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyUserService } from '@/data/services/auth'

const protectedRoutes: string[] = ['/profile/', '/projects/']

const authRoutes: string[] = ['/signin/', '/signup/']

function checkIfStringStartsWith(toCheck: string, substrings: string[]) {
	return substrings.some((substring) => toCheck.startsWith(substring))
}

export async function middleware(request: NextRequest) {
	const user = await verifyUserService()

	if (
		checkIfStringStartsWith(request.nextUrl.pathname, protectedRoutes) &&
		user.authenticated === false
	) {
		return NextResponse.redirect(new URL('/signin', request.url))
	}

	if (authRoutes.includes(request.nextUrl.pathname) && user.authenticated === true) {
		return NextResponse.redirect(new URL('/', request.url))
	}

	return NextResponse.next()
}
