'use server'

import { FilePlus2 } from "lucide-react"
import { H1 } from "../../_components/components/custom/headers"
import { ButtonLink } from "../../_components/components/custom/links"
import { EventCard } from "./_components/event-card"

interface EventsProps {
	searchParams: { [key: string]: string | string[] | undefined }
	roles: Array<string>
}

const events = [
	{
		id: 1,
		slug: 'SJdsF',
		name: 'X Семинар по прикладному спорту',
		about: 'В частности, существующая теория напрямую зависит от укрепления моральных ценностей. Мы вынуждены отталкиваться от того, что высокотехнологичная концепция общественного уклада позволяет выполнить важные задания по разработке поэтапного и последовательного развития общества. Следует отметить, что высокое качество позиционных исследований требует анализа своевременного выполнения сверхзадачи.',
		address: 'г. Екатеринбург, ул. Мира 32',
		is_attestation: true,
		is_seminar: false,
		reg_start: '2018-06-12T19:30',
		reg_end: '2018-06-12T19:30',
		date_start: '2018-06-12T19:30',
		date_end: '2018-06-12T19:30',
		members: [0, 1, 2, 3, 4, 5]
	},
	{
		id: 1,
		slug: 'SJdsF',
		name: 'X Семинар по прикладному спорту',
		about: 'В частности, существующая теория напрямую зависит от укрепления моральных ценностей. Мы вынуждены отталкиваться от того, что высокотехнологичная концепция общественного уклада позволяет выполнить важные задания по разработке поэтапного и последовательного развития общества. Следует отметить, что высокое качество позиционных исследований требует анализа своевременного выполнения сверхзадачи.',
		address: 'г. Екатеринбург, ул. Мира 32',
		is_attestation: true,
		is_seminar: false,
		reg_start: '2018-06-12T19:30',
		reg_end: '2018-06-12T19:30',
		date_start: '2018-06-12T19:30',
		date_end: '2018-06-12T19:30',
		members: [0, 1, 2, 3, 4, 5]
	},
	{
		id: 1,
		slug: 'SJdsF',
		name: 'X Семинар по прикладному спорту',
		about: 'В частности, существующая теория напрямую зависит от укрепления моральных ценностей. Мы вынуждены отталкиваться от того, что высокотехнологичная концепция общественного уклада позволяет выполнить важные задания по разработке поэтапного и последовательного развития общества. Следует отметить, что высокое качество позиционных исследований требует анализа своевременного выполнения сверхзадачи.',
		address: 'г. Екатеринбург, ул. Мира 32',
		is_attestation: true,
		is_seminar: false,
		reg_start: '2018-06-12T19:30',
		reg_end: '2018-06-12T19:30',
		date_start: '2018-06-12T19:30',
		date_end: '2018-06-12T19:30',
		members: [0, 1, 2, 3, 4, 5]
	},
	{
		id: 1,
		slug: 'SJdsF',
		name: 'X Семинар по прикладному спорту',
		about: 'В частности, существующая теория напрямую зависит от укрепления моральных ценностей. Мы вынуждены отталкиваться от того, что высокотехнологичная концепция общественного уклада позволяет выполнить важные задания по разработке поэтапного и последовательного развития общества. Следует отметить, что высокое качество позиционных исследований требует анализа своевременного выполнения сверхзадачи.',
		address: 'г. Екатеринбург, ул. Мира 32',
		is_attestation: true,
		is_seminar: false,
		reg_start: '2018-06-12T19:30',
		reg_end: '2018-06-12T19:30',
		date_start: '2018-06-12T19:30',
		date_end: '2018-06-12T19:30',
		members: [0, 1, 2, 3, 4, 5]
	}
]

async function Events({ searchParams, roles }: EventsProps) {
	const isActive = searchParams['is_active']

	var data = events

	return (
		<div className='h-full w-full flex flex-col gap-10'>
			<div className='h-fit w-full bg-white px-10 lg:px-10 py-10 shadow-md flex flex-col gap-10'>
				<H1>Мероприятия</H1>
				<div className='w-full flex flex-row flex-wrap gap-5'>
					<div className='flex flex-wrap flex-row gap-5'>
						<ButtonLink href='/demo/events/' color={!isActive ? 'primary' : 'gray'}>
							Все
						</ButtonLink>
						<ButtonLink
							href='/demo/events/?is_active=true'
							color={isActive === 'true' ? 'primary' : 'gray'}
						>
							Предстоящие
						</ButtonLink>
						<ButtonLink
							href='/demo/events/?is_active=false'
							color={isActive === 'false' ? 'primary' : 'gray'}
						>
							Прошедшие
						</ButtonLink>
					</div>
					<div className='flex-1' />
						<ButtonLink href='/demo/events/create/'>
							<>
								<FilePlus2 className='h-5 w-5' /> Создать мероприятие
							</>
						</ButtonLink>
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

export default Events
