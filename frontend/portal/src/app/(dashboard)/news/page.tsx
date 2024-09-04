import { H1 } from '@/components/custom/headers'
import { ButtonLink } from '@/components/custom/links'
import { Plus } from 'lucide-react'
import { getNewsService } from '@/data/services/news'
import { News as NewsType } from '@/interfaces/news'
import { NewsCard } from './_components/news-card'
import { verifyUserService } from '@/data/services/auth'
import { User } from '@/interfaces/users'

async function News() {
	const data = (await getNewsService()) as Array<NewsType>

	const { data: user } = await verifyUserService()

	const roles: Array<string> = ['sportsman']

	if (user?.is_trainer) {
		roles.push('trainer')
	}

	if (user?.is_superuser) {
		roles.push('admin')
	}

	return (
		<div className='h-full w-full flex justify-center'>
			<div className='w-full max-w-screen-xl mx-auto'>
				<H1>Новости</H1>
				{roles.includes('admin') ? (
					<div className='flex flex-row gap-5 items-center'>
						<span className='text-xl font-semibold'>Хотите добавить новую новость?</span>
						<ButtonLink href='/news/create/' size='small'>
							<Plus className='h-5 w-5' />
						</ButtonLink>
					</div>
				) : null}
				<div className='flex flex-row flex-wrap justify-center gap-5 mt-10'>
					{data?.map((news, index) => (
						<NewsCard news={news} key={index} />
					))}
					{data.map((news, index) => (
						<NewsCard news={news} key={index} />
					))}
					{data.map((news, index) => (
						<NewsCard news={news} key={index} />
					))}
					{data.map((news, index) => (
						<NewsCard news={news} key={index} />
					))}
					{data.map((news, index) => (
						<NewsCard news={news} key={index} />
					))}
				</div>
			</div>
		</div>
	)
}

export default News
