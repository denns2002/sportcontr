'use server'

import { H1 } from '@/components/custom/headers'
import { getNewsDetailsService } from '@/data/services/news'
import { NewsEditForm } from './_components/news-edit-form'
import { withAuth } from '@/hocs/';
import { notFound } from 'next/navigation';

interface NewsEditProps {
	params: { slug: string }
}

async function NewsEdit({ params }: NewsEditProps) {
	const data = await getNewsDetailsService(params.slug)

	if (data.detail) {
		notFound()
	}

	return (
		<div className='h-full w-full flex justify-center'>
			<div className='w-full max-w-screen-xl mx-auto'>
				<H1>Редактировать новость</H1>
				<NewsEditForm news={data} />
			</div>
		</div>
	)
}

export default withAuth(NewsEdit, ['admin'], true)
