import { Injectable } from '@angular/core'
import { Http } from '@angular/http'

import { baseUrl } from './config'

@Injectable()
export default class ProductService {
  private products = `${baseUrl}/products`

  constructor(private http: Http) {
  }

  getAll(): Promise<IProduct[]> {
    return this.http
      .get(this.products)
      .toPromise()
      .then(response => response.json() as IProduct[])
      .catch(this.handleError)
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error)
    return Promise.reject(error.message || error)
  }
}

export interface IProduct {
  id: number
  name: string
  price: number
}
