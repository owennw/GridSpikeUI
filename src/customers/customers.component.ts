import { Component, OnInit } from '@angular/core'

import CustomersService from './customers.service'
import { ICustomer } from './customer'

import ProductService, { IProduct } from '../product.service'

@Component({
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})

export default class Customers implements OnInit {
  customers: ICustomer[] = []
  products: IProduct[]
  invalidRows: any[] = []

  constructor(
    private customersService: CustomersService,
    private productService: ProductService,
  ) {
  }

  ngOnInit(): void {
    this.customersService.getAll()
      .then(customers => this.customers = customers)
      .then(() => console.log(this.customers))

    this.productService.getAll()
      .then(products => this.products = products)
  }

  onRowValidating(event: any) {
    console.log('validating')
    console.log(event)
    if (!event.isValid) {
      if (!event.oldData) {
        this.invalidRows.push(event.newData.__KEY__)
      } else {
        this.invalidRows.push(event.oldData.id)
      }
    } else {
      if (!event.oldData) {
        const index = this.invalidRows.indexOf(event.newData.__KEY__)
        if (index > -1) {
          this.invalidRows.splice(index, 1)
        }
      } else {
        const index = this.invalidRows.indexOf(event.oldData.id)
        if (index > -1) {
          this.invalidRows.splice(index, 1)
        }
      }
    }

    console.log(this.invalidRows)
  }

  onRowInserted(event: any) {
    console.log('insert')
    console.log(event)
    if (this.invalidRows.indexOf(event.data.__KEY__) > -1) {
      // Invalid
      console.log('invalid insert')
      return
    }

    this.customersService.post(event.data)
  }

  onRowUpdated(event: any) {
    console.log('update')
    console.log(event)
    if (this.invalidRows.indexOf(event.key.id) > -1) {
      // Invalid
      console.log('invalid update')
      return
    }

    this.customersService.put(event.key)
  }

  onRowRemoved(event: any) {
    console.log('delete')
    this.customersService.delete(event.data)
  }
}
