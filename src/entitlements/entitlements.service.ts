import { Injectable } from '@angular/core'
import { Http } from '@angular/http'

import { IEntitlement } from './entitlement'

import { entitlementsUri } from '../config'

@Injectable()
export default class CustomersService {
  private entitlementsUrl = `${entitlementsUri}/entitlements`

  constructor(private http: Http) {
  }

  get(): Promise<IEntitlement> {
    return this.http
      .get(`${this.entitlementsUrl}/3`)
      .toPromise()
      .then(response => response.json() as IEntitlement)
      .catch(this.handleError)
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error)
    return Promise.reject(error.message || error)
  }
}
