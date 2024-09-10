'use server'

import { H1 } from '@/components/custom/headers'

const POSISIBILITIES = [
	{
		title: 'Возможность №1',
		description:
			'Кстати, сделанные на базе интернет-аналитики выводы представляют собой не что иное, как квинтэссенцию победы маркетинга над разумом и должны быть ассоциативно распределены по отраслям.',
	},
	{
		title: 'Возможность №2',
		description:
			'Кстати, сделанные на базе интернет-аналитики выводы представляют собой не что иное, как квинтэссенцию победы маркетинга над разумом и должны быть ассоциативно распределены по отраслям.',
	},
	{
		title: 'Возможность №3',
		description:
			'Кстати, сделанные на базе интернет-аналитики выводы представляют собой не что иное, как квинтэссенцию победы маркетинга над разумом и должны быть ассоциативно распределены по отраслям.',
	},
]

function Dashboard() {
	return (
		<div className='h-full w-full mx-auto max-w-screen-lg flex flex-col'>
			<H1>Создайте портал для спортивной организации</H1>
			<div className='text-gray-600'>
				Высокий уровень вовлечения представителей целевой аудитории является четким доказательством
				простого факта: внедрение современных методик способствует повышению качества системы
				обучения кадров, соответствующей насущным потребностям.
			</div>
			<div className='text-gray-600 mt-5 mb-10'>
				Каждый из нас понимает очевидную вещь: реализация намеченных плановых заданий выявляет
				срочную потребность дальнейших направлений развития.
			</div>
			<H1>Предоставляемые возможности</H1>
			<div className='flex flex-row flex-wrap gap-5'>
				{POSISIBILITIES.map((posibility, index) => (
					<div
						className='w-80 flex flex-col p-5 gap-5 bg-white shadow-md rounded-2xl'
						key={index}
					>
						<span className='text-lg font-medium'>{posibility.title}</span>
						<div className='text-base text-gray-600'>{posibility.description}</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default Dashboard
