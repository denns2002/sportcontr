'use client'

import { FormElementWrapper } from '@/components/form-elements'
import { FormElementAttributes } from '@/interfaces/forms'
import { UserCreateData } from '@/interfaces/users'
import { useState } from 'react'

interface UserFormProps {
	userData: UserCreateData
	handleChange(event: React.ChangeEvent<HTMLInputElement>): void
}

export function UserForm({ userData, handleChange }: UserFormProps) {
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
	]

	return (
		<div className='p-5'>
			<div className='flex flex-col gap-5'>
				{elements.map((attributes, index) => (
					<FormElementWrapper attributes={attributes} key={index} handleChange={handleChange} />
				))}
			</div>
		</div>
	)
}
