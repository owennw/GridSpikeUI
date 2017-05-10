import { IFilter, Filter, IFilterObject } from './filter'

const customerFilterObjects: IFilterObject[] = [
  { id: 1, key: 'first_name', name: 'Forename(s)' },
  { id: 2, key: 'last_name', name: 'Surname' },
  { id: 3, key: 'city', name: 'City' },
  { id: 4, key: 'email_address', name: 'E-mail' },
]

export const customerFilters: IFilter[] = customerFilterObjects.map(cfo => new Filter(cfo))
