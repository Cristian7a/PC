import { PartialRecord } from '../types/partial-record';

export const transformRequestFieldToDBField = <T extends string>(
  field: T,
  fieldMap: PartialRecord<T, string>,
) => {
  return fieldMap[field] || field;
};
