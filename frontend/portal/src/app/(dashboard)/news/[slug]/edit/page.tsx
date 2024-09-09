'use server'

import { H1 } from '@/components/custom/headers'
import { getNewsDetailsService } from '@/data/services/news'
import { NewsEditForm } from './_components/news-edit-form'
import { withAuth } from '@/hocs/'
import { notFound } from 'next/navigation'

interface NewsEditProps {
	params: { slug: string }
}

async function NewsEdit({ params }: NewsEditProps) {
	const data = await getNewsDetailsService(params.slug)

	if (data.detail) {
		notFound()
	}

	return (
		<div className='h-full w-full flex flex-col gap-10'>
			<div className='h-fit w-full bg-white px-10 lg:px-10 py-10 shadow-md flex flex-col gap-10'>
				<H1>Редактировать новость</H1>
			</div>
			<div className='w-full px-10 lg:px-20'>
				<div className='w-full max-w-screen-xl mx-auto flex flex-col gap-5'>
					<NewsEditForm news={data} />
				</div>
			</div>
		</div>
	)
}

export default withAuth(NewsEdit, ['admin'], true)
