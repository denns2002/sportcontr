type ValidationErrorProps = {
	errors: string[]
}

export function ValidationError({ errors }: ValidationErrorProps) {
	if (!errors) {
		return null
	}

	return errors.map((error, index) => (
		<div key={index} className='text-red-500 text-sm italic'>
			{error}
		</div>
	))
}
