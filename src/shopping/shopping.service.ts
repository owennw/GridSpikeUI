import { Injectable } from '@angular/core'
import { Http } from '@angular/http'

import { IShopping, IShop } from './shopping'

import { apiUri } from '../config'

@Injectable()
export default class ShoppingService {
  private shoppingUrl = `${apiUri}/shopping`
  private shopUrl = `${apiUri}/shop`

  constructor(private http: Http) {
  }

  getAll(): Promise<IShopping[]> {
    return this.http
      .get(this.shoppingUrl)
      .toPromise()
      .then(response => response.json() as IShopping[])
      .catch(this.handleError)
  }

  get(id: number): Promise<IShop> {
    return this.http
      .get(`${this.shopUrl}/${id}`)
      .toPromise()
      .then(response => response.json() as IShop)
      .catch(this.handleError)
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error)
    return Promise.reject(error.message || error)
  }
}
