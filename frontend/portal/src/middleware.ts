'use server'

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyUserService } from '@/data/services/auth'
import { getSettingsService } from './data/services/settings'

export async function middleware(request: NextRequest) {
	const response = await verifyUserService('middleware')

	const headers = new Headers(request.headers)

	if (!response.authenticated) {
		headers.set('Set-Cookie', 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT')
	}

	const settings = await getSettingsService()

	const authRoutes: string[] = ['/signin/']

	const modules = [
		{ isActive: settings.news || false, path: '/news/' },
		{ isActive: settings.events || false, path: '/events/' },
		{ isActive: settings.groups || false, path: '/groups/' },
	]

	const url = request.nextUrl.pathname

	if (authRoutes.includes(url) && response.authenticated === true) {
		return NextResponse.redirect(new URL('/', request.url))
	}

	if (modules.some((module) => module.path === url && !module.isActive)) {
		return NextResponse.redirect(new URL('/', request.url))
	}

	return NextResponse.next({ headers })
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
}
