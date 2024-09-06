import { H1 } from '@/components/custom/headers'
import { ButtonLink } from '@/components/custom/links'
import { Plus } from 'lucide-react'
import { getNewsService } from '@/data/services/news'
import { News as NewsType } from '@/interfaces/news'
import { NewsCard } from './_components/news-card'
import { verifyUserService } from '@/data/services/auth'
import { getRoles } from '@/lib/roles'
import { withAuth } from '@/hocs'

interface Props {
	searchParams: { [key: string]: string | string[] | undefined }
	roles: Array<string>
}

async function News({ searchParams, roles }: Props) {
	const isPublished = searchParams['is_published']

	console.log(isPublished);
	

	if (isPublished) {
		var data = (await getNewsService(
			isPublished === 'true' ? true : false
		)) as Array<NewsType>
	} else {
		var data = (await getNewsService()) as Array<NewsType>
	}

	return (
		<div className='h-full w-full flex justify-center'>
			<div className='w-full max-w-screen-xl mx-auto'>
				<H1>Новости</H1>
				{roles.includes('admin') ? (
					<div className='flex flex-row flex-wrap gap-5 items-center'>
						<span className='text-xl font-semibold'>Хотите добавить новую новость?</span>
						<ButtonLink href='/news/create/' size='small'>
							<Plus className='h-5 w-5' />
						</ButtonLink>
						<div className='flex-1' />
						<div className='flex flex-wrap flex-row gap-5'>
							<ButtonLink href='/news/' color={!isPublished ? 'primary' : 'gray'} size='small'>
								Все
							</ButtonLink>
							<ButtonLink href='/news/?is_published=true' color={isPublished === 'true' ? 'primary' : 'gray'} size='small'>
								Опубликованные
							</ButtonLink>
							<ButtonLink href='/news/?is_published=false' color={isPublished === 'false' ? 'primary' : 'gray'} size='small'>
								Неопубликованные
							</ButtonLink>
						</div>
					</div>
				) : null}
				<div className='flex flex-row flex-wrap justify-center gap-5 mt-10'>
					{data?.map((news, index) => (
						<NewsCard news={news} key={index} />
					))}
				</div>
			</div>
		</div>
	)
}

export default withAuth(News, ['admin', 'trainer', 'sportsman'], false)
