import { NgModule, ModuleWithProviders, NO_ERRORS_SCHEMA } from '@angular/core'

import { DxDataGridModule } from 'devextreme-angular'

import ComponentsModule from '../components/components.module'

import Customers from './customers.component'
import CustomersService from './customers.service'

import CustomerSearch from './customer-search/customer-search.component'
import CustomerSearchService from './customer-search/customer-search.service'

import Filter from './customer-search/filter.component'

import SignalRService from '../signalr.service'
import ProductService from '../product.service'
import EntitlementsService from '../entitlements/entitlements.service'

import CustomersRouting from './customers.routing'

@NgModule({
  imports: [
    ComponentsModule,
    CustomersRouting,
    DxDataGridModule,
 ],
  declarations: [
    Customers,
    CustomerSearch,
    Filter,
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
  ],
})

export default class CustomersModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CustomersModule,
      providers: [
        CustomersService,
        CustomerSearchService,
        ProductService,
        EntitlementsService,
        SignalRService,
      ],
    }
  }
}
