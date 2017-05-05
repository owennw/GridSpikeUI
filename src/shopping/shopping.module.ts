import { NgModule, ModuleWithProviders, NO_ERRORS_SCHEMA } from '@angular/core'

import { DxDataGridModule } from 'devextreme-angular'

import ComponentsModule from '../components/components.module'

import Shopping from './shopping.component'
import ShoppingService from './shopping.service'

import ShoppingRouting from './shopping.routing'

@NgModule({
  imports: [
    ComponentsModule,
    ShoppingRouting,
    DxDataGridModule,
  ],
  declarations: [
    Shopping,
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
  ],
})

export default class ShoppingModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ShoppingModule,
      providers: [ShoppingService],
    }
  }
}
