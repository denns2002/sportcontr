'use client'

import { DefaultButton } from '@/components/custom/buttons'
import { ButtonLink } from '@/components/custom/links'
import { FormElementWrapper } from '@/components/form-elements'
import { createProjectAction } from '@/data/actions/projects/create'
import { FormElementAttributes } from '@/interfaces/forms'
import { ArrowLeft, FilePlus2 } from 'lucide-react'
import { useFormState } from 'react-dom'

const INITIAL_STATE = {
	data: null,
	validationErrors: {},
	requestError: null,
}

export function ProjectCreateForm() {
	const [formState, formAction] = useFormState(createProjectAction, INITIAL_STATE)

	const elements: FormElementAttributes[] = [
		{
			name: 'title',
			type: 'text',
			label: 'Название',
			placeholder: 'Название',
			required: true,
			element: 'input',
			id: 'title',
		},
		{
			name: 'description',
			type: 'text',
			label: 'Описание',
			placeholder: 'Портал школы по самому популярному в мире спорту...',
			required: true,
			element: 'textarea',
			id: 'description',
		},
	]

	return (
		<form action={formAction} className='w-full flex flex-col'>
			<div className='w-full flex flex-col gap-5'>
				{elements.map((attributes, index) => (
					<div className='w-full bg-white p-5 shadow-md rounded-lg' key={index}>
						<FormElementWrapper
							attributes={attributes}
							errors={formState?.validationErrors[attributes.name]}
						/>
					</div>
				))}
			</div>
			<div className='w-full flex flex-row flex-wrap gap-y-5 mt-5'>
				<ButtonLink href='/projects' color='gray'>
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
