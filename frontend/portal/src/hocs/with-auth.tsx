import { verifyUserService } from '@/data/services/auth'
import { getRoles } from '@/lib/roles'
import { redirect } from 'next/navigation'

interface Props {
	params: { id: string }
	searchParams: { [key: string]: string | string[] | undefined }
}

export function withAuth(Component: any, allowedRoles: Array<string>, isPrivate: boolean) {
	return async function WithAuth({ params, searchParams }: Props) {

		const { data: user, authenticated } = await verifyUserService()

		if (isPrivate && !authenticated) {
			redirect('/signin/')
		}

		const roles = getRoles(user)

		if (!allowedRoles.some((role) => roles.includes(role))) {
			redirect('/')
		}

		return <Component roles={roles} params={params} searchParams={searchParams} />
	}
}
