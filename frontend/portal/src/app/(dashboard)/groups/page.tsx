import { H1 } from '@/components/custom/headers'
import { getTrainersGroupsService } from '@/data/services/groups-trainers'
import { GroupCard } from './_components/group-card'
import { Group } from '@/interfaces/groups'
import { getUserDetailsService } from '@/data/services/users'
import { ButtonLink } from '@/components/custom/links'
import { Plus } from 'lucide-react'

async function Groups() {
	const data = (await getTrainersGroupsService()) as Array<Group>

	return (
		<div className='h-full w-full flex justify-center'>
			<div className='w-full max-w-screen-xl mx-auto'>
				<H1>Ваши группы</H1>
				<div className='flex flex-row gap-5 items-center'>
				<span className='text-xl font-semibold'>Хотите добавить новую группу?</span>
				<ButtonLink href='/groups/create/' size='small'>
					<Plus className='h-5 w-5' />
				</ButtonLink>
			</div>
				<div className='flex flex-col gap-5 mt-10'>
					{data.map(async (group: Group, index: number) => {
						const members = await Promise.all(group.members.map(getUserDetailsService))

						return <GroupCard group={group} members={members} key={index} />
					})}
				</div>
			</div>
		</div>
	)
}

export default Groups
