import { Component, OnInit } from '@angular/core'

import { IShopping, IPurchase, IShop } from './shopping'
import ShoppingService from './shopping.service'

@Component({
  templateUrl: './shopping.component.html',
})

export default class Shopping implements OnInit {
 shopping: IShopping[] = []
 gridInstance = {}
 selectedPurchase: IPurchase
 shop: IShop

  constructor(
    private shoppingService: ShoppingService,
  ) {
  }

  ngOnInit(): void {
    this.shoppingService.getShopping()
      .then(shopping => this.shopping = shopping)
  }

  onSelectionChangedHandler(e: any) {
    this.selectedPurchase = e.selectedRowsData[0].purchase as IPurchase
    this.shoppingService.getShop(this.selectedPurchase.id)
      .then(shop => this.shop = shop)
  }
}
