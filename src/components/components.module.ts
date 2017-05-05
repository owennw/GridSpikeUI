import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import Page from './page/page.component'
import PageHeader from './page/page-header.component'

@NgModule({
  imports: [CommonModule],
  declarations: [
    Page,
    PageHeader,
  ],
  exports: [
    CommonModule,
    Page,
    PageHeader,
  ],
})

export default class ComponentsModule {}
