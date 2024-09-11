'use server'

import { H1 } from '@/app/demo/_components/components/custom/headers'
import { ButtonLink } from '@/app/demo/_components/components/custom/links'
import { Dropdown } from '@/app/demo/_components/custom/dropdown'
import { isRegClosed, parseDate } from '@/lib/dates'
import { ArrowLeft, Check, FileText, Users, X } from 'lucide-react'

interface GroupEditProps {
	params: { slug: string }
	roles: Array<string>
}

async function Event({ params, roles }: GroupEditProps) {
	const event = {
		id: 1,
		slug: 'SJdsF',
		name: 'X Семинар по прикладному спорту',
		about:
			'В частности, существующая теория напрямую зависит от укрепления моральных ценностей. Мы вынуждены отталкиваться от того, что высокотехнологичная концепция общественного уклада позволяет выполнить важные задания по разработке поэтапного и последовательного развития общества. Следует отметить, что высокое качество позиционных исследований требует анализа своевременного выполнения сверхзадачи.',
		address: 'г. Екатеринбург, ул. Мира 32',
		is_attestation: true,
		is_seminar: false,
		reg_start: '2018-06-12T19:30',
		reg_end: '2018-06-12T19:30',
		date_start: '2018-06-12T19:30',
		date_end: '2018-06-12T19:30',
		members: [0, 1, 2, 3, 4, 5],
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
						<ButtonLink href={`/demo/events/${event.slug}/edit/`}>
							<>
								<FileText className='h-5 w-5' />
								<span>Редактировать</span>
							</>
						</ButtonLink>
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
							<div className='flex-1' />
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
							<div className='flex-1' />
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
						<ButtonLink href='/demo/events/' color='gray'>
							<>
								<ArrowLeft className='h-5 w-5' />
								<span>Вернуться</span>
							</>
						</ButtonLink>
						<div className='flex-1' />
						<ButtonLink href={`/demo/events/${event.slug}/members/`}>
							<>
								<Users className='h-5 w-5' />
								<span>Участники</span>
							</>
						</ButtonLink>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Event
