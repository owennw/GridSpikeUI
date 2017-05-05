import { Component, OnInit } from '@angular/core'

import { IShopping } from './shopping'
import ShoppingService from './shopping.service'

@Component({
  templateUrl: './shopping.component.html',
})

export default class Shopping implements OnInit {
 shopping: IShopping[] = []

  constructor(
    private shoppingService: ShoppingService,
  ) {
  }

  ngOnInit(): void {
    this.shoppingService.getShopping()
      .then(shopping => this.shopping = shopping)
  }
}
