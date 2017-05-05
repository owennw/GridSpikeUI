import { NgModule, ModuleWithProviders, NO_ERRORS_SCHEMA } from '@angular/core'

import ComponentsModule from '../components/components.module'

import Customers from './customers.component'
import CustomerDetail from './detail/customer-detail.component'
import CustomersService from './customers.service'

import CustomersRouting from './customers.routing'

@NgModule({
  imports: [
    ComponentsModule,
    CustomersRouting,
  ],
  declarations: [
    Customers,
    CustomerDetail,
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
  ],
})

export default class CustomersModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CustomersModule,
      providers: [CustomersService],
    }
  }
}
