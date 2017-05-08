import { NgModule, ModuleWithProviders, NO_ERRORS_SCHEMA } from '@angular/core'

import { DxDataGridModule } from 'devextreme-angular'

import ComponentsModule from '../components/components.module'

import Customers from './customers.component'
import CustomersService from './customers.service'
import ProductService from '../product.service'

import CustomersRouting from './customers.routing'

@NgModule({
  imports: [
    ComponentsModule,
    CustomersRouting,
    DxDataGridModule,
 ],
  declarations: [
    Customers,
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
  ],
})

export default class CustomersModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CustomersModule,
      providers: [CustomersService, ProductService],
    }
  }
}
