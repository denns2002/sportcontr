import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyUserService } from '@/data/services/auth'
import { getSettingsService } from './data/services/settings'

const protectedRoutes: string[] = ['/profile/', '/groups/', '/schedule/', '/settings/']

const authRoutes: string[] = ['/signin/']

function checkIfStringStartsWith(toCheck: string, substrings: string[]) {
	return substrings.some((substring) => toCheck.startsWith(substring))
}

export async function middleware(request: NextRequest) {
	const user = await verifyUserService()
	const settings = await getSettingsService()

	const modules = [
		{isActive: settings.news || false, path: '/news/'},
		{isActive: settings.events || false, path: '/events/'},
		{isActive: settings.groups || false, path: '/groups/'},
]

	const url = request.nextUrl.pathname

	if (
		checkIfStringStartsWith(url, protectedRoutes) &&
		user.authenticated === false
	) {
		return NextResponse.redirect(new URL('/signin/', request.url))
	}

	if (authRoutes.includes(url) && user.authenticated === true) {
		return NextResponse.redirect(new URL('/', request.url))
	}

	if (modules.some(module => module.path === url && !module.isActive)) {
		return NextResponse.redirect(new URL('/', request.url))
	}

	return NextResponse.next()
}
