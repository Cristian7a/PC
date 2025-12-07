import { ParsedQs } from 'qs';
import { AppSettings } from '../settings';
import { z } from 'zod';

const paginationSchema = z.object({
  page: z.preprocess(Number, z.number().min(1).default(AppSettings.DEFAULT_PAGE)),
  pageSize: z.preprocess(Number, z.number().min(1).default(AppSettings.DEFAULT_PAGE_SIZE)),
});

export const validatePaginationValuesOrUseDefault = (reqParams: ParsedQs) => {
  const parsed = paginationSchema.parse({
    page: reqParams['page'],
    pageSize: reqParams['pageSize'],
  });
  return { page: parsed.page, pageSize: parsed.pageSize };
};

const scrollerPaginationSchema = z
  .object({
    first: z.preprocess(Number, z.number().min(0).default(0)),
    last: z.preprocess(Number, z.number().min(0).default(1)),
  })
  .transform((data) => {
    return {
      first: data.first,
      last: data.last < data.first ? data.first + 1 : data.last,
    };
  });

export const validateScrollerPaginationValuesOrUseDefault = (reqParams: ParsedQs) => {
  const parsed = scrollerPaginationSchema.parse({
    first: reqParams['first'],
    last: reqParams['last'],
  });
  return { first: parsed.first, last: parsed.last };
};
