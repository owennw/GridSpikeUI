import { NgModule, ModuleWithProviders } from '@angular/core'

import EntitlementsService from './entitlements.service'

@NgModule({
  imports: [
 ],
  declarations: [
  ],
  schemas: [
  ],
})

export default class EntitlementsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: EntitlementsModule,
      providers: [EntitlementsService],
    }
  }
}
