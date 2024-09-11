'use client'

import { DefaultButton } from '@/app/demo/_components/components/custom/buttons'
import { ButtonLink } from '@/app/demo/_components/components/custom/links'
import { FormElementWrapper } from '@/app/demo/_components/components/form-elements'
import { FormElementAttributes } from '@/app/demo/_interfaces/forms'
import { User } from '@/app/demo/_interfaces/users'
import { ArrowLeft, FilePenLine } from 'lucide-react'

interface UserEditFormProps {
	user: User
}

export function UserEditForm({ user }: UserEditFormProps) {
	type userKeys = keyof typeof user

	const elements: FormElementAttributes[] = [
		{
			name: 'last_name',
			type: 'text',
			label: 'Фамилия',
			placeholder: 'Иванов',
			required: true,
			element: 'input',
			id: 'last_name',
		},
		{
			name: 'first_name',
			type: 'text',
			label: 'Имя',
			placeholder: 'Иван',
			required: true,
			element: 'input',
			id: 'first_name',
		},
		{
			name: 'middle_name',
			type: 'text',
			label: 'Отчество',
			placeholder: 'Иванович',
			required: false,
			element: 'input',
			id: 'middle_name',
		},
		{
			name: 'birth_date',
			type: 'date',
			label: 'День рождения',
			placeholder: '01.01.2000',
			required: false,
			element: 'input',
			id: 'birth_date',
		},
		{
			name: 'is_trainer',
			type: 'checkbox',
			label: 'Назначить тренером',
			placeholder: '',
			required: false,
			element: 'checkbox',
			id: 'is_trainer',
		},
		{
			name: 'is_superuser',
			type: 'checkbox',
			label: 'Назначить администратором',
			placeholder: '',
			required: false,
			element: 'checkbox',
			id: 'is_superuser',
		},
	]

	return (
		<form className='w-full flex flex-col gap-5'>
			{elements.slice(0, 4).map((attributes, index) => (
				<div className='w-full bg-white p-5 shadow-md' key={index}>
					<FormElementWrapper
						attributes={attributes}
						value={user[attributes.name as userKeys] as string}
					/>
				</div>
			))}
			<div>
				<div className='flex flex-row flex-wrap gap-5'>
					<div className='flex-1 bg-white p-5 shadow-md'>
						<FormElementWrapper
							attributes={elements[4]}
							value={user.is_trainer! as unknown as string}
						/>
					</div>
					<div className='flex-1 bg-white p-5 shadow-md'>
						<FormElementWrapper
							attributes={elements[5]}
							value={user.is_superuser! as unknown as string}
						/>
					</div>
				</div>
			</div>
			<div className='w-full flex flex-row flex-wrap gap-y-5 gap-x-10'>
				<ButtonLink href={`/demo/users/`} color='gray'>
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
			</div>
		</form>
	)
}
