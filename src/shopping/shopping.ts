import { ICustomer } from '../customers/customer'

export interface IShopping {
  customer: ICustomer
  numberOfItems: number
  date: Date
  totalCost: number
}
