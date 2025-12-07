import { SortDirection } from '../types/sort-type';

export interface ISort<T> {
  sortBy: T;
  sortDirection: SortDirection;
}
