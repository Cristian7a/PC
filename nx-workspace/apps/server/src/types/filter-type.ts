export type FilterOperation =
  | 'starts_with'
  | 'contains'
  | 'not_contains'
  | 'ends_with'
  | 'equals'
  | 'not_equals';

export type LogicalOperator = 'AND' | 'OR';
