import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyUserService } from '@/data/services/auth'

const protectedRoutes: string[] = []

export async function middleware(request: NextRequest) {
	const user = await verifyUserService()

	if (protectedRoutes.includes(request.nextUrl.pathname) && user.authenticated === false) {
		return NextResponse.redirect(new URL('/signin', request.url))
	}

	return NextResponse.next()
}
