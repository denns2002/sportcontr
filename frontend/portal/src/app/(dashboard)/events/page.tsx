import { H1 } from '@/components/custom/headers'
import { ButtonLink } from '@/components/custom/links'
import { Plus } from 'lucide-react'
import { withAuth } from '@/hocs';

interface EventsProps {
	roles: Array<string>
}

async function Events({roles}: EventsProps) {
	return (
		<div className='h-full w-full flex justify-center'>
			<div className='w-full max-w-screen-xl mx-auto'>
				<H1>Мероприятия</H1>
				{roles.includes('admin') ? (
					<div className='flex flex-row gap-5 items-center'>
						<span className='text-xl font-semibold'>Хотите добавить новое мероприятие?</span>
						<ButtonLink href='/events/create/' size='small'>
							<Plus className='h-5 w-5' />
						</ButtonLink>
					</div>
				) : null}
			</div>
		</div>
	)
}

export default withAuth(Events, ['admin', 'trainer', 'sportsman'], false)
