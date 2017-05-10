export interface IFilter {
  getQuery: Function
  updateOperator: Function
  updateValue: Function
  hasValue: Function
  isValid: Function
  getName: Function
  getId: Function
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
    this.filter.operator = operator
  }

  updateValue(value: string) {
    this.filter.value = value
  }

  getQuery(): any {
    if (this.filter.value) {
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
    return this.hasValue() && !!this.filter.operator
  }
}
