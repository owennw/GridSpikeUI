import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import CustomersService from './customers.service'
import { ICustomer } from './customer'

@Component({
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})

export default class Customers implements OnInit {
  customers: ICustomer[] = []

  constructor(
    private customersService: CustomersService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getCustomers()
  }

  getCustomers(): void {
    this.customersService.getCustomers()
      .then(customers => this.customers = customers)
  }

  onSelect(customer: ICustomer): void {
    this.router.navigate(['/customers', customer.id])
  }
}
