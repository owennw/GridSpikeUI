import { Component, Input, OnInit, OnDestroy } from '@angular/core'

import FilterService from './filter.service'
import { IFilter } from './filter'

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
})

export default class Filter implements OnInit, OnDestroy {
  operators: string[] = ['-', 'NOT']
  selectedOperator: string
  @Input() remainingFilters: IFilter[]
  selectedFilter: IFilter
  currentValue: string

  constructor(private filterService: FilterService) {
  }

  ngOnInit(): void {
    this.selectedFilter = this.remainingFilters[0]
    this.selectedOperator = this.operators[0]
    this.selectedFilter.updateOperator(this.selectedOperator)
  }

  ngOnDestroy(): void {
    if (this.selectedFilter.isValid()) {
      this.selectedFilter.reset()
      this.filterService.removeFilter(this.selectedFilter)
    }
  }

  onOperatorChange(value: string): void {
    if (this.selectedFilter.hasValue()) {
      this.filterService.removeFilter(this.selectedFilter)
    }

    this.selectedFilter.updateOperator(value)

    if (this.selectedFilter.isValid()) {
      this.filterService.addFilter(this.selectedFilter)
    }
  }

  onFilterChange(name: string) {
    if (this.selectedFilter.hasValue()) {
      this.filterService.removeFilter(this.selectedFilter)
    }

    this.selectedFilter.reset()

    this.selectedFilter = this.remainingFilters.find(rf => rf.getName() === name)

    this.selectedFilter.updateOperator(this.selectedOperator)
    this.selectedFilter.updateValue(this.currentValue)

    if (this.selectedFilter.isValid()) {
      this.filterService.addFilter(this.selectedFilter)
    }
  }

  update(value: string) {
    this.currentValue = value
    if (this.selectedFilter.hasValue()) {
      this.filterService.removeFilter(this.selectedFilter)
    }

    this.selectedFilter.updateValue(value)

    if (this.selectedFilter.isValid()) {
      this.filterService.addFilter(this.selectedFilter)
    }
  }

  getRemainingFilters(): IFilter[] {
    if (this.remainingFilters.indexOf(this.selectedFilter) > -1) {
      return this.remainingFilters
    }

    return [this.selectedFilter].concat(this.remainingFilters)
  }
}
