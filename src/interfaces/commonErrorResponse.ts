// currentyly this is not being used in any file

import { IGenereicErrorMessage } from './errorMessage';

export type IGenereicErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenereicErrorMessage[];
};
