import { Component, OnInit } from '@angular/core'
import { Observable, Subject } from 'rxjs'

import CustomerSearchService from './customer-search.service'
import { ICustomer } from '../customer'

import ProductService, { IProduct } from '../../product.service'

@Component({
  selector: 'customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.css'],
})

export default class CustomerSearch implements OnInit {
  customerSearchResults: ICustomer[] = []
  searchQuery: string = ''
  products: IProduct[]
  private keyUp = new Subject<string>()

  constructor(
    private customerSearchService: CustomerSearchService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productService.getAll()
      .then(products => this.products = products)

    this.keyUp
      .debounceTime(300)
      .distinctUntilChanged()
      .flatMap(search => Observable.of(search).delay(50))
      .subscribe(data => {
        this.searchQuery = data
        this.customerSearchService.search(data)
          .subscribe(response => this.customerSearchResults = response.json() as ICustomer[])
      })
  }
}
