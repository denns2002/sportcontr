'use client'

import { DefaultButton } from '@/app/demo/_components/components/custom/buttons'
import { ButtonLink } from '@/app/demo/_components/components/custom/links'
import { FormElementWrapper } from '@/app/demo/_components/components/form-elements'
import { FormElementAttributes } from '@/app/demo/_interfaces/forms'
import { News } from '@/app/demo/_interfaces/news'
import { ArrowLeft, FilePenLine, Trash2 } from 'lucide-react'

interface NewsEditFormProps {
	news: News
}

export function NewsEditForm({ news }: NewsEditFormProps) {
	type newsKey = keyof typeof news

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
		<form className='w-full flex flex-col gap-5'>
			<div className='w-full flex flex-col gap-5'>
				{elements.map((attributes, index) => (
					<div className='w-full bg-white p-5 shadow-md' key={index}>
						<FormElementWrapper
							attributes={attributes}
							value={news[attributes.name as newsKey] as string}
						/>
					</div>
				))}
			</div>
			<div className='w-full flex flex-row flex-wrap gap-y-5 gap-x-10'>
				<ButtonLink href={`/demo/news/${news.slug}/`} color='gray'>
					<>
						<ArrowLeft className='h-5 w-5' />
						<span>Вернуться</span>
					</>
				</ButtonLink>
				<div className='flex-1' />
				<DefaultButton type='submit' disabled full={false}>
					<>
						<FilePenLine className='h-5 w-5' />
						<span>Сохранить</span>
					</>
				</DefaultButton>
				<DefaultButton color='error' type='button' full={false} disabled>
					<>
						<Trash2 className='h-5 w-5' />
						<span>Удалить</span>
					</>
				</DefaultButton>
			</div>
		</form>
	)
}
