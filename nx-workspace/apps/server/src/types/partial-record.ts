// Another way to write this PartialRecord type: PartialRecord<K extends keyof any, T> =  Partial<Record<K, T>>
/**
 * Construct a type with a set of optional properties K of type T
 */
export type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T;
};
