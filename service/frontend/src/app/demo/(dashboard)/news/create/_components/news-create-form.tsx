'use client'

import { DefaultButton } from '@/app/demo/_components/components/custom/buttons'
import { ButtonLink } from '@/app/demo/_components/components/custom/links'
import { FormElementWrapper } from '@/app/demo/_components/components/form-elements'
import { FormElementAttributes } from '@/app/demo/_interfaces/forms'
import { ArrowLeft, FilePlus2 } from 'lucide-react'

export function NewsCreateForm() {
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
						<FormElementWrapper attributes={attributes} />
					</div>
				))}
			</div>
			<div className='w-full flex flex-row flex-wrap gap-y-5 gap-x-10'>
				<ButtonLink href={`/demo/news/`} color='gray'>
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
