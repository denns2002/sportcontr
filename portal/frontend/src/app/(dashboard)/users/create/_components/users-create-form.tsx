'use client'

import { Dropdown } from '@/app/_components/custom/dropdown'
import { DefaultButton } from '@/components/custom/buttons'
import { ButtonLink } from '@/components/custom/links'
import { FormElementWrapper } from '@/components/form-elements'
import { createUsersAction } from '@/data/actions/users'
import { FormElementAttributes } from '@/interfaces/forms'
import { UserCreateData } from '@/interfaces/users'
import { ArrowLeft, FilePenLine, Plus, X } from 'lucide-react'
import { useState } from 'react'
import { useFormState } from 'react-dom'
import { UserForm } from './user-form'

export function UsersCreateForm() {
	const INITIAL_STATE = {
		data: null,
		validationErrors: {},
		requestError: null,
	}

	// const elements: FormElementAttributes[] = [
	// 	{
	// 		name: 'last_name',
	// 		type: 'text',
	// 		label: 'Фамилия',
	// 		placeholder: 'Иванов',
	// 		required: true,
	// 		element: 'input',
	// 		id: 'last_name',
	// 	},
	// 	{
	// 		name: 'first_name',
	// 		type: 'text',
	// 		label: 'Имя',
	// 		placeholder: 'Иван',
	// 		required: true,
	// 		element: 'input',
	// 		id: 'first_name',
	// 	},
	// 	{
	// 		name: 'middle_name',
	// 		type: 'text',
	// 		label: 'Отчество',
	// 		placeholder: 'Иванович',
	// 		required: false,
	// 		element: 'input',
	// 		id: 'middle_name',
	// 	},
	// 	{
	// 		name: 'birth_date',
	// 		type: 'date',
	// 		label: 'День рождения',
	// 		placeholder: '01.01.2000',
	// 		required: false,
	// 		element: 'input',
	// 		id: 'birth_date',
	// 	},
	// ]

	const [usersData, setUsersData] = useState<Array<UserCreateData>>([
		{
			last_name: '',
			first_name: '',
			middle_name: '',
			birth_date: '',
		},
	])

	const [formState, formAction] = useFormState(
		createUsersAction.bind(null, usersData),
		INITIAL_STATE
	)

	function handleChange(index: number, event: React.ChangeEvent<HTMLInputElement>) {
		event.preventDefault()

		setUsersData((prev) => {
			const data = [...prev]

			data[index] = {
				...data[index],
				[event.target.name]: event.target.value,
			}

			return data
		})
	}

	return (
		<form action={formAction} className='w-full flex flex-col gap-5'>
			{usersData.map((userData, index) => (
				<Dropdown
					label={`Пользователь №${index + 1}`}
					key={index}
					button={
						<DefaultButton
							type='button'
							color='error'
							size='small'
							handler={() =>
								setUsersData((prev) => {
									const data = [...prev]

									const partBefore = data.slice(0, index)

									const partAfter = data.length === index + 1 ? [] : data.slice(index + 1)

									return partBefore.concat(partAfter)
								})
							}
						>
							<X className='h-5 w-5' />
						</DefaultButton>
					}
				>
					<UserForm userData={userData} handleChange={handleChange.bind(null, index)} />
				</Dropdown>
			))}
			<DefaultButton
				type='button'
				color='primary'
				full
				handler={() =>
					setUsersData((prev) => [
						...prev,
						{
							last_name: '',
							first_name: '',
							middle_name: '',
							birth_date: '',
						},
					])
				}
			>
				<>
					<Plus className='h-5 w-5' />
					<span>Добавить пользователя</span>
				</>
			</DefaultButton>

			<div className='w-full flex flex-row flex-wrap gap-y-5 gap-x-10'>
				<ButtonLink href={`/users/`} color='gray'>
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
			</div>
		</form>
	)
}
