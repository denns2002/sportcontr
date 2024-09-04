import { Roboto, Montserrat, Noto_Sans, Onest } from 'next/font/google'

import { Navbar } from '@/app/_components/navbar'
import { getSettingsService } from '@/data/services/settings'

import type { Metadata, ResolvingMetadata } from 'next'

import './globals.css'

import icon from '@/static/favicon.ico'

const roboto = Roboto({
	weight: ['100', '300', '400', '500', '700', '900'],
	subsets: ['latin', 'cyrillic', 'cyrillic-ext'],
	display: 'swap',
	variable: '--font-roboto',
	preload: false,
})

const montserrat = Montserrat({
	weight: ['100', '300', '400', '500', '700', '900'],
	subsets: ['latin', 'cyrillic', 'cyrillic-ext'],
	display: 'swap',
	variable: '--font-montserrat',
	preload: false,
})

const notosans = Noto_Sans({
	weight: ['100', '300', '400', '500', '700', '900'],
	subsets: ['latin', 'cyrillic', 'cyrillic-ext'],
	display: 'swap',
	variable: '--font-notosans',
	preload: false,
})

const onest = Onest({
	weight: ['100', '300', '400', '500', '700', '900'],
	subsets: ['latin', 'cyrillic', 'cyrillic-ext'],
	display: 'swap',
	variable: '--font-onest',
	preload: false,
})

type Props = {
	params: { id: string }
	searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
	{ params, searchParams }: Props,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const settings = await getSettingsService()

	return {
		title: settings.title || 'Cringe',
		icons: {
			icon: settings.favicon || { rel: 'icon', url: icon.src },
		},
	}
}

interface RootLayoutProps {
	children: React.ReactNode
}

const INIT_SETTINGS = {
	palette: 'sky',
	typography: 'font-roboto',
}

export default async function RootLayout({ children }: RootLayoutProps) {
	const settings = await getSettingsService()

	return (
		<html
			lang='ru'
			className={`h-full w-full ${roboto.variable} ${montserrat.variable} ${notosans.variable} ${onest.variable}`}
		>
			<body
				className={`${settings.typography || INIT_SETTINGS.typography} ${
					settings.palette || INIT_SETTINGS.palette
				} min-h-full w-full bg-background flex flex-row`}
			>
				<Navbar
					modules={{
						news: settings.news || false,
						events: settings.events || false,
						groups: settings.groups || false,
					}}
				/>
				<main className='min-h-[100vh] w-full px-10 lg:ml-72 lg:px-20 py-10'>{children}</main>
			</body>
		</html>
	)
}
