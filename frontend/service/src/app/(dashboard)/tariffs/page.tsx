'use server'

import { H1 } from '@/components/custom/headers'
import { ButtonLink } from '@/components/custom/links'

function Tariffs() {
	const tariffs = [
		{
			cost: 300,
			points: ['30 пользователей', '3 модуля', 'Бесплатные обновления', 'Техническая поддержка'],
			title: 'Базовый',
			description: 'Идеально для ознакомления',
		},
		{
			cost: 450,
			points: ['60 пользователей', '4 модуля', 'Бесплатные обновления', 'Техническая поддержка'],
			title: 'Продвинутый',
			description: 'Можно купить 6 бутылок пива',
		},
		{
			cost: 600,
			points: ['90 пользователей', '5 модуля', 'Бесплатные обновления', 'Техническая поддержка'],
			title: 'Профессиональный',
			description: 'Для развитых школ и секций',
		},
	]

	return (
		<div className='h-full w-full flex flex-col max-w-screen-lg mx-auto'>
			<H1>Выбирите тариф в зависимости от ваших потребностей</H1>
			<div className='flex flex-row justify-center gap-y-5 gap-x-5 flex-wrap'>
				{tariffs.map((tariff, index) => (
					<div
						className='w-80 flex flex-col px-5 py-5 bg-white shadow-md rounded-2xl items-center'
						key={index}
					>
						<span className=' text-2xl font-medium'>{tariff.title}</span>
						<span className='text-4xl font-medium mt-2'>
							<sup className='text-base'>₽</sup>
							{tariff.cost}
							<sub className='text-base'>/мес.</sub>
						</span>
            <span className='text-lg mt-5'>{tariff.description}</span>
						<div className='flex flex-col gap-2 mt-5 mb-10'>
							{tariff.points.map((point, indexPoint) => (
								<span className='text-lg text-gray-500' key={indexPoint}>
									- {point}
								</span>
							))}
						</div>
            <ButtonLink href='/projects/create'>ОФОРМИТЬ</ButtonLink>
					</div>
				))}
			</div>
		</div>
	)
}

export default Tariffs
