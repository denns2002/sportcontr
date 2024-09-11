'use server'

import { H1 } from '@/components/custom/headers'
import { NewsEditForm } from './_components/news-edit-form'
import { notFound } from 'next/navigation'

import image from '../../../../_static/images.jpeg'

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

async function NewsEdit() {
	return (
		<div className='h-full w-full flex flex-col gap-10'>
			<div className='h-fit w-full bg-white px-10 lg:px-10 py-10 shadow-md flex flex-col gap-10'>
				<H1>Редактировать новость</H1>
			</div>
			<div className='w-full px-10 lg:px-20'>
				<div className='w-full max-w-screen-xl mx-auto flex flex-col gap-5'>
					<NewsEditForm news={news} />
				</div>
			</div>
		</div>
	)
}

export default NewsEdit
