type H1Props = {
	children: React.ReactElement | string
}

export function H1({ children }: H1Props) {
	return <h1 className='text-5xl font-semibold leading-[4rem]'>{children}</h1>
}
