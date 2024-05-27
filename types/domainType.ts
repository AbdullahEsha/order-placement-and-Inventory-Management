export type TDomain = {
  _id?: string
  name: string
  subDomain: string
  userLimit: number
  productLimit: number
  status?: 'active' | 'inactive'
  createdAt?: Date
  updatedAt?: Date
}
