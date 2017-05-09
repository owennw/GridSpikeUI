import { Injectable } from '@angular/core'
import { Http, Headers, RequestOptions } from '@angular/http'

import { ICustomer } from '../customer'

import { apiUri } from '../../config'

const createHttpOptions = (query?: any) => {
  const headers = new Headers({ 'Content-Type': 'application/json' })
  return new RequestOptions({ headers, body: JSON.stringify(query) })
}

@Injectable()
export default class CustomerSearchService {
  private customerSearchUrl = `${apiUri}/customerSearch`

  constructor(private http: Http) {
  }

  search(query: any): Promise<ICustomer[]> {
      return this.http
        .get(this.customerSearchUrl, createHttpOptions(query))
        .toPromise()
        .then(response => response.json() as ICustomer[])
        .catch(this.handleError)
    }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error)
    return Promise.reject(error.message || error)
  }
}
