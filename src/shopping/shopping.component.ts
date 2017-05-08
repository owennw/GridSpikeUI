import { Component, OnInit } from '@angular/core'

import { IShopping, IPurchase, IShop } from './shopping'
import ShoppingService from './shopping.service'
import ProductService, { IProduct } from '../product.service'

@Component({
  templateUrl: './shopping.component.html',
})

export default class Shopping implements OnInit {
 shopping: IShopping[] = []
 gridInstance = {}
 selectedPurchase: IPurchase
 shop: IShop
 products: IProduct[]

  constructor(
    private shoppingService: ShoppingService,
    private productService: ProductService,
  ) {
  }

  ngOnInit(): void {
    this.shoppingService.getAll()
      .then(shopping => this.shopping = shopping)

    this.productService.getAll()
      .then(products => this.products = products)
  }

  onSelectionChangedHandler(e: any) {
    this.selectedPurchase = e.selectedRowsData[0].purchase as IPurchase
    this.shoppingService.get(this.selectedPurchase.id)
      .then(shop => this.shop = shop)
  }
}
