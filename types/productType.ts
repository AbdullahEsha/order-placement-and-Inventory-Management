import { TReview } from './reviewType'

type TVariant = {
  _id?: string
  quantity: number
  color: string
  size: string[]
  images?: string[]
}

export type TProduct = {
  _id?: string
  sku: string
  title: string
  slug: string
  description: string
  ragularPrice: number
  salePrice?: number
  review?: TReview[]
  category?: string
  status?: 'active' | 'inactive'
  domain?: string
  variant?: TVariant[]
  createdAt?: Date
  updatedAt?: Date
}
