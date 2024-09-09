import { User } from "@/interfaces/users";

export function getRoles(user: any): Array<string> {
  const roles: Array<string> = ['sportsman']

	if (user?.is_trainer) {
		roles.push('trainer')
	}

	if (user?.is_superuser) {
		roles.push('admin')
	}

  return roles
}