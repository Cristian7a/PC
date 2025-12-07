import { FilterOperation } from '../types/filter-type';

export interface IFilter<T> {
  field: T;
  operation: FilterOperation;
  value: string | number;
}
