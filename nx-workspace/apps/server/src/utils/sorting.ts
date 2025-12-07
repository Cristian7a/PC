import { ISort } from '../interfaces/sort-interface';
import { ParsedQs } from 'qs';

/**
 * Extract {@link sortBy} and {@link sortDirection} from reqParams to cast them. If no sortDirection is provided default value is 'desc'.
 * sortBy value cannot have a default value, handle it by your own.
 * @param reqParams
 */
export const castSortParams = <T>(reqParams: ParsedQs): ISort<T> => {
  const { sortBy, sortDirection } = reqParams;
  const { sortBy: sortByValue, sortDirection: sortDirectionValue = 'desc' } = {
    sortBy,
    sortDirection,
  } as ISort<T>;
  return { sortBy: sortByValue, sortDirection: sortDirectionValue };
};
