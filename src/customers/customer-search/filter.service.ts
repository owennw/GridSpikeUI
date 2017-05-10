import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

import { IFilter } from './filter'

@Injectable()
export default class FilterService {
  private filterAddedSource = new Subject<IFilter>()
  private filterRemovedSource = new Subject<IFilter>()

  filterAdded$ = this.filterAddedSource.asObservable()
  filterRemoved$ = this.filterRemovedSource.asObservable()

  addFilter(filter: IFilter): void {
    this.filterAddedSource.next(filter)
  }

  removeFilter(filter: IFilter): void {
    this.filterRemovedSource.next(filter)
  }
}
