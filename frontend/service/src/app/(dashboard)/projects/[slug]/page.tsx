'use server'

import { H1 } from '@/components/custom/headers'
import { getProjectService } from '@/data/services/projects'

type ProjectProps = {
	params: { slug: string }
}

async function Project({ params }: ProjectProps) {
	const { data } = await getProjectService(params.slug)

  console.log(data)

	return (
		<div className='h-full w-full mx-auto max-w-screen-lg flex flex-col'>
			<H1>{data?.title}</H1>
		</div>
	)
}

export default Project
