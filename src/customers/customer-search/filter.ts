export interface IFilter {
  getQuery: Function
  updateOperator: Function
  updateValue: Function
  hasValue: Function
  isValid: Function
  getName: Function
  getId: Function
  reset: Function
}

export interface IFilterObject {
  id: number
  key: string
  name: string
  value?: string
  operator?: string
}

export class Filter implements IFilter {
  private filter: IFilterObject

  constructor(filter: IFilterObject) {
    this.filter = filter
  }

  updateOperator(operator: string) {
    if (operator !== '-') {
      this.filter.operator = operator
    } else {
      this.filter.operator = undefined
    }
  }

  updateValue(value: string) {
    this.filter.value = value
  }

  getQuery(): any {
    if (this.filter.value) {
      if (this.filter.operator) {
        return {
          [this.filter.key]: this.filter.value,
          [`${this.filter.key}_operator`]: this.filter.operator,
        }
      }

      return { [this.filter.key]: this.filter.value }
    }

    return {}
  }

  getName(): string {
    return this.filter.name
  }

  getId(): number {
    return this.filter.id
  }

  hasValue(): boolean {
    return !!this.filter.value
  }

  isValid(): boolean {
    return this.hasValue()
  }

  reset(): void {
    this.filter.value = undefined
    this.filter.operator = undefined
  }
}
