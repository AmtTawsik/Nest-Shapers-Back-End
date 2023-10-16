/* eslint-disable @typescript-eslint/no-explicit-any */

import { IOptions } from '../helpers/paginationHelper';

export const orderByConditions = (options: IOptions = {}): any => {
  if (options.sortBy && options.sortOrder) {
    return {
      [options.sortBy]: options.sortOrder,
    };
  }
  return {
    createdAt: 'desc',
  };
};
