import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import Shopping from './shopping.component'

const routes: Routes = [
  { path: '', component: Shopping },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export default class MatchesRouting {}
