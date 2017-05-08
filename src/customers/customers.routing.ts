import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import Customers from './customers.component'

const routes: Routes = [
  { path: '', component: Customers },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export default class CustomersRouting {}
