import { Component } from '@angular/core'

import CustomerSearchService from './customer-search.service'
import { ICustomer } from '../customer'

@Component({
  selector: 'customer-search',
  templateUrl: './customer-search.component.html',
})

export default class CustomerSearch {
  customerSearchResults: ICustomer[] = []

  constructor(private customerSearchService: CustomerSearchService) { }

  search(query: any): Promise<ICustomer[]> {
    return this.customerSearchService.search(query)
      .then(customers => this.customerSearchResults = customers)
  }
}
