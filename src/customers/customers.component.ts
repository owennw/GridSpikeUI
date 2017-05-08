import { Component, OnInit } from '@angular/core'

import CustomersService from './customers.service'
import { ICustomer } from './customer'

import ProductService, { IProduct } from '../product.service'

interface IRow {
  unsavedKey: string
  savedKey: string
}

class NewRow implements IRow {
  constructor(private row: any) { }

  get unsavedKey() {
    return this.row.newData.__KEY__
  }

  get savedKey() {
    return this.row.key.__KEY__
  }
}

class UpdatedRow implements IRow {
  constructor(private row: any) { }

  get unsavedKey() {
    return this.row.key.id
  }

  get savedKey() {
    return this.unsavedKey
  }
}

class RowFactory {
  create(event: any): IRow {
    if (!event.key.id) {
      return new NewRow(event)
    }

    return new UpdatedRow(event)
  }
}

@Component({
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})

export default class Customers implements OnInit {
  customers: ICustomer[] = []
  products: IProduct[]
  invalidRows: string[] = []
  rowFactory: RowFactory

  constructor(
    private customersService: CustomersService,
    private productService: ProductService,
  ) {
    this.rowFactory = new RowFactory()
  }

  ngOnInit(): void {
    this.customersService.getAll()
      .then(customers => this.customers = customers)

    this.productService.getAll()
      .then(products => this.products = products)
  }

  addInvalidRow(row: IRow) {
    this.invalidRows.push(row.unsavedKey)
  }

  removeInvalidRow(row: IRow) {
    const index = this.invalidRows.indexOf(row.unsavedKey)
    if (index > -1) {
      this.invalidRows.splice(index, 1)
    }
  }

  onRowValidating(event: any) {
    const row = this.rowFactory.create(event)
    if (!event.isValid) {
      this.addInvalidRow(row)
    } else {
      this.removeInvalidRow(row)
    }
  }

  onRowInserted(event: any) {
    const row = this.rowFactory.create(event)
    if (this.invalidRows.indexOf(row.savedKey) > -1) {
      // Invalid
      return
    }

    this.customersService.post(event.data)
  }

  onRowUpdated(event: any) {
    const row = this.rowFactory.create(event)
    if (this.invalidRows.indexOf(row.savedKey) > -1) {
      // Invalid
      return
    }

    this.customersService.put(event.key)
  }

  onRowRemoved(event: any) {
    this.customersService.delete(event.data)
  }
}
