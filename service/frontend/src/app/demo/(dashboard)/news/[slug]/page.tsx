'use server'

import { H1 } from '@/app/demo/_components/components/custom/headers'
import image from '../../../_static/images.jpeg'
import { parseDate } from '@/lib/dates'
import { ButtonLink } from '@/app/demo/_components/components/custom/links'
import { Camera, FileText } from 'lucide-react'
import Image from 'next/image'

const news = {
	title: 'Сумасшедшая новость',
	description:
		'А ещё предприниматели в сети интернет, которые представляют собой яркий пример континентально-европейского типа политической культуры, будут объективно рассмотрены соответствующими инстанциями. Разнообразный и богатый опыт говорит нам, что начало повседневной работы по формированию позиции не даёт нам иного выбора, кроме определения поэтапного и последовательного развития общества. Есть над чем задуматься: действия представителей оппозиции преданы социально-демократической анафеме.',
	is_published: true,
	slug: 'HjFDfZ',
	image: image,
	author: 1,
	created_at: '2018-06-12T19:30',
	updated_at: '2018-06-12T19:30',
}

async function NewsDetailed() {
	return (
		<div className='h-full w-full flex flex-col gap-10'>
			<div className='h-fit w-full bg-white px-10 lg:px-10 py-10 shadow-md flex flex-col gap-10'>
				<H1>{news.title}</H1>
				<div className='w-full flex flex-row flex-wrap gap-5'>
					<div className='flex flex-col gap-2'>
						<div>
							<span className='font-medium text-lg'>Создано: </span>
							<span>{parseDate(news?.created_at || '')}</span>
						</div>
						<div>
							<span className='font-medium text-lg'>Изменено: </span>
							<span>{parseDate(news?.updated_at || '')}</span>
						</div>
					</div>
					<div className='flex-1' />
					<div className='flex items-end'>
						<ButtonLink href={`/demo/news/${news.slug}/edit/`}>
							<>
								<FileText className='h-5 w-5' />
								<span>Редактировать</span>
							</>
						</ButtonLink>
					</div>
				</div>
			</div>
			<div className='w-full px-10 lg:px-20'>
				<div className='flex flex-row justify-center flex-wrap gap-x-10 gap-y-5'>
					<div className='h-fit w-[22rem] lg:w-[25rem] flex flex-col gap-5'>
						<div className='h-fit w-[22rem] lg:w-[25rem] bg-white p-5 flex flex-col gap-5 shadow-md'>
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
						</div>
					</div>
					<div className='flex-1 sm:min-w-[30rem] bg-white p-5 shadow-md'>{news.description}</div>
				</div>
			</div>
		</div>
	)
}

export default NewsDetailed
