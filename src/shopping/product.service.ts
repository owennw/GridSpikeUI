import { Injectable } from '@angular/core'
import { Http } from '@angular/http'

import { IProduct } from './shopping'

import { baseUrl } from '../config'

@Injectable()
export default class ProductService {
  private products = `${baseUrl}/products`

  constructor(private http: Http) {
  }

  getProducts(): Promise<IProduct[]> {
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
