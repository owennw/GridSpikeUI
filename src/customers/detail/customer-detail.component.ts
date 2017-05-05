import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { Location } from '@angular/common'

import CustomersService from '../customers.service'
import { ICustomer } from '../customer'

@Component({
  templateUrl: './customer-detail.component.html',
  styleUrls: [ './customer-detail.component.css' ],
})

export default class CustomerDetailComponent implements OnInit {
  customer: ICustomer

  constructor(
    private customersService: CustomersService,
    private route: ActivatedRoute,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.customersService.getCustomer(params['id']))
      .subscribe(customer => this.customer = customer)
  }

  goBack(): void {
    this.location.back()
  }
}
