'use server'

import { H1 } from '@/app/demo/_components/components/custom/headers'
import { EventEditForm } from './_components/event-edit-form'

interface EventEditProps {
	params: { slug: string }
}

async function EventEdit({ params }: EventEditProps) {
	const data = {
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

export default EventEdit
