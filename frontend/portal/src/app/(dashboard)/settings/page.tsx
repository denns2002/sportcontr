'use server'

import { H1 } from '@/components/custom/headers'
import { SettingsForm } from './_components/settings-form'

function Settings() {
	return (
		<div className='h-full w-full flex justify-center'>
			<div className='w-full max-w-screen-xl mx-auto'>
				<H1>Конфигурация портала</H1>
				<SettingsForm settings={null} />
			</div>
		</div>
	)
}

export default Settings
