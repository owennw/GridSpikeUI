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
  filterCount: number = 1
  filters: IFilter[] = []

  constructor(
    private customerSearchService: CustomerSearchService,
    private productService: ProductService,
    private filterService: FilterService
  ) {
    filterService.filterAdded$.subscribe(filter => {
      this.filters.push(filter)
    })

    filterService.filterRemoved$.subscribe(
      filter => {
        const index = this.filters.indexOf(filter)
        this.filters.splice(index, 1)
      }
    )
  }

  ngOnInit(): void {
    this.productService.getAll()
      .then(products => this.products = products)
  }

  addFilter(): void {
    this.filterCount++
  }

  removeFilter(): void {
    this.filterCount--
  }

  remainingSearchableParams(): IFilter[] {
    // const existingKeys = this.filters.map(f => f.key)
    // const existingKeysIndices = existingKeys.map(k => {
    //   const customerFiltersKeys = customerFilters.map(cf => cf.key)
    //   return customerFiltersKeys.indexOf(k)
    // })

    // let result = customerFilters
    // for (let i = 0; i < existingKeysIndices.length; i++) {
    //   result.splice(existingKeysIndices[i], 1)
    // }

    // return result

    return customerFilters
  }

  submit() {
    const queries = this.filters
      .map(f => f.getQuery())
      .reduce((pv, cv) => ({ ...pv, ...cv }), {})

    this.customerSearchService.search(queries)
      .subscribe(response => this.customerSearchResults = response.json() as ICustomer[])
  }
}
