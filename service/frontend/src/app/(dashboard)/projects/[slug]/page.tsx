'use server'

import { H1 } from '@/components/custom/headers'
import { getProjectService } from '@/data/services/projects'
import { notFound } from 'next/navigation'
import { ProjectEditForm } from './_components/project-edit-form'

interface ProjectProps {
	params: { slug: string }
}

async function Project({ params }: ProjectProps) {
	const project = await getProjectService(params.slug)

	if (project.detail) {
		notFound()
	}

	return (
		<div className='h-full w-full mx-auto max-w-screen-lg flex flex-col'>
			<H1>Редактирование проекта</H1>
			<ProjectEditForm project={project} />
		</div>
	)
}

export default Project
