import { Component, ViewEncapsulation } from '@angular/core'

@Component({
  selector: 'shopping-app',
  template: `
    <header>Shopping Data</header>
    <nav>
      <ul>
        <li><a routerLink="/dashboard">Home</a></li>
        <li><a routerLink="/customers">Customers</a></li>
      </ul>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: [ '../styles/styles.css', './app.component.css' ],
  encapsulation: ViewEncapsulation.None,
})

export class App {
}
