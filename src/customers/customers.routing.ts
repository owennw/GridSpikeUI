import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import Customers from './customers.component'
import CustomerDetail  from './detail/customer-detail.component'

const routes: Routes = [
  { path: '', component: Customers },
  { path: ':id', component: CustomerDetail },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export default class CustomersRouting {}
