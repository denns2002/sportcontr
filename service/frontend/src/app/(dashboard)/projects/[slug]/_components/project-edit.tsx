'use client'

import { editProjectAction } from '@/data/actions/projects/edit'
import { FormElementAttributes } from '@/interfaces/forms'
import { useFormState } from 'react-dom'
import { Project } from '@/interfaces/projects'
import { deleteProjectAction } from '@/data/actions/projects/delete'
import { FormElementWrapper } from '@/components/form-elements'
import { ButtonLink } from '@/components/custom/links'
import { ArrowLeft, FilePenLine, Trash2 } from 'lucide-react'
import { DefaultButton } from '@/components/custom/buttons'

interface ProjectEditFormProps {
	project: Project
}

export function ProjectEditForm({ project }: ProjectEditFormProps) {
	const INITIAL_STATE = {
		data: project,
		validationErrors: {},
		requestError: null,
	}

	const [formState, formAction] = useFormState(
		editProjectAction.bind(null, project.slug),
		INITIAL_STATE
	)

	const elements: FormElementAttributes[] = [
		{
			name: 'title',
			type: 'text',
			label: 'Название',
			placeholder: 'Название',
			required: true,
			element: 'input',
			id: 'title'
		},
		{
			name: 'description',
			type: 'text',
			label: 'Описание',
			placeholder: 'Портал школы по самому популярному в мире спорту...',
			required: true,
			element: 'textarea',
			id: 'description'
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
							value={formState.data[attributes.name]}
						/>
					</div>
				))}
			</div>
			<div className='w-full flex flex-row flex-wrap gap-y-5 gap-x-10 mt-5'>
				<ButtonLink href='/projects' color='gray'>
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
					color='red'
					type='button'
					full={false}
					handler={() => {
						deleteProjectAction(project.slug)
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
