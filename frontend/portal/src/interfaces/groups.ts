export interface Group {
  id: number
  slug: string
  name: string
  description: string
  trainers: number[]
  members: number[]
}

export interface GroupData {
  name: string
  description: string
  trainers: number[]
  members: number[]
}

export interface TrainerGroupData {
  name: string
  description: string
  members: number[]
}