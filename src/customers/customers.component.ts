import { Component, OnInit } from '@angular/core'

import CustomersService from './customers.service'
import { ICustomer } from './customer'

import ProductService, { IProduct } from '../product.service'

import { signalRUri } from '../config'

interface IRow {
  unsavedKey: string
  savedKey: string
  data: any
}

class NewRow implements IRow {
  constructor(private row: any) { }

  get unsavedKey() {
    return this.row.newData.__KEY__
  }

  get savedKey() {
    return this.row.key.__KEY__
  }

  get data() {
    return this.row.data
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

  get data() {
    return this.row.key
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
  private invalidRows: string[] = []
  private rowFactory: RowFactory
  private connection: SignalR.Hub.Connection
  private proxy: SignalR.Hub.Proxy

  constructor(
    private customersService: CustomersService,
    private productService: ProductService,
  ) {
    this.rowFactory = new RowFactory()
    this.connection = $.hubConnection()
    this.connection.url = signalRUri
    this.connection.logging = true
    this.connection.error((error: any) => console.error(error))
    this.proxy = this.connection.createHubProxy('customerHub')

    this.proxy.on('addCustomer', (customer) => this.addCustomer(customer))
    this.proxy.on('deleteCustomer', (customer) => this.deleteCustomer(customer))

    this.connection.start()
      .fail((error: any) => console.error(error))
  }

  ngOnInit(): void {
    this.getCustomers()

    this.productService.getAll()
      .then(products => this.products = products)
  }

  private getCustomers(): Promise<ICustomer[]> {
    return this.customersService.getAll()
      .then(customers => this.customers = customers)
  }

  private addCustomer(customer: ICustomer) {
    const index = this.customers.map(c => c.id).indexOf(customer.id)
      if (index > -1) {
        this.customers[index] = customer
      } else {
        this.customers.push(customer)
      }
  }

  private deleteCustomer(customer: ICustomer) {
    const index = this.customers.map(c => c.id).indexOf(customer.id)
    if (index > -1) {
      this.customers.splice(index, 1)
    }
  }

  private addInvalidRow(row: IRow) {
    this.invalidRows.push(row.unsavedKey)
  }

  private removeInvalidRow(row: IRow) {
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

    this.customersService.post(row.data)
      .then((customer: any) => {
        this.getCustomers()
          .then(() => this.proxy.invoke('add', customer))
      })
  }

  onRowUpdated(event: any) {
    const row = this.rowFactory.create(event)
    if (this.invalidRows.indexOf(row.savedKey) > -1) {
      // Invalid
      return
    }

    this.customersService.put(row.data)
      .then((customer: any) => {
        this.getCustomers()
          .then(() => this.proxy.invoke('add', customer))
      })
  }

  onRowRemoved(event: any) {
    this.customersService.delete(event.data)
      .then((customer: any) => {
        this.getCustomers()
          .then(() => this.proxy.invoke('delete', customer))
      })
  }
}
