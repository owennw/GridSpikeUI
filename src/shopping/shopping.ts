import { ICustomer } from '../customers/customer'
import { IProduct } from '../product.service'

export interface IPurchase {
  id: number
  date: Date
  customer: ICustomer
  purchaseItems: IPurchaseItem[]
}

export interface IShopping {
  purchase: IPurchase,
  customer: ICustomer
  numberOfItems: number
  date: Date
  totalCost: number
}

interface IPurchaseItem {
  id: number
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
