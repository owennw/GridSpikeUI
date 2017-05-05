import { Injectable } from '@angular/core'
import { Http } from '@angular/http'

import { ICustomer } from './customer'

import { baseUrl } from '../config'

@Injectable()
export default class CustomersService {
  private customersUrl = `${baseUrl}/customers`

  constructor(private http: Http) {
  }

  getCustomers(): Promise<ICustomer[]> {
      return this.http
        .get(this.customersUrl, { withCredentials: true })
        .toPromise()
        .then(response => response.json().$values as ICustomer[])
        .catch(this.handleError)
    }

  getCustomer(id: number): Promise<ICustomer> {
    return this.http
        .get(`${this.customersUrl}/${id}`, { withCredentials: true })
        .toPromise()
        .then(response => response.json() as ICustomer)
        .catch(this.handleError)
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error)
    return Promise.reject(error.message || error)
  }
}
