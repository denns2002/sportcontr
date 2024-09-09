import { H1 } from '@/components/custom/headers'
import { getTrainersGroupsService } from '@/data/services/groups-trainers'
import { GroupCard } from './_components/group-card'
import { Group } from '@/interfaces/groups'
import { getUserDetailsService } from '@/data/services/users'
import { ButtonLink } from '@/components/custom/links'
import { FilePlus2, Plus } from 'lucide-react'
import { withAuth } from '@/hocs/'
import { getGroupsService } from '@/data/services/groups-base'

interface GroupsProps {
	roles: Array<string>
}

async function Groups({ roles }: GroupsProps) {
	if (roles.includes('admin')) {
		var data = (await getGroupsService()) as Array<Group>
	} else {
		var data = (await getTrainersGroupsService()) as Array<Group>
	}

	console.log(data)

	return (
		<div className='h-full w-full flex flex-col gap-10'>
			<div className='h-fit w-full bg-white px-10 lg:px-10 py-10 shadow-md flex flex-col gap-10'>
				<H1>Группы</H1>
				{roles.includes('admin') ? (
					<div className='flex'>
						<ButtonLink href='/groups/create/'>
							<>
								<FilePlus2 className='h-5 w-5' /> Создать группу
							</>
						</ButtonLink>
					</div>
				) : null}
			</div>
			<div className='w-full px-10 lg:px-20'>
				<div className='w-full max-w-screen-xl mx-auto flex flex-col gap-5'>
					<div className='flex flex-col gap-5'>
						{data?.map(async (group: Group, index: number) => {
							const members = await Promise.all(group.members.map(getUserDetailsService))

							return (
								<GroupCard
									isEditable={roles.includes('admin')}
									group={group}
									members={members}
									key={index}
								/>
							)
						})}
					</div>
				</div>
			</div>
		</div>
	)
}

export default withAuth(Groups, ['admin', 'trainer'], true)
