'use server'

import { H1 } from '@/app/demo/_components/components/custom/headers'
import { EventMembersEditForm } from './_components/event-members-edit-form'

async function EventMembersEdit() {
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
		members: [0, 1, 3, 4, 5, 8, 9],
	}

	const groups = [
		{
			id: 1,
			slug: 'hDjkfF',
			name: 'Старшая-1',
			description:
				'С учётом сложившейся международной обстановки, разбавленное изрядной долей эмпатии, рациональное мышление однозначно фиксирует необходимость своевременного выполнения сверхзадачи.',
			trainers: [10],
			members: [7, 8, 9],
		},
		{
			id: 1,
			slug: 'FJlkN',
			name: 'Старшая-2',
			description:
				'С учётом сложившейся международной обстановки, разбавленное изрядной долей эмпатии, рациональное мышление однозначно фиксирует необходимость своевременного выполнения сверхзадачи.',
			trainers: [10],
			members: [0, 1, 2],
		},
		{
			id: 1,
			slug: 'Fdsjkh',
			name: 'Старшая-3',
			description:
				'С учётом сложившейся международной обстановки, разбавленное изрядной долей эмпатии, рациональное мышление однозначно фиксирует необходимость своевременного выполнения сверхзадачи.',
			trainers: [10],
			members: [3, 4, 5, 6],
		},
	]

	const users = [
		{
			last_name: 'Иванов',
			first_name: 'Иван',
			middle_name: 'Иванович',
			username: 'username',
			is_superuser: false,
			is_trainer: false,
			avatar: undefined,
			id: 0,
			birth_date: '2000-06-12',
		},
		{
			last_name: 'Иванов',
			first_name: 'Иван',
			middle_name: 'Иванович',
			username: 'username',
			is_superuser: false,
			is_trainer: false,
			avatar: undefined,
			id: 1,
			birth_date: '2000-06-12',
		},
		{
			last_name: 'Иванов',
			first_name: 'Иван',
			middle_name: 'Иванович',
			username: 'username',
			is_superuser: false,
			is_trainer: false,
			avatar: undefined,
			id: 2,
			birth_date: '2000-06-12',
		},
		{
			last_name: 'Иванов',
			first_name: 'Иван',
			middle_name: 'Иванович',
			username: 'username',
			is_superuser: false,
			is_trainer: false,
			avatar: undefined,
			id: 3,
			birth_date: '2000-06-12',
		},
		{
			last_name: 'Иванов',
			first_name: 'Иван',
			middle_name: 'Иванович',
			username: 'username',
			is_superuser: false,
			is_trainer: false,
			avatar: undefined,
			id: 4,
			birth_date: '2000-06-12',
		},
		{
			last_name: 'Иванов',
			first_name: 'Иван',
			middle_name: 'Иванович',
			username: 'username',
			is_superuser: false,
			is_trainer: false,
			avatar: undefined,
			id: 5,
			birth_date: '2000-06-12',
		},
		{
			last_name: 'Иванов',
			first_name: 'Иван',
			middle_name: 'Иванович',
			username: 'username',
			is_superuser: false,
			is_trainer: false,
			avatar: undefined,
			id: 6,
			birth_date: '2000-06-12',
		},
		{
			last_name: 'Иванов',
			first_name: 'Иван',
			middle_name: 'Иванович',
			username: 'username',
			is_superuser: false,
			is_trainer: false,
			avatar: undefined,
			id: 7,
			birth_date: '2000-06-12',
		},
		{
			last_name: 'Иванов',
			first_name: 'Иван',
			middle_name: 'Иванович',
			username: 'username',
			is_superuser: false,
			is_trainer: false,
			avatar: undefined,
			id: 8,
			birth_date: '2000-06-12',
		},
		{
			last_name: 'Иванов',
			first_name: 'Иван',
			middle_name: 'Иванович',
			username: 'username',
			is_superuser: false,
			is_trainer: false,
			avatar: undefined,
			id: 9,
			birth_date: '2000-06-12',
		},
		{
			last_name: 'Михайлов',
			first_name: 'Михаил',
			middle_name: 'Михайлович',
			username: 'username',
			is_superuser: false,
			is_trainer: true,
			avatar: undefined,
			id: 10,
			birth_date: '2000-06-12',
		},
	]

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

export default EventMembersEdit
