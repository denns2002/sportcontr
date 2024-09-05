'use client'

import { DefaultButton } from '@/components/custom/buttons'
import { ButtonLink } from '@/components/custom/links'
import { FormElementWrapper } from '@/components/form-elements'
import { deleteNewsAction, editNewsAction } from '@/data/actions/news'
import { FormElementAttributes } from '@/interfaces/forms'
import { News } from '@/interfaces/news'
import { ArrowLeft, FilePenLine, Plus, Trash2, X } from 'lucide-react'
import { useState } from 'react'
import { useFormState } from 'react-dom'

interface NewsEditFormProps {
	news: News
}

export function NewsEditForm({ news }: NewsEditFormProps) {
	const INITIAL_STATE = {
		data: news,
		validationErrors: {},
		requestError: null,
	}

	const [isPublished, setIsPublished] = useState(news.is_published || false)

	const [formState, formAction] = useFormState(
		editNewsAction.bind(null, news.slug || '', isPublished),
		INITIAL_STATE
	)

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
	]

	return (
		<form action={formAction} className='w-full flex flex-col gap-5'>
			<div className='w-full flex flex-col gap-5'>
				{elements.slice(0,2).map((attributes, index) => (
					<div className='w-full bg-white p-5 shadow-md' key={index}>
						<FormElementWrapper
							attributes={attributes}
							errors={formState?.validationErrors[attributes.name]}
							value={formState.data[attributes.name]}
						/>
					</div>
				))}
				<div className='w-full bg-white p-5 shadow-md'>
					<FormElementWrapper
						attributes={elements[2]}
						errors={formState?.validationErrors[elements[2].name]}
						value={formState.data[elements[2].name]}
					/>
				</div>
				<div className='w-full bg-white p-5 shadow-md flex flex-row flex-wrap gap-5 items-center'>
					<label className='font-medium'>Опубликовать новость:</label>
					<div className='flex-1' />
					{isPublished ? (
						<DefaultButton
							color='error'
							type='button'
							full={false}
							handler={() => setIsPublished(false)}
							size='small'
						>
							<X className='h-5 w-5' />
						</DefaultButton>
					) : (
						<DefaultButton
							type='button'
							full={false}
							handler={() => setIsPublished(true)}
							size='small'
						>
							<Plus className='h-5 w-5' />
						</DefaultButton>
					)}
				</div>
			</div>
			<div className='w-full flex flex-row flex-wrap gap-y-5 gap-x-10'>
				<ButtonLink href={`/news/${news.slug}/`} color='gray'>
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
						deleteNewsAction(news.slug || '')
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
