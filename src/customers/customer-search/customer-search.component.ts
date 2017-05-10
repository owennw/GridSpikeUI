import { Component, OnInit } from '@angular/core'

import CustomerSearchService from './customer-search.service'
import { ICustomer } from '../customer'

import ProductService, { IProduct } from '../../product.service'

import { IFilter } from './filter'
import { customerFilters } from './customer-filters'

import FilterService from './filter.service'

@Component({
  selector: 'customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.css'],
  providers: [FilterService],
})

export default class CustomerSearch implements OnInit {
  customerSearchResults: ICustomer[] = []
  products: IProduct[]
  filterCountArray: number[] = []
  filters: IFilter[] = []

  constructor(
    private customerSearchService: CustomerSearchService,
    private productService: ProductService,
    private filterService: FilterService
  ) {
    this.filterCountArray.push(0)

    filterService.filterAdded$.subscribe(filter => this.filters.push(filter))
    filterService.filterRemoved$.subscribe(filter => this.filters.pop())
  }

  ngOnInit(): void {
    this.productService.getAll()
      .then(products => this.products = products)
  }

  canAdd(): boolean {
    return this.filters.length === this.filterCountArray.length
  }

  canRemove(): boolean {
    return this.filterCountArray.length > 1
  }

  addFilter(): void {
    this.filterCountArray.push(0)
  }

  removeFilter(): void {
    this.filterCountArray.pop()
  }

  remainingSearchableParams(): IFilter[] {
    const existingIds = this.filters.map(f => f.getId())
    const result = customerFilters.filter(c => existingIds.indexOf(c.getId()) === -1)
    return result
  }

  submit() {
    const queries = this.filters
      .map(f => f.getQuery())
      .reduce((pv, cv) => ({ ...pv, ...cv }), {})

    this.customerSearchService.search(queries)
      .subscribe(response => this.customerSearchResults = response.json() as ICustomer[])
  }
}
