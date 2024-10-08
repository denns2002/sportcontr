'use client'

import { DefaultButton } from '@/components/custom/buttons'
import { ButtonLink } from '@/components/custom/links'
import { FormElementWrapper } from '@/components/form-elements'
import { createNewsAction } from '@/data/actions/news'
import { FormElementAttributes } from '@/interfaces/forms'
import { ArrowLeft, FilePlus2, Plus, X } from 'lucide-react'
import { useState } from 'react'
import { useFormState } from 'react-dom'

export function NewsCreateForm() {
	const INITIAL_STATE = {
		data: null,
		validationErrors: {},
		requestError: null,
	}

	const [formState, formAction] = useFormState(createNewsAction, INITIAL_STATE)

	const elements: FormElementAttributes[] = [
		{
			name: 'title',
			type: 'text',
			label: 'Заголовок',
			placeholder: 'Заголовок',
			required: true,
			element: 'input',
			id: 'title',
		},
		{
			name: 'description',
			type: 'text',
			label: 'Описание',
			placeholder: 'Самая невероятная новость...',
			required: true,
			element: 'textarea',
			id: 'description',
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
			name: 'is_published',
			type: 'checkbox',
			label: 'Опубликовать',
			placeholder: '',
			required: false,
			element: 'checkbox',
			id: 'is_published',
		},
	]

	return (
		<form action={formAction} className='w-full flex flex-col gap-5'>
			<div className='w-full flex flex-col gap-5'>
				{elements.map((attributes, index) => (
					<div className='w-full bg-white p-5 shadow-md' key={index}>
						<FormElementWrapper
							attributes={attributes}
							errors={formState?.validationErrors[attributes.name]}
						/>
					</div>
				))}
			</div>
			<div className='w-full flex flex-row flex-wrap gap-y-5 gap-x-10'>
				<ButtonLink href={`/news/`} color='gray'>
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
