import { H1 } from '@/components/custom/headers'
import { ButtonLink } from '@/components/custom/links'
import { FilePlus2 } from 'lucide-react'
import { getNewsService } from '@/data/services/news'
import { News as NewsType } from '@/interfaces/news'
import { NewsCard } from './_components/news-card'
import { withAuth } from '@/hocs'

interface Props {
	searchParams: { [key: string]: string | string[] | undefined }
	roles: Array<string>
}

async function News({ searchParams, roles }: Props) {
	const isPublished = searchParams['is_published']

	if (isPublished) {
		var data = (await getNewsService(isPublished === 'true' ? true : false)) as Array<NewsType>
	} else {
		var data = (await getNewsService()) as Array<NewsType>
	}

	return (
		<div className='h-full w-full flex flex-col gap-10'>
			<div className='h-fit w-full bg-white px-10 lg:px-10 py-10 shadow-md flex flex-col gap-10'>
				<H1>Новости</H1>
				{roles.includes('admin') ? (
					<div className='w-full flex flex-row flex-wrap gap-5'>
						<div className='flex flex-wrap flex-row gap-5'>
							<ButtonLink href='/news/' color={!isPublished ? 'primary' : 'gray'}>
								Все
							</ButtonLink>
							<ButtonLink
								href='/news/?is_published=true'
								color={isPublished === 'true' ? 'primary' : 'gray'}
							>
								Опубликованные
							</ButtonLink>
							<ButtonLink
								href='/news/?is_published=false'
								color={isPublished === 'false' ? 'primary' : 'gray'}
							>
								Неопубликованные
							</ButtonLink>
						</div>
						<div className='flex-1' />
						<ButtonLink href='/news/create/'>
							<>
								<FilePlus2 className='h-5 w-5' /> Создать новость
							</>
						</ButtonLink>
					</div>
				) : null}
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

export default withAuth(News, ['admin', 'trainer', 'sportsman'], false)
