import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import Dashboard from '../dashboard/dashboard.component'

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'customers', loadChildren: '../customers/customers.module' },
  { path: 'shopping', loadChildren: '../shopping/shopping.module' },
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})

export default class AppRoutingModule { }
