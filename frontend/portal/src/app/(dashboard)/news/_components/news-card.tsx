import { News } from '@/interfaces/news'
import Image from 'next/image'
import Link from 'next/link'

import placeholder from '@/static/promise.jpg'
import { parseDateShort } from '@/lib/dates'

interface NewsCardProps {
	news: News
}

export function NewsCard({ news }: NewsCardProps) {
	return (
		<Link href={`/news/${news.slug}/`} className='w-[22rem] lg:w-[25rem] flex flex-col gap-5 bg-white p-5 shadow-md'>
			<Image
				src={placeholder}
				alt='image'
				className='object-cover h-[14.5rem] w-[19.5rem] lg:h-[13.6rem] lg:w-[22.5rem]'
			/>
			<span className='text-lg font-medium flex-1'>{news.title}</span>
			<div className='line-clamp-2'>{news.description}</div>
			<span className='text-end'>{parseDateShort(news.updated_at || '')}</span>
		</Link>
	)
}
