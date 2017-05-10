import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs'

import { apiUri } from '../../config'

@Injectable()
export default class CustomerSearchService {
  private customerSearchUrl = `${apiUri}/customerSearch`

  constructor(private http: Http) {
  }

  search(queries: any): Observable<Response> {
    return this.http.get(this.customerSearchUrl, { params: queries })
  }
}
