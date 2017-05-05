import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { HttpModule, BaseRequestOptions } from '@angular/http'

import AppRoutingModule from './app-routing.module'

import { App } from './app.component'

import ComponentsModule from '../components/components.module'

import Dashboard from '../dashboard/dashboard.component'

import CustomersModule from '../customers/customers.module'

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ComponentsModule,
    CustomersModule.forRoot(),
  ],
  declarations: [
    App,
    Dashboard,
  ],
  providers: [
    BaseRequestOptions,
  ],
  bootstrap: [
    App,
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
  ],
})

export default class AppModule { }
