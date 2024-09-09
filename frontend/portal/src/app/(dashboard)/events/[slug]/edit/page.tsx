'use server'

import { H1 } from '@/components/custom/headers'
import { withAuth } from '@/hocs/'
import { EventEditForm } from './_components/event-edit-form'
import { getEventDetailsService } from '@/data/services/events'

interface EventEditProps {
	params: { slug: string }
}

async function EventEdit({ params }: EventEditProps) {
	const data = await getEventDetailsService(params.slug)

	return (
		<div className='h-full w-full flex flex-col gap-10'>
			<div className='h-fit w-full bg-white px-10 lg:px-10 py-10 shadow-md flex flex-col gap-10'>
				<H1>Редактировать мероприятие</H1>
			</div>
			<div className='w-full px-10 lg:px-20'>
				<div className='w-full max-w-screen-xl mx-auto flex flex-col gap-5'>
					<EventEditForm event={data} />
				</div>
			</div>
		</div>
	)
}

export default withAuth(EventEdit, ['admin'], true)
