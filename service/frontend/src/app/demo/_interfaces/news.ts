import { StaticImageData } from "next/image"

export interface News {
	id?: number
	slug?: string
	image?: string | StaticImageData
	title: string
	description: string
	is_published?: boolean
	author?: number
	created_at?: string
	updated_at?: string
}

export interface NewsData {
	title: string
	description: string
	is_published: boolean
}
