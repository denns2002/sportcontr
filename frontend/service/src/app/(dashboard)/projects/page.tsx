'use server'

import { H1 } from '@/components/custom/headers'
import { ButtonLink, TransparentLink } from '@/components/custom/links'
import { getUserProjectsService } from '@/data/services/projects'
import { parseDate } from '@/lib/dates'
import { Project } from '@/interfaces/projects'
import { ArrowUpRight, Code, Plus } from 'lucide-react'

async function Projects() {
	const projects = await getUserProjectsService()

	return (
		<div className='h-full w-full mx-auto max-w-screen-lg flex flex-col'>
			<H1>Список проектов</H1>
			<div className='flex flex-row gap-5 items-center'>
				<span className='text-xl font-semibold'>Хотите создать новый проект?</span>
				<ButtonLink href='/projects/create/' size='small'>
					<Plus className='h-5 w-5' />
				</ButtonLink>
			</div>
			<div className='w-full mt-10 flex flex-col gap-5	'>
				{!projects.detail ? projects?.map((project: Project, index: number) => (
					<div
						className='w-full bg-white shadow-md rounded-xl p-5 flex flex-row flex-wrap gap-x-10 gap-y-5 items-center'
						key={index}
					>
						<div className='flex flex-row gap-2 justify-center items-center'>
							<div className='h-3 w-3 rounded-full bg-green-500' />
							<span className='text-lg font-medium'>{project?.title}</span>
						</div>
						<div className='flex-1' />
						<span className='text-base text-gray-500'>
							{parseDate(project?.created_at?.split('T')[0] || '')}
						</span>
						<div className='flex flex-row flex-wrap gap-5 justify-center items-center'>
							<ButtonLink href={`/projects/${project.slug}/`}>
								<>
									<Code className='h-5 w-5' />
									<span className='text-base'>Редактировать</span>
								</>
							</ButtonLink>
							<TransparentLink href={'https://google.com'} size='small' external={true}>
								<ArrowUpRight h-5 w-5 />
							</TransparentLink>
						</div>
					</div>
				)) : <div></div>}
			</div>
		</div>
	)
}

export default Projects
