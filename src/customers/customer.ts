import { IPurchase } from '../shopping/shopping'
import { IProduct } from '../product.service'

export interface ICustomer {
  id: number
  firstName: string
  lastName: string
  emailAddress: string
  purchases: IPurchase[]
  favouriteFood: IProduct
}
