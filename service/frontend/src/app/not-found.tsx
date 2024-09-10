import { ButtonLink } from '@/components/custom/links'

function NotFound() {
	return (
		<div className='h-full w-full flex flex-col justify-center items-center'>
			<div className='bg-white shadow-md px-10 py-6 flex flex-col items-center gap-10 rounded-lg'>
				<div className='text-3xl font-medium'>404</div>
				<div className='text-5xl font-bold'>Страница не найдена</div>
				<ButtonLink href='/' color='blue'>
					Вернуться домой
				</ButtonLink>
			</div>
		</div>
	)
}

export default NotFound
