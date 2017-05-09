import { Component, OnInit } from '@angular/core'
import { Observable, Subject } from 'rxjs'

import CustomerSearchService from './customer-search.service'
import { ICustomer } from '../customer'

@Component({
  selector: 'customer-search',
  templateUrl: './customer-search.component.html',
})

export default class CustomerSearch implements OnInit {
  customerSearchResults: ICustomer[] = []
  searchQuery: string = ''
  private keyUp = new Subject<string>()

  constructor(private customerSearchService: CustomerSearchService) { }

  ngOnInit(): void {
    this.keyUp
      .debounceTime(300)
      .distinctUntilChanged()
      .flatMap(search => Observable.of(search).delay(50))
      .subscribe(data => this.searchQuery = data)
  }

  search(query: any): Promise<ICustomer[]> {
    return this.customerSearchService.search(query)
      .then(customers => this.customerSearchResults = customers)
  }
}
