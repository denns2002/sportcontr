import { Roboto, Montserrat, Noto_Sans, Onest } from 'next/font/google'

import { Navbar } from '@/app/demo/_components/navbar'

import type { Metadata, ResolvingMetadata } from 'next'

import '../../globals.css'

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

interface Props {
	params: { id: string }
	searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
	{ params, searchParams }: Props,
	parent: ResolvingMetadata
): Promise<Metadata> {
	return {
		title: 'Портал',
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

	return (
		<html
			lang='ru'
			className={`h-full w-full ${roboto.variable} ${montserrat.variable} ${notosans.variable} ${onest.variable}`}
		>
			<body
				className={`${INIT_SETTINGS.typography} ${
					INIT_SETTINGS.palette
				} min-h-full w-full bg-background flex flex-row`}
			>
				<Navbar
					modules={{
						news: true,
						events: true,
						groups: true,
					}}
					logo={''}
				/>
				<main className='min-h-[100vh] w-full lg:ml-72 pb-10'>{children}</main>
			</body>
		</html>
	)
}
