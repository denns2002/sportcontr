import { H1 } from '../../_components/components/custom/headers'
import { News as NewsType } from '@/app/demo/_interfaces/news'
import { ButtonLink } from '../../_components/components/custom/links'
import { FilePlus2 } from 'lucide-react'
import { NewsCard } from './_components/news-card'

import image from '../../_static/images.jpeg'

interface Props {
	searchParams: { [key: string]: string | string[] | undefined }
	roles: Array<string>
}

const news = [
	{
		title: 'Сумасшедшая новость',
		description:
			'А ещё предприниматели в сети интернет, которые представляют собой яркий пример континентально-европейского типа политической культуры, будут объективно рассмотрены соответствующими инстанциями. Разнообразный и богатый опыт говорит нам, что начало повседневной работы по формированию позиции не даёт нам иного выбора, кроме определения поэтапного и последовательного развития общества. Есть над чем задуматься: действия представителей оппозиции преданы социально-демократической анафеме.',
		is_published: true,
		slug: 'HjFDfZ',
		image: image,
		author: 1,
		created_at: '2018-06-12T19:30',
		updated_at: '2018-06-12T19:30',
	},
	{
		title: 'Сумасшедшая новость',
		description:
			'А ещё предприниматели в сети интернет, которые представляют собой яркий пример континентально-европейского типа политической культуры, будут объективно рассмотрены соответствующими инстанциями. Разнообразный и богатый опыт говорит нам, что начало повседневной работы по формированию позиции не даёт нам иного выбора, кроме определения поэтапного и последовательного развития общества. Есть над чем задуматься: действия представителей оппозиции преданы социально-демократической анафеме.',
		is_published: false,
		slug: 'HjFDfZ',
		image: image,
		author: 1,
		created_at: '2018-06-12T19:30',
		updated_at: '2018-06-12T19:30',
	},
	{
		title: 'Сумасшедшая новость',
		description:
			'А ещё предприниматели в сети интернет, которые представляют собой яркий пример континентально-европейского типа политической культуры, будут объективно рассмотрены соответствующими инстанциями. Разнообразный и богатый опыт говорит нам, что начало повседневной работы по формированию позиции не даёт нам иного выбора, кроме определения поэтапного и последовательного развития общества. Есть над чем задуматься: действия представителей оппозиции преданы социально-демократической анафеме.',
		is_published: true,
		slug: 'HjFDfZ',
		image: image,
		author: 1,
		created_at: '2018-06-12T19:30',
		updated_at: '2018-06-12T19:30',
	},
	{
		title: 'Сумасшедшая новость',
		description:
			'А ещё предприниматели в сети интернет, которые представляют собой яркий пример континентально-европейского типа политической культуры, будут объективно рассмотрены соответствующими инстанциями. Разнообразный и богатый опыт говорит нам, что начало повседневной работы по формированию позиции не даёт нам иного выбора, кроме определения поэтапного и последовательного развития общества. Есть над чем задуматься: действия представителей оппозиции преданы социально-демократической анафеме.',
		is_published: false,
		slug: 'HjFDfZ',
		image: image,
		author: 1,
		created_at: '2018-06-12T19:30',
		updated_at: '2018-06-12T19:30',
	},
	{
		title: 'Сумасшедшая новость',
		description:
			'А ещё предприниматели в сети интернет, которые представляют собой яркий пример континентально-европейского типа политической культуры, будут объективно рассмотрены соответствующими инстанциями. Разнообразный и богатый опыт говорит нам, что начало повседневной работы по формированию позиции не даёт нам иного выбора, кроме определения поэтапного и последовательного развития общества. Есть над чем задуматься: действия представителей оппозиции преданы социально-демократической анафеме.',
		is_published: true,
		slug: 'HjFDfZ',
		image: image,
		author: 1,
		created_at: '2018-06-12T19:30',
		updated_at: '2018-06-12T19:30',
	},
]

async function News({ searchParams, roles }: Props) {
	const isPublished = searchParams['is_published']

	if (isPublished) {
		var data = news.filter((news) => (isPublished === 'true' ? true : false) === news.is_published)
	} else {
		var data = news
	}

	return (
		<div className='h-full w-full flex flex-col gap-10'>
			<div className='h-fit w-full bg-white px-10 lg:px-10 py-10 shadow-md flex flex-col gap-10'>
				<H1>Новости</H1>
				<div className='w-full flex flex-row flex-wrap gap-5'>
					<div className='flex flex-wrap flex-row gap-5'>
						<ButtonLink href='/demo/news/' color={!isPublished ? 'primary' : 'gray'}>
							Все
						</ButtonLink>
						<ButtonLink
							href='/demo/news/?is_published=true'
							color={isPublished === 'true' ? 'primary' : 'gray'}
						>
							Опубликованные
						</ButtonLink>
						<ButtonLink
							href='/demo/news/?is_published=false'
							color={isPublished === 'false' ? 'primary' : 'gray'}
						>
							Неопубликованные
						</ButtonLink>
					</div>
					<div className='flex-1' />
					<ButtonLink href='/demo/news/create/'>
						<>
							<FilePlus2 className='h-5 w-5' /> Создать новость
						</>
					</ButtonLink>
				</div>
			</div>
			<div className='w-full px-10 lg:px-20'>
				<div className='w-full max-w-screen-xl mx-auto flex flex-col gap-5'>
					<div className='flex flex-row flex-wrap justify-center gap-5'>
						{data?.map((news, index) => (
							<NewsCard news={news} key={index} />
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default News
