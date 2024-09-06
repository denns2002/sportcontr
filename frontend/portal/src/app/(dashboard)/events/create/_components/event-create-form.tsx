'use client'

import { DefaultButton } from '@/components/custom/buttons'
import { ButtonLink } from '@/components/custom/links'
import { FormElementWrapper } from '@/components/form-elements'
import { createEventAction } from '@/data/actions/events'
import { FormElementAttributes } from '@/interfaces/forms'
import { ArrowLeft, FilePlus2, Plus, X } from 'lucide-react'
import { useState } from 'react'
import { useFormState } from 'react-dom'

export function EventCreateForm() {
	const INITIAL_STATE = {
		data: null,
		validationErrors: {},
		requestError: null,
	}

	const [isAttestation, setIsAttestation] = useState(false)
	const [isSeminar, setIsSeminar] = useState(false)

	const [formState, formAction] = useFormState(
		createEventAction.bind(null, isAttestation, isSeminar),
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
	]

	return (
		<form action={formAction} className='w-full flex flex-col gap-5'>
			<div className='w-full flex flex-col gap-5'>
				{elements.slice(0, 4).map((attributes, index) => (
					<div className='w-full bg-white p-5 shadow-md' key={index}>
						<FormElementWrapper
							attributes={attributes}
							errors={formState?.validationErrors[attributes.name]}
						/>
					</div>
				))}
				<div className='flex flex-row flex-wrap gap-5'>
					<div className='flex-1 bg-white p-5 shadow-md'>
						<FormElementWrapper
							attributes={elements[4]}
							errors={formState?.validationErrors[elements[4].name]}
						/>
					</div>
          <div className='flex-1 bg-white p-5 shadow-md'>
						<FormElementWrapper
							attributes={elements[5]}
							errors={formState?.validationErrors[elements[5].name]}
						/>
					</div>
				</div>
        <div className='flex flex-row flex-wrap gap-5'>
					<div className='flex-1 bg-white p-5 shadow-md'>
						<FormElementWrapper
							attributes={elements[6]}
							errors={formState?.validationErrors[elements[6].name]}
						/>
					</div>
          <div className='flex-1 bg-white p-5 shadow-md'>
						<FormElementWrapper
							attributes={elements[7]}
							errors={formState?.validationErrors[elements[7].name]}
						/>
					</div>
				</div>
				<div className='w-full bg-white p-5 shadow-md flex flex-row flex-wrap gap-5 items-center'>
					<label className='font-medium'>Будет ли аттестация:</label>
					<div className='flex-1' />
					{isAttestation ? (
						<DefaultButton
							color='error'
							type='button'
							full={false}
							handler={() => setIsAttestation(false)}
							size='small'
						>
							<X className='h-5 w-5' />
						</DefaultButton>
					) : (
						<DefaultButton
							type='button'
							full={false}
							handler={() => setIsAttestation(true)}
							size='small'
						>
							<Plus className='h-5 w-5' />
						</DefaultButton>
					)}
				</div>
				<div className='w-full bg-white p-5 shadow-md flex flex-row flex-wrap gap-5 items-center'>
					<label className='font-medium'>Будет ли семинар:</label>
					<div className='flex-1' />
					{isSeminar ? (
						<DefaultButton
							color='error'
							type='button'
							full={false}
							handler={() => setIsSeminar(false)}
							size='small'
						>
							<X className='h-5 w-5' />
						</DefaultButton>
					) : (
						<DefaultButton
							type='button'
							full={false}
							handler={() => setIsSeminar(true)}
							size='small'
						>
							<Plus className='h-5 w-5' />
						</DefaultButton>
					)}
				</div>
			</div>
			<div className='w-full flex flex-row flex-wrap gap-y-5 gap-x-10'>
				<ButtonLink href={`/events/`} color='gray'>
					<>
						<ArrowLeft className='h-5 w-5' />
						<span>Вернуться</span>
					</>
				</ButtonLink>
				<div className='flex-1' />
				<DefaultButton type='submit' full={false}>
					<>
						<FilePlus2 className='h-5 w-5' />
						<span>Создать</span>
					</>
				</DefaultButton>
			</div>
		</form>
	)
}
