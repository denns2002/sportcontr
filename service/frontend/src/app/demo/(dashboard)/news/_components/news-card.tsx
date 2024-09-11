import Image from 'next/image'
import Link from 'next/link'

import { parseDate } from '@/lib/dates'
import { Camera } from 'lucide-react'
import { News } from '@/app/demo/_interfaces/news'

interface NewsCardProps {
	news: News
}

export function NewsCard({ news }: NewsCardProps) {
	return (
		<Link
			href={`/demo/news/${news.slug}/`}
			className='w-[22rem] lg:w-[25rem] flex flex-col gap-5 bg-white p-5 shadow-md'
		>
			{news.image ? (
				<Image
					src={news.image}
					alt='image'
					width={1000}
					height={1000}
					className='object-cover h-[14.5rem] w-[19.5rem] lg:h-[13.6rem] lg:w-[22.5rem]'
				/>
			) : (
				<div className='flex justify-center items-center bg-gray-500 h-[14.5rem] w-[19.5rem] lg:h-[13.6rem] lg:w-[22.5rem]'>
					<Camera className='h-20 w-20 text-white' />
				</div>
			)}
			<span className='text-lg font-medium flex-1'>{news.title}</span>
			<div className='line-clamp-2'>{news.description}</div>
			<span className='text-end'>{parseDate(news.created_at || '')}</span>
		</Link>
	)
}
