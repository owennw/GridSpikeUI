import { Component, ViewEncapsulation } from '@angular/core'

import EntitlementsService from '../entitlements/entitlements.service'
import { IEntitlement } from '../entitlements/entitlement'

@Component({
  selector: 'shopping-app',
  template: `
    <header>Shopping Data</header>
    <nav>
      <ul>
        <li><a routerLink="/dashboard">Home</a></li>
        <li *ngIf="viewCustomers"><a routerLink="/customers">Customers</a></li>
        <li *ngIf="viewShopping"><a routerLink="/shopping">Shopping</a></li>
      </ul>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: [
    '../styles/styles.css',
    '../../node_modules/devextreme/dist/css/dx.common.css',
    '../../node_modules/devextreme/dist/css/dx.light.css',
    './app.component.css',
  ],
  encapsulation: ViewEncapsulation.None,
})

export class App {
  viewCustomers: boolean
  viewShopping: boolean

  constructor(private entitlementsService: EntitlementsService) { }

  ngOnInit(): void {
    this.entitlementsService.get()
      .then((entitlement: IEntitlement) => {
        this.viewCustomers = entitlement.viewCustomers
        this.viewShopping = entitlement.viewShopping
      })
  }
}
