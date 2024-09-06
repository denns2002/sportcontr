'use server'

import { H1 } from '@/components/custom/headers'
import { NewsCreateForm } from './_components/news-create-form'
import { withAuth } from '@/hocs/'

async function NewsCreate() {
	return (
		<div className='h-full w-full flex flex-col gap-10'>
			<div className='h-fit w-full bg-white px-10 lg:px-10 py-10 shadow-md flex flex-col gap-10'>
				<H1>Создать новость</H1>
			</div>
			<div className='w-full px-10 lg:px-20'>
				<div className='w-full max-w-screen-xl mx-auto flex flex-col gap-5'>
					<NewsCreateForm />
				</div>
			</div>
		</div>
	)
}

export default withAuth(NewsCreate, ['admin'], true)
