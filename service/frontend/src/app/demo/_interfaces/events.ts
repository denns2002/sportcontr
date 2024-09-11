export interface Event {
	id?: number
	slug?: string
	name: string
	about: string
	address: string
	is_attestation?: boolean
	is_seminar?: boolean
	reg_start?: string
	reg_end?: string
	date_start?: string
	date_end?: string
	created_at?: string
	members?: Array<number>
	organizers?: Array<number>
}

export interface EventData {
  name: string
	about: string
	address: string
	is_attestation?: boolean
	is_seminar?: boolean
	reg_start?: string
	reg_end?: string
	date_start?: string
	date_end?: string
}
