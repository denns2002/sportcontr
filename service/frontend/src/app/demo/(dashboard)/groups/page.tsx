import { FilePlus2 } from 'lucide-react'
import { H1 } from '../../_components/components/custom/headers'
import { ButtonLink } from '../../_components/components/custom/links'
import { Group } from 'next/dist/shared/lib/router/utils/route-regex'
import { GroupCard } from './_components/group-card'

interface GroupsProps {
	roles: Array<string>
}

async function Groups({ roles }: GroupsProps) {
	const groups = [
		{
			id: 1,
			slug: 'hDjkfF',
			name: 'Старшая-1',
			description:
				'С учётом сложившейся международной обстановки, разбавленное изрядной долей эмпатии, рациональное мышление однозначно фиксирует необходимость своевременного выполнения сверхзадачи.',
			trainers: [10],
			members: [1, 2, 3, 4, 5, 6],
		},
		{
			id: 1,
			slug: 'hDjkfF',
			name: 'Старшая-1',
			description:
				'С учётом сложившейся международной обстановки, разбавленное изрядной долей эмпатии, рациональное мышление однозначно фиксирует необходимость своевременного выполнения сверхзадачи.',
			trainers: [10],
			members: [1, 2, 3, 4, 5, 6],
		},
		{
			id: 1,
			slug: 'hDjkfF',
			name: 'Старшая-1',
			description:
				'С учётом сложившейся международной обстановки, разбавленное изрядной долей эмпатии, рациональное мышление однозначно фиксирует необходимость своевременного выполнения сверхзадачи.',
			trainers: [10],
			members: [1, 2, 3, 4, 5, 6],
		},
	]

	return (
		<div className='h-full w-full flex flex-col gap-10'>
			<div className='h-fit w-full bg-white px-10 lg:px-10 py-10 shadow-md flex flex-col gap-10'>
				<H1>Группы</H1>
				<div className='flex'>
					<ButtonLink href='/demo/groups/create/'>
						<>
							<FilePlus2 className='h-5 w-5' /> Создать группу
						</>
					</ButtonLink>
				</div>
			</div>
			<div className='w-full px-10 lg:px-20'>
				<div className='w-full max-w-screen-xl mx-auto flex flex-col gap-5'>
					<div className='flex flex-col gap-5'>
						{groups?.map((group, index: number) => {
							const members = [
								{
									last_name: 'Иванов',
									first_name: 'Иван',
									middle_name: 'Иванович',
									username: 'username',
									is_superuser: false,
									is_trainer: false,
									avatar: undefined,
									id: 0,
									birth_date: '2000-06-12',
								},
								{
									last_name: 'Иванов',
									first_name: 'Иван',
									middle_name: 'Иванович',
									username: 'username',
									is_superuser: false,
									is_trainer: false,
									avatar: undefined,
									id: 1,
									birth_date: '2000-06-12',
								},
								{
									last_name: 'Иванов',
									first_name: 'Иван',
									middle_name: 'Иванович',
									username: 'username',
									is_superuser: false,
									is_trainer: false,
									avatar: undefined,
									id: 2,
									birth_date: '2000-06-12',
								},
								{
									last_name: 'Иванов',
									first_name: 'Иван',
									middle_name: 'Иванович',
									username: 'username',
									is_superuser: false,
									is_trainer: false,
									avatar: undefined,
									id: 3,
									birth_date: '2000-06-12',
								},
								{
									last_name: 'Иванов',
									first_name: 'Иван',
									middle_name: 'Иванович',
									username: 'username',
									is_superuser: false,
									is_trainer: false,
									avatar: undefined,
									id: 4,
									birth_date: '2000-06-12',
								},
								{
									last_name: 'Иванов',
									first_name: 'Иван',
									middle_name: 'Иванович',
									username: 'username',
									is_superuser: false,
									is_trainer: false,
									avatar: undefined,
									id: 5,
									birth_date: '2000-06-12',
								},
							]

							return <GroupCard isEditable={true} group={group} members={members} key={index} />
						})}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Groups
