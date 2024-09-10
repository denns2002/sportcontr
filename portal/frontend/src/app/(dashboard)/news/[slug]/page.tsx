'use server'

import { H1 } from '@/components/custom/headers'
import { getNewsDetailsService } from '@/data/services/news'
import { News } from '@/interfaces/news'
import Image from 'next/image'

import { parseDate } from '@/lib/dates'
import { ButtonLink } from '@/components/custom/links'
import { Camera, FileText } from 'lucide-react'
import { withAuth } from '@/hocs'
import { notFound } from 'next/navigation'

interface NewsDetailedProps {
	params: { slug: string }
	roles: Array<string>
}

async function NewsDetailed({ params, roles }: NewsDetailedProps) {
	const data = await getNewsDetailsService(params.slug)

	if (data.detail) {
		notFound()
	}

	return (
		<div className='h-full w-full flex flex-col gap-10'>
			<div className='h-fit w-full bg-white px-10 lg:px-10 py-10 shadow-md flex flex-col gap-10'>
				<H1>{data.title}</H1>
				<div className='w-full flex flex-row flex-wrap gap-5'>
					<div className='flex flex-col gap-2'>
						<div>
							<span className='font-medium text-lg'>Создано: </span>
							<span>{parseDate(data?.created_at || '')}</span>
						</div>
						<div>
							<span className='font-medium text-lg'>Изменено: </span>
							<span>{parseDate(data?.updated_at || '')}</span>
						</div>
					</div>
					<div className='flex-1' />
					<div className='flex items-end'>
						{roles.includes('admin') ? (
							<ButtonLink href={`/news/${data.slug}/edit/`}>
								<>
									<FileText className='h-5 w-5' />
									<span>Редактировать</span>
								</>
							</ButtonLink>
						) : null}
					</div>
				</div>
			</div>
			<div className='w-full px-10 lg:px-20'>
				<div className='flex flex-row justify-center flex-wrap gap-x-10 gap-y-5'>
					<div className='h-fit w-[22rem] lg:w-[25rem] flex flex-col gap-5'>
						<div className='h-fit w-[22rem] lg:w-[25rem] bg-white p-5 flex flex-col gap-5 shadow-md'>
							{data.image ? (
								<Image
									src={data.image}
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
					<div className='flex-1 sm:min-w-[30rem] bg-white p-5 shadow-md'>{data.description}</div>
				</div>
			</div>
		</div>
	)
}

export default withAuth(NewsDetailed, ['admin', 'trainer', 'sportsman'], false)
