import { H1 } from '@/components/custom/headers'
import { ButtonLink } from '@/components/custom/links'
import { Plus } from 'lucide-react'

function Projects() {
	return (
		<div className='h-full w-full mx-auto max-w-screen-lg flex flex-col'>
			<H1>Список проектов</H1>
			<div className='flex flex-row gap-5 items-center'>
				<span className='text-2xl font-semibold'>Хотите создать новый проект?</span>
				<ButtonLink href='/projects/create/' size='small'>
					<Plus className='h-5 w-5' />
				</ButtonLink>
			</div>
      <div className='w-full mt-5 flex flex-col gap-5'></div>
		</div>
	)
}

export default Projects
