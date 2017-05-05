import { Injectable } from '@angular/core'
import { Http } from '@angular/http'

import { IShopping, IShop } from './shopping'

import { baseUrl } from '../config'

@Injectable()
export default class ShoppingService {
  private shoppingUrl = `${baseUrl}/shopping`
  private shopUrl = `${baseUrl}/shop`

  constructor(private http: Http) {
  }

  getShopping(): Promise<IShopping[]> {
    return this.http
      .get(this.shoppingUrl)
      .toPromise()
      .then(response => response.json() as IShopping[])
      .catch(this.handleError)
  }

  getShop(id: number): Promise<IShop> {
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
