import { Component, ViewEncapsulation } from '@angular/core'

@Component({
  selector: 'shopping-app',
  template: `
    <header>Shopping Data</header>
    <nav>
      <ul>
        <li><a routerLink="/dashboard">Home</a></li>
        <li><a routerLink="/customers">Customers</a></li>
        <li><a routerLink="/shopping">Shopping</a></li>
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
}
