export const monthes = {
	'01': 'января',
	'02': 'февраля',
	'03': 'марта',
	'04': 'апреля',
	'05': 'мая',
	'06': 'июня',
	'07': 'июля',
	'08': 'августа',
	'09': 'сентября',
	'10': 'октября',
	'11': 'ноября',
	'12': 'декабря',
}

export function parseDate(date: string) {
	if (!date) {
		return ''
	}

	const cringe = new Date(date)
	

	const arr = cringe.toISOString().split('-')

	const time = arr[2].split('T').length > 1 ? arr[2].split('T')[1] : ''

	type ObjectKey = keyof typeof monthes

	return (
		[
			time
				? arr[2][0] === '0'
					? arr[2][1]
					: arr[2].slice(0, 2)
				: arr[2][0] === '0'
				? arr[2][1]
				: arr[2],
			monthes[arr[1] as ObjectKey],
			arr[0],
		].join(' ') + (time ? `, ${time.slice(0, 5)}` : '')
	)
}

export function getUserAge(birthString: string) {
	var today = new Date()

	var birthDate = new Date(birthString)

	var age = today.getFullYear() - birthDate.getFullYear()
	var m = today.getMonth() - birthDate.getMonth()

	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age--
	}

	return age
}
