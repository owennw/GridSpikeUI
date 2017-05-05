import { ICustomer } from '../customers/customer'

export interface IPurchase {
  id: number
  date: Date
}

export interface IShopping {
  purchase: IPurchase,
  customer: ICustomer
  numberOfItems: number
  date: Date
  totalCost: number
}

export interface IProduct {
  id: number
  name: string
  price: number
}

interface IPurchaseItem {
  purchase: IPurchase
  product: IProduct
  quantity: number
  price: number
}

export interface IShop {
  customer: ICustomer
  date: Date
  products: IPurchaseItem[]
}
