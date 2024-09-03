interface RequestErrorProps {
	detail: string
}

export function RequestError({ detail }: RequestErrorProps) {
	if (!detail) {
		return null
	}

	return <div className='text-red-500 italic'>{detail}</div>
}
