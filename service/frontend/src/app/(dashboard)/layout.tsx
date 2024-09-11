import { Roboto } from 'next/font/google'
import '../globals.css'

import type { Metadata } from 'next'

import { Header } from '@/app/(dashboard)/_components/base/header'
import { Footer } from '@/app/(dashboard)/_components/base/footer'

export const metadata: Metadata = {
	title: 'Создайте свой портал!',
	description: 'Сервис для создания собственных порталов для спортивных организаций',
}

const roboto = Roboto({
	weight: ['100', '300', '400', '500', '700', '900'],
	subsets: ['latin', 'cyrillic', 'cyrillic-ext'],
	display: 'swap',
	variable: '--font-roboto',
	preload: false,
})

interface RootLayoutProps {
	children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang='ru' className='h-full w-full'>
			<body
				className={`${roboto.variable} font-roboto h-full w-full bg-sky-100 flex flex-col gap-10`}
			>
				<Header />
				<main className='w-full flex-1'>{children}</main>
				<Footer />
			</body>
		</html>
	)
}
