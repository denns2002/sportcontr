'use server'

import { H1 } from '@/components/custom/headers'
import { getEventDetailsService } from '@/data/services/events'
import { withAuth } from '@/hocs/'
import { isRegClosed, parseDate } from '@/lib/dates'
import { Dropdown } from '../../../_components/custom/dropdown'
import { ArrowLeft, Check, FileText, TableProperties, Users, X } from 'lucide-react'
import { ButtonLink } from '@/components/custom/links'
import { notFound } from 'next/navigation'

interface GroupEditProps {
	params: { slug: string }
	roles: Array<string>
}

async function Event({ params, roles }: GroupEditProps) {
	const event = await getEventDetailsService(params.slug)

	if (event.detail) {
		notFound()
	}

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
						{roles.includes('admin') ? (
							<ButtonLink href={`/events/${event.slug}/edit/`}>
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
					<Dropdown label='Описание'>
						<div className='p-5'>{event?.about || ''}</div>
					</Dropdown>
					<Dropdown label='Место провидения'>
						<div className='p-5'>{event?.address || ''}</div>
					</Dropdown>
					<div className='flex flex-row flex-wrap gap-5'>
						<div className='flex-1 bg-white p-5 flex flex-row gap-5 items-center shadow-md'>
							<span>Аттестация:</span>
							{event.is_attestation ? (
								<div className='bg-primary p-2 text-white shadow-md'>
									<Check className='h-5 w-5' />
								</div>
							) : (
								<div className='bg-error p-2 text-white shadow-md'>
									<X className='h-5 w-5' />
								</div>
							)}
						</div>
						<div className='flex-1 bg-white p-5 flex flex-row gap-5 items-center shadow-md'>
							<span>Семинар:</span>
							{event.is_seminar ? (
								<div className='bg-primary p-2 text-white shadow-md'>
									<Check className='h-5 w-5' />
								</div>
							) : (
								<div className='bg-error p-2 text-white shadow-md'>
									<X className='h-5 w-5' />
								</div>
							)}
						</div>
					</div>
					<div className='flex flex-row flex-wrap gap-5'>
						<ButtonLink href='/events/' color='gray'>
							<>
								<ArrowLeft className='h-5 w-5' />
								<span>Вернуться</span>
							</>
						</ButtonLink>
						<div className='flex-1' />
						{['trainer', 'admin'].some((role) => roles.includes(role)) ? (
							<ButtonLink href={`/events/${event.slug}/members/`}>
								<>
									<Users className='h-5 w-5' />
									<span>Участники</span>
								</>
							</ButtonLink>
						) : null}
					</div>
				</div>
			</div>
		</div>
	)
}

export default withAuth(Event, ['admin', 'trainer', 'sportsman'], false)
