'use client'

import { FormElementWrapper } from '@/components/form-elements'
import { FormElementAttributes } from '@/interfaces/forms'
import { useFormState } from 'react-dom'
import { PaletteCard } from './palette-card'
import { useState } from 'react'
import { Calendar, CalendarDays, FilePenLine, Newspaper, Plus, Users, X } from 'lucide-react'
import { DefaultButton } from '@/components/custom/buttons'
import { ButtonLink } from '@/components/custom/links'

const PALETTES = ['sky', 'violet', 'emerald']
const FONTS = ['font-roboto', 'font-montserrat', 'font-notosans', 'font-onest']
const MODULES = [
	{
		name: 'news',
		label: 'Новости',
		description:
			'Добавьте раздел с новостями, чтобы делиться с посетителями самой актуальной информацией о жизни вашей спортивной организации.',
		icon: <Newspaper />,
		isImplemented: true,
	},
	{
		name: 'events',
		label: 'Мероприятия',
		description:
			'Добавьте на свой портал систему клубов для распределения ответственности за проводимые мероприятия между главами этих клубов.',
		icon: <Calendar />,
		isImplemented: true,
	},
	{
		name: 'groups',
		label: 'Группы',
		description:
			'Формируйте группы из пользователей сайта для дальнейшего управления и возможности закрепления тренера за каждой группой.',
		icon: <Users />,
		isImplemented: true,
	},
	{
		name: 'schedule',
		label: 'Расписание',
		description:
			'Добавьте раздел расписания для групп, чтобы спортсмены всегда были в курсе изменений в графике тренировок.',
		icon: <CalendarDays />,
		isImplemented: false,
	},
]

interface SettingsFormProps {
	settings: any
}

export function SettingsForm({ settings }: SettingsFormProps) {
	const INITIAL_STATE = {
		data: settings,
		validationErrors: {},
		requestError: null,
	}

	// const [formState, formAction] = useFormState(
	// 	editTrainerGroupAction.bind(null, addedMembersIds),
	// 	INITIAL_STATE
	// )

	const [settedPalette, setPalette] = useState(PALETTES[0])
	const [settedFont, setFont] = useState(FONTS[0])
	const [settedModules, setModules] = useState<Array<string>>([])

	const elements: FormElementAttributes[] = [
		{
			name: 'title',
			type: 'text',
			label: 'Заголовок портала',
			placeholder: 'Портал спортиваной федерации...',
			required: false,
			element: 'input',
			id: 'titile',
		},
		{
			name: 'logo',
			type: 'file',
			label: 'Загрузить логотип',
			placeholder: 'Картинка котика',
			required: false,
			element: 'uploader',
			id: 'logo',
		},
		{
			name: 'favicon',
			type: 'file',
			label: 'Загрузить favicon',
			placeholder: 'Картинка котика',
			required: false,
			element: 'uploader',
			id: 'favicon',
		},
	]

	return (
		<form action='' className='w-full flex flex-col gap-5'>
			{elements.map((attributes, index) => (
				<div className='w-full bg-white p-5 shadow-md' key={index}>
					<FormElementWrapper attributes={attributes} errors={[]} />
				</div>
			))}
			<div className='flex flex-col gap-2 p-5 bg-white shadow-md'>
				<label className='font-medium'>Выбирите палитру:</label>
				<div className={`w-full flex flex-row flex-wrap gap-5`}>
					{PALETTES.map((palette, index) => (
						<div
							key={index}
							className={`${palette} hover:cursor-pointer p-5 border-2 border-primary hover:border-hover flex-1 flex justify-center items-center ${
								palette === settedPalette
									? 'bg-gradient-to-t from-hover via-background to-white'
									: 'bg-white'
							}`}
							onClick={() => setPalette(palette)}
						>
							<PaletteCard />
						</div>
					))}
				</div>
			</div>
			<div className='flex flex-col gap-2 p-5 bg-white shadow-md'>
				<label className='font-medium'>Выбирите шрифт:</label>
				<div className={`w-full flex flex-row flex-wrap gap-5`}>
					{FONTS.map((font, index) => (
						<div
							key={index}
							className={`${font} hover:cursor-pointer p-5 border-2 border-primary hover:border-hover flex-1 flex flex-col gap-2 justify-center items-center ${
								font === settedFont
									? 'bg-gradient-to-t from-hover via-background to-white'
									: 'bg-white'
							}`}
							onClick={() => setFont(font)}
						>
							<div className='text-5xl font-bold'>Заголовок</div>
							<div className='font-medium'>Жирный текст</div>
							<div className='text-base'>Обычный текст</div>
						</div>
					))}
				</div>
			</div>
			<div className='flex flex-col gap-2 p-5 bg-white shadow-md'>
				<label className='font-medium'>Выбирите модули:</label>
				<div className={`w-full flex flex-row flex-wrap gap-5`}>
					{MODULES.map((module, index) => (
						<div
							key={index}
							className={`p-5 border-2 transition-all duration-300 flex-1 flex flex-col gap-5 items-center ${module.isImplemented ? 'border-primary hover:border-hover' : 'border-gray-400 text-gray-400'}`}
						>
							<div className='w-full flex flex-row gap-5'>
								<div className='text-lg font-medium'>{module.label}</div>
								<div className='flex-1' />
								{settedModules.includes(module.name) ? (
									<DefaultButton
										color='error'
										type='button'
										full={false}
										handler={() =>
											setModules((prev) => {
												let newModules = [...prev.filter((e) => e !== module.name)]

												return newModules
											})
										}
										size='small'
									>
										<X className='h-5 w-5' />
									</DefaultButton>
								) : (
									<DefaultButton
										type='button'
										full={false}
										disabled={!module.isImplemented}
										handler={() =>
											setModules((prev) => {
												let newModules = [...prev]

												newModules.push(module.name)

												return newModules
											})
										}
										size='small'
									>
										<Plus className='h-5 w-5' />
									</DefaultButton>
								)}
							</div>
							<div className=''>{module.description}</div>
						</div>
					))}
				</div>
			</div>
			<div className='w-full flex justify-end gap-y-5 gap-x-10'>
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
