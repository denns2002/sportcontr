'use server'

import { H1 } from '@/components/custom/headers'
import { SettingsForm } from './_components/settings-form'
import { getSettingsService } from '@/data/services/settings'

async function Settings() {
	const settings = await getSettingsService()

	return (
		<div className='h-full w-full flex justify-center'>
			<div className='w-full max-w-screen-xl mx-auto'>
				<H1>Конфигурация портала</H1>
				<SettingsForm settings={settings} />
			</div>
		</div>
	)
}

export default Settings
