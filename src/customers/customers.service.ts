import { Injectable } from '@angular/core'
import { Http, Headers, RequestOptions } from '@angular/http'

import { ICustomer } from './customer'

import { apiUri } from '../config'

const createHttpOptions = (object?: any) => {
  const headers = new Headers({ 'Content-Type': 'application/json' })
  return object ?
    new RequestOptions({ headers, body: JSON.stringify(object) }) :
    new RequestOptions({ headers })
}

@Injectable()
export default class CustomersService {
  private customersUrl = `${apiUri}/customers`

  constructor(private http: Http) {
  }

  getAll(): Promise<ICustomer[]> {
      return this.http
        .get(this.customersUrl)
        .toPromise()
        .then(response => response.json() as ICustomer[])
        .catch(this.handleError)
    }

  get(id: number): Promise<ICustomer> {
    return this.http
        .get(`${this.customersUrl}/${id}`)
        .toPromise()
        .then(response => response.json() as ICustomer)
        .catch(this.handleError)
  }

  put(customer: ICustomer): Promise<ICustomer> {
    const body = JSON.stringify(customer)
    const options = createHttpOptions()

    return this.http
      .put(this.customersUrl, body, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError)
  }

  post(customer: ICustomer): Promise<ICustomer> {
    const body = JSON.stringify(customer)
    const options = createHttpOptions()

    return this.http
      .post(this.customersUrl, body, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError)
  }

  delete(customer: ICustomer): Promise<ICustomer> {
    const options = createHttpOptions(customer)

    return this.http
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
