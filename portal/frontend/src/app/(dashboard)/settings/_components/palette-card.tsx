export function PaletteCard() {
	return (
		  <div className={`relative w-28 h-28`}>
  			<div className='bg-background h-[4.25rem] w-[4.25rem] rounded-full absolute top-0 left-[1.42rem]' />
  			<div className='bg-active h-[4.25rem] w-[4.25rem] rounded-full absolute bottom-0 left-0' />
  			<div className='bg-primary h-[4.25rem]   w-[4.25rem] rounded-full absolute bottom-0 right-0' />
  		</div>
	)
}
