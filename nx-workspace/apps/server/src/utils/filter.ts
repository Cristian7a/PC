import { FilterOperation, LogicalOperator } from '../types/filter-type';
import { IFilter } from '../interfaces/filter-interface';
import { ParsedQs } from 'qs';
import { createErrorParamField, isParamValueAllowed } from './request';
import { Response } from 'express';
import { PartialRecord } from '../types/partial-record';
import { validate } from 'uuid';

export const castFilterQueryParam = (reqParams: ParsedQs) => {
  return reqParams['filters'] as string;
};

export const parseStringToFilterParam = <T>(filters: string) => {
  return JSON.parse(filters) as IFilter<T>[];
};

export const translateFilterOperationToSQL = (filterOperation: FilterOperation) => {
  switch (filterOperation) {
    case 'starts_with':
    case 'contains':
    case 'ends_with':
      return 'LIKE';
    case 'not_contains':
      return 'NOT LIKE';
    case 'equals':
      return '=';
    case 'not_equals':
      return '!=';
    default:
      return '';
  }
};

export const getFilterValuePattern = (filterOperation: FilterOperation, value: string | number) => {
  switch (filterOperation) {
    case 'starts_with':
      return `${value}%`;
    case 'contains':
    case 'not_contains':
      return `%${value}%`;
    case 'ends_with':
      return `%${value}`;
    case 'equals':
    case 'not_equals':
      return value;
    default:
      return '';
  }
};

export const buildFilterClauseFromFilters = <T extends string>(
  filters: IFilter<T>[],
  logicalOperator: LogicalOperator = 'AND',
  filtersMap: PartialRecord<T, string> = {},
) => {
  let filterClause = '';
  if (filters?.length) {
    const filterClauses = filters.map((filter) => {
      // Use Map
      const filterField = filtersMap[filter.field] || filter.field;
      const operator = translateFilterOperationToSQL(filter.operation);
      const valuePattern = getFilterValuePattern(filter.operation, filter.value);
      return isNaN(+filter.value) && !validate(filter.value)
        ? // With this we are able to perform no case-sensitive queries for strings
          `(LOWER(${filterField}) ${operator} LOWER('${valuePattern}'))`
        : // With this we are able to perform raw queries
          `(${filterField} ${operator} '${valuePattern}')`;
    });

    filterClause = `${filterClauses.join(` ${logicalOperator} `)}`;
  }
  return filterClause;
};

export const getWhereClauseFromFilters = <T extends string>(
  filters: IFilter<T>[],
  logicalOperator: LogicalOperator = 'AND',
  filtersMap: PartialRecord<T, string> = {},
) => {
  let whereClause = '';
  if (filters?.length) {
    whereClause = `WHERE ${buildFilterClauseFromFilters(filters, logicalOperator, filtersMap)}`;
  }
  return whereClause;
};

export const handleFilterValidation = <T>(
  filters: string,
  res: Response,
  allowedFilterFields: T[],
) => {
  let parsedFilters: IFilter<T>[] = [];
  try {
    parsedFilters = parseStringToFilterParam<T>(filters);
    if (!Array.isArray(parsedFilters)) {
      res.status(400).json({ message: 'Filters must be an array' });
      return;
    }

    for (const filter of parsedFilters) {
      if (!isParamValueAllowed<T>(allowedFilterFields, filter.field)) {
        res.status(400).json(createErrorParamField<T>('Invalid filter field', allowedFilterFields));
        return;
      }
    }
    return parsedFilters;
  } catch (error) {
    res.status(400).json({ message: 'Invalid filters format', error });
    return;
  }
};
