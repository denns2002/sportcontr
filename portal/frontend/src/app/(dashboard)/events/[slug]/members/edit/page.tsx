'use server'

import { H1 } from '@/components/custom/headers'
import { getEventDetailsService } from '@/data/services/events'
import { getGroupsService } from '@/data/services/groups-base'
import { getTrainersGroupsService } from '@/data/services/groups-trainers'
import { withAuth } from '@/hocs'
import { Group } from '@/interfaces/groups'
import { notFound } from 'next/navigation'
import { EventMembersEditForm } from './_components/event-members-edit-form'
import { getUserDetailsService, getUsersService } from '@/data/services/users'

interface EventMembersEditProps {
	params: { slug: string }
	roles: Array<string>
}

async function EventMembersEdit({ params, roles }: EventMembersEditProps) {
	const event = await getEventDetailsService(params.slug)

	if (event.detail) {
		notFound()
	}

	if (roles.includes('admin')) {
		var groups = (await getGroupsService()) as Array<Group>
	} else {
		var groups = (await getTrainersGroupsService()) as Array<Group>
	}

	const users = await getUsersService()

	return (
		<div className='h-full w-full flex flex-col gap-10'>
			<div className='h-fit w-full bg-white px-10 lg:px-10 py-10 shadow-md flex flex-col gap-10'>
				<H1>{event.name}</H1>
			</div>
			<div className='w-full px-10 lg:px-20'>
				<div className='w-full max-w-screen-xl mx-auto flex flex-col gap-5'>
					<EventMembersEditForm groups={groups} event={event} users={users} />
				</div>
			</div>
		</div>
	)
}

export default withAuth(EventMembersEdit, ['admin', 'trainer'], true)
