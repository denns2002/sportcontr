'use server'

import { H1 } from '@/components/custom/headers'
import { NewsCreateForm } from './_components/news-create-form'
import { withAuth } from '@/hocs/'

async function NewsCreate() {
	return (
		<div className='h-full w-full flex justify-center'>
			<div className='w-full max-w-screen-xl mx-auto'>
				<H1>Создать новость</H1>
				<NewsCreateForm />
			</div>
		</div>
	)
}

export default withAuth(NewsCreate, ['admin'], true)
