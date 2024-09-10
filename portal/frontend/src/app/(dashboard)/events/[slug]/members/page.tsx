'use server'

import { H1 } from '@/components/custom/headers'
import { ButtonLink } from '@/components/custom/links'
import { getEventDetailsService } from '@/data/services/events'
import { getUserDetailsService } from '@/data/services/users'
import { withAuth } from '@/hocs'
import { ArrowLeft, FileText } from 'lucide-react'
import { notFound } from 'next/navigation'
import { MembersList } from './_components/members-list'
import { getGroupsService } from '@/data/services/groups-base'
import { getTrainersGroupsService } from '@/data/services/groups-trainers'
import { isRegClosed, parseDate } from '@/lib/dates'
import { Group } from '@/interfaces/groups'

interface EventMembersProps {
	params: { slug: string }
	roles: Array<string>
}

async function EventMembers({ params, roles }: EventMembersProps) {
	const event = await getEventDetailsService(params.slug)

	if (event.detail) {
		notFound()
	}

	if (roles.includes('admin')) {
		var groups = (await getGroupsService()) as Array<Group>
	} else {
		var groups = (await getTrainersGroupsService()) as Array<Group>
	}

	const members = await Promise.all(event?.members.map(getUserDetailsService))

	return (
		<div className='h-full w-full flex flex-col gap-10'>
			<div className='h-fit w-full bg-white px-10 lg:px-10 py-10 shadow-md flex flex-col gap-10'>
				<H1>{event.name}</H1>
				<div className='w-full flex flex-row flex-wrap gap-5'>
					<div className='flex flex-col gap-2'>
						<span>
							<span className='text-lg font-medium'>Даты проведения: </span>
							<span>
								{parseDate(event?.date_start ? event.date_start : '')} -{' '}
								{parseDate(event?.date_end ? event.date_end : '')}
							</span>
						</span>
						<span
							className={`${isRegClosed(event?.reg_end ? event.reg_end : '') ? 'text-error' : ''}`}
						>
							<span className='text-lg font-medium'>Регистрация: </span>
							<span>
								{parseDate(event?.reg_start ? event.reg_start : '')} -{' '}
								{parseDate(event?.reg_end ? event.reg_end : '')}
							</span>
						</span>
					</div>
					<div className='flex-1' />
					<div className='flex items-end'>
						{['admin', 'trainer'].some(role => roles.includes(role)) ? (
							<ButtonLink href={`/events/${event.slug}/members/edit/`}>
								<>
									<FileText className='h-5 w-5' />
									<span>Редактировать</span>
								</>
							</ButtonLink>
						) : null}
					</div>
				</div>
			</div>
			<div className='w-full px-10 lg:px-20'>
				<div className='w-full max-w-screen-xl mx-auto flex flex-col gap-5'>
					<MembersList members={members} groups={groups} />
					<div className='flex flex-row flex-wrap gap-5'>
						<ButtonLink href={`/events/${event.slug}/`} color='gray'>
							<>
								<ArrowLeft className='h-5 w-5' />
								<span>Вернуться</span>
							</>
						</ButtonLink>
					</div>
				</div>
			</div>
		</div>
	)
}

export default withAuth(EventMembers, ['admin', 'trainer'], true)
