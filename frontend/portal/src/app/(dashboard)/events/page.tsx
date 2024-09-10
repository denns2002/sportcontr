'use server'

import { H1 } from '@/components/custom/headers'
import { ButtonLink } from '@/components/custom/links'
import { FilePlus2, Plus } from 'lucide-react'
import { withAuth } from '@/hocs'
import { getEventsService } from '@/data/services/events'
import { EventCard } from './_components/event-card'
import { Event } from '@/interfaces/events'

interface EventsProps {
	searchParams: { [key: string]: string | string[] | undefined }
	roles: Array<string>
}

async function Events({ searchParams, roles }: EventsProps) {
	const isActive = searchParams['is_active']

	if (isActive) {
		var events = (await getEventsService(isActive === 'true' ? true : false)) as Array<Event>
	} else {
		var events = (await getEventsService()) as Array<Event>
	}

	return (
		<div className='h-full w-full flex flex-col gap-10'>
			<div className='h-fit w-full bg-white px-10 lg:px-10 py-10 shadow-md flex flex-col gap-10'>
				<H1>Мероприятия</H1>
				<div className='w-full flex flex-row flex-wrap gap-5'>
					<div className='flex flex-wrap flex-row gap-5'>
						<ButtonLink href='/events/' color={!isActive ? 'primary' : 'gray'}>
							Все
						</ButtonLink>
						<ButtonLink
							href='/events/?is_active=true'
							color={isActive === 'true' ? 'primary' : 'gray'}
						>
							Предстоящие
						</ButtonLink>
						<ButtonLink
							href='/events/?is_active=false'
							color={isActive === 'false' ? 'primary' : 'gray'}
						>
							Прошедшие
						</ButtonLink>
					</div>
					<div className='flex-1' />
					{roles.includes('admin') ? (
						<ButtonLink href='/events/create/'>
							<>
								<FilePlus2 className='h-5 w-5' /> Создать мероприятие
							</>
						</ButtonLink>
					) : null}
				</div>
			</div>
			<div className='w-full px-10 lg:px-20'>
				<div className='w-full max-w-screen-xl mx-auto flex flex-col gap-5'>
					{events.map((event, index) => (
						<EventCard event={event} key={index} />
					))}
				</div>
			</div>
		</div>
	)
}

export default withAuth(Events, ['admin', 'trainer', 'sportsman'], false)
