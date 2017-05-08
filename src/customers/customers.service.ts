import { Injectable } from '@angular/core'
import { Http, Headers, RequestOptions } from '@angular/http'

import { ICustomer } from './customer'

import { baseUrl } from '../config'

@Injectable()
export default class CustomersService {
  private customersUrl = `${baseUrl}/customers`

  constructor(private http: Http) {
  }

  getAll(): Promise<ICustomer[]> {
      return this.http
        .get(this.customersUrl, { withCredentials: true })
        .toPromise()
        .then(response => response.json() as ICustomer[])
        .catch(this.handleError)
    }

  get(id: number): Promise<ICustomer> {
    return this.http
        .get(`${this.customersUrl}/${id}`, { withCredentials: true })
        .toPromise()
        .then(response => response.json() as ICustomer)
        .catch(this.handleError)
  }

  put(customer: ICustomer) {
    const body = JSON.stringify(customer)
    console.log(body)
    const headers = new Headers({ 'Content-Type': 'application/json' })
    const options = new RequestOptions({ headers: headers })

    this.http
      .put(this.customersUrl, body, options)
      .toPromise()
      .then(response => console.log(response.json()))
      .catch(this.handleError)
  }

  post(customer: ICustomer) {
    const body = JSON.stringify(customer)
    console.log(body)
    const headers = new Headers({ 'Content-Type': 'application/json' })
    const options = new RequestOptions({ headers: headers })

    this.http
      .post(this.customersUrl, body, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError)
  }

  delete(customer: ICustomer) {
    const body = JSON.stringify(customer)
    console.log(body)
    const headers = new Headers({ 'Content-Type': 'application/json' })
    const options = new RequestOptions({ headers: headers, body: body })

    this.http
      .delete(this.customersUrl, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError)
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error)
    return Promise.reject(error.message || error)
  }
}
