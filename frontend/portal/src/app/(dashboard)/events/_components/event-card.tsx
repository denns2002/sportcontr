import { News } from '@/interfaces/news'
import Image from 'next/image'
import Link from 'next/link'

import { parseDate } from '@/lib/dates'
import { Event } from '@/interfaces/events'
import { Check, X } from 'lucide-react'

interface EventCardProps {
	event: Event
}

export function EventCard({ event }: EventCardProps) {
	const dateStartArray = parseDate(event.date_start || '').split(' ')
	const dateEndArray = parseDate(event.date_end || '').split(' ')

	const regClosed = parseDate(event?.reg_end || '')

	return (
		<Link
			href={`/events/${event?.slug}/`}
			className='w-full flex flex-row flex-wrap bg-white shadow-md'
		>
			<div className='flex flex-col justify-between p-5 border-r-[1px] border-primary text-2xl font-medium'>
				<span>{dateStartArray[0]}</span>
				<span>{dateEndArray[0]}</span>
			</div>
			<div className='flex flex-col justify-between p-5 border-x-[1px] border-primary text-xl gap-1 uppercase'>
				<span>{dateStartArray[1]}</span>
				<span>{dateEndArray[1]}</span>
			</div>
			<div className='p-5 flex-1 border-x-[1px] border-primary text-xl font-medium flex items-center text-wrap'>
				{event.name}
			</div>
			<div className='flex flex-col justify-between p-5 border-x-[1px] border-primary text-xl gap-1'>
				<span>АТТЕСТАЦИЯ</span>
				<span>СЕМИНАР</span>
			</div>
			<div className='flex flex-col justify-between p-5 border-l-[1px] border-primary text-xl gap-1'>
				{event.is_attestation ? (
					<div className='bg-primary p-1 text-white shadow-md'>
						<Check className='h-3 w-3' />
					</div>
				) : (
					<div className='bg-error p-1 text-white shadow-md'>
						<X className='h-3 w-3' />
					</div>
				)}
				{event.is_seminar ? (
					<div className='bg-primary p-1 text-white shadow-md'>
						<Check className='h-3 w-3' />
					</div>
				) : (
					<div className='bg-error p-1 text-white shadow-md'>
						<X className='h-3 w-3' />
					</div>
				)}
			</div>
			<div
				className={`p-2 w-[1rem] text-lg text-medium text-white ${
					regClosed ? 'bg-error' : 'bg-primary'
				}`}
			/>
		</Link>
	)
}
