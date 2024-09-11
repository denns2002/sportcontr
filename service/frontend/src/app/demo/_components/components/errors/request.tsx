interface RequestErrorProps {
	detail: string
}

export function RequestError({ detail }: RequestErrorProps) {
	if (!detail) {
		return null
	}

	return <div className='text-error italic mt-2'>{detail}</div>
}
