'use client'

import { DefaultButton } from '@/app/demo/_components/components/custom/buttons'
import { ButtonLink } from '@/app/demo/_components/components/custom/links'
import { FormElementWrapper } from '@/app/demo/_components/components/form-elements'
import { FormElementAttributes } from '@/app/demo/_interfaces/forms'
import { ArrowLeft, FilePlus2 } from 'lucide-react'

export function EventCreateForm() {
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
			placeholder: '01-01-2000T00:00:00Z',
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
		<form className='w-full flex flex-col gap-5'>
			<div className='w-full flex flex-col gap-5'>
				{elements.slice(0, 4).map((attributes, index) => (
					<div className='w-full bg-white p-5 shadow-md' key={index}>
						<FormElementWrapper attributes={attributes} />
					</div>
				))}
				<div className='flex flex-row flex-wrap gap-5'>
					<div className='flex-1 bg-white p-5 shadow-md'>
						<FormElementWrapper attributes={elements[4]} />
					</div>
					<div className='flex-1 bg-white p-5 shadow-md'>
						<FormElementWrapper attributes={elements[5]} />
					</div>
				</div>
				<div className='flex flex-row flex-wrap gap-5'>
					<div className='flex-1 bg-white p-5 shadow-md'>
						<FormElementWrapper attributes={elements[6]} />
					</div>
					<div className='flex-1 bg-white p-5 shadow-md'>
						<FormElementWrapper attributes={elements[7]} />
					</div>
				</div>
				<div className='flex flex-row flex-wrap gap-5'>
					<div className='flex-1 bg-white p-5 shadow-md'>
						<FormElementWrapper attributes={elements[8]} />
					</div>
					<div className='flex-1 bg-white p-5 shadow-md'>
						<FormElementWrapper attributes={elements[9]} />
					</div>
				</div>
			</div>
			<div className='w-full flex flex-row flex-wrap gap-y-5 gap-x-10'>
				<ButtonLink href={`/demo/events/`} color='gray'>
					<>
						<ArrowLeft className='h-5 w-5' />
						<span>Вернуться</span>
					</>
				</ButtonLink>
				<div className='flex-1' />
				<DefaultButton disabled type='submit' full={false}>
					<>
						<FilePlus2 className='h-5 w-5' />
						<span>Создать</span>
					</>
				</DefaultButton>
			</div>
		</form>
	)
}
