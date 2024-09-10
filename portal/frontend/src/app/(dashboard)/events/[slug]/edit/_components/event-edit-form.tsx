'use client'

import { DefaultButton } from '@/components/custom/buttons'
import { ButtonLink } from '@/components/custom/links'
import { FormElementWrapper } from '@/components/form-elements'
import { deleteEventAction, editEventAction } from '@/data/actions/events'
import { Event } from '@/interfaces/events'
import { FormElementAttributes } from '@/interfaces/forms'
import { ArrowLeft, FilePenLine, Trash2 } from 'lucide-react'
import { useFormState } from 'react-dom'

interface EventEditFormProps {
	event: Event
}

export function EventEditForm({ event }: EventEditFormProps) {
	const INITIAL_STATE = {
		data: event,
		validationErrors: {},
		requestError: null,
	}

	const [formState, formAction] = useFormState(
		editEventAction.bind(null, event.slug!),
		INITIAL_STATE
	)

	const elements: FormElementAttributes[] = [
		{
			name: 'name',
			type: 'text',
			label: 'Название',
			placeholder: 'Название',
			required: true,
			element: 'input',
			id: 'name',
		},
		{
			name: 'about',
			type: 'text',
			label: 'Описание',
			placeholder: 'Самое невероятное мероприятие...',
			required: true,
			element: 'textarea',
			id: 'about',
		},
		{
			name: 'address',
			type: 'text',
			label: 'Место проведения',
			placeholder: 'ул. Уличная, д. 0',
			required: true,
			element: 'input',
			id: 'address',
		},
		{
			name: 'image',
			type: 'file',
			label: 'Загрузить изображение',
			placeholder: 'Картинка котика',
			required: false,
			element: 'uploader',
			id: 'image',
		},
		{
			name: 'reg_start',
			type: 'datetime-local',
			label: 'Начало регистрации',
			placeholder: 'dd-mm-yyyy',
			required: true,
			element: 'input',
			id: 'reg_start',
		},
		{
			name: 'reg_end',
			type: 'datetime-local',
			label: 'Конец регистрации',
			placeholder: '01-01-2000T00:00:00Z',
			required: true,
			element: 'input',
			id: 'reg_end',
		},
		{
			name: 'date_start',
			type: 'datetime-local',
			label: 'Начало мероприятия',
			placeholder: '01-01-2000T00:00:00Z',
			required: true,
			element: 'input',
			id: 'date_start',
		},
		{
			name: 'date_end',
			type: 'datetime-local',
			label: 'Конец мероприятия',
			placeholder: '01-01-2000T00:00:00Z',
			required: true,
			element: 'input',
			id: 'date_end',
		},
		{
			name: 'is_attestation',
			type: 'checkbox',
			label: 'Аттестация',
			placeholder: '',
			required: false,
			element: 'checkbox',
			id: 'is_attestation',
		},
		{
			name: 'is_seminar',
			type: 'checkbox',
			label: 'Семинар',
			placeholder: '',
			required: false,
			element: 'checkbox',
			id: 'is_seminar',
		},
	]

	return (
		<form action={formAction} className='w-full flex flex-col gap-5'>
			<div className='w-full flex flex-col gap-5'>
				{elements.slice(0, 4).map((attributes, index) => (
					<div className='w-full bg-white p-5 shadow-md' key={index}>
						<FormElementWrapper
							attributes={attributes}
							errors={formState?.validationErrors[attributes.name]}
							value={formState.data[attributes.name]}
						/>
					</div>
				))}
				<div className='flex flex-row flex-wrap gap-5'>
					<div className='flex-1 bg-white p-5 shadow-md'>
						<FormElementWrapper
							attributes={elements[4]}
							errors={formState?.validationErrors[elements[4].name]}
							value={formState.data[elements[4].name].slice(0, 19)}
						/>
					</div>
					<div className='flex-1 bg-white p-5 shadow-md'>
						<FormElementWrapper
							attributes={elements[5]}
							errors={formState?.validationErrors[elements[5].name]}
							value={formState.data[elements[5].name].slice(0, 19)}
						/>
					</div>
				</div>
				<div className='flex flex-row flex-wrap gap-5'>
					<div className='flex-1 bg-white p-5 shadow-md'>
						<FormElementWrapper
							attributes={elements[6]}
							errors={formState?.validationErrors[elements[6].name]}
							value={formState.data[elements[6].name].slice(0, 19)}
						/>
					</div>
					<div className='flex-1 bg-white p-5 shadow-md'>
						<FormElementWrapper
							attributes={elements[7]}
							errors={formState?.validationErrors[elements[7].name]}
							value={formState.data[elements[7].name].slice(0, 19)}
						/>
					</div>
				</div>
				<div className='flex flex-row flex-wrap gap-5'>
					<div className='flex-1 bg-white p-5 shadow-md'>
						<FormElementWrapper
							attributes={elements[8]}
							errors={formState?.validationErrors[elements[8].name]}
							value={formState.data[elements[8].name]}
						/>
					</div>
					<div className='flex-1 bg-white p-5 shadow-md'>
						<FormElementWrapper
							attributes={elements[9]}
							errors={formState?.validationErrors[elements[9].name]}
							value={formState.data[elements[9].name]}
						/>
					</div>
				</div>
			</div>
			<div className='w-full flex flex-row flex-wrap gap-y-5 gap-x-10'>
				<ButtonLink href={`/events/${event.slug}/`} color='gray'>
					<>
						<ArrowLeft className='h-5 w-5' />
						<span>Вернуться</span>
					</>
				</ButtonLink>
				<div className='flex-1' />
				<DefaultButton type='submit' full={false}>
					<>
						<FilePenLine className='h-5 w-5' />
						<span>Сохранить</span>
					</>
				</DefaultButton>
				<DefaultButton
					color='error'
					type='button'
					full={false}
					handler={() => {
						deleteEventAction(event.slug || '')
					}}
				>
					<>
						<Trash2 className='h-5 w-5' />
						<span>Удалить</span>
					</>
				</DefaultButton>
			</div>
		</form>
	)
}
