import { Prisma } from '@prisma/client';
import { IGenereicErrorMessage } from '../interfaces/errorMessage';
import ApiError from './ApiError';

export const handleClientError = (
  error: Prisma.PrismaClientKnownRequestError
) => {
  let errorObj: IGenereicErrorMessage[] = [];
  let message = '';
  const statusCode = 400;

  if (error.code === 'P2025') {
    message = (error.meta?.cause as string) || 'Record not found!';
    errorObj = [
      {
        path: '',
        message,
      },
    ];
  } else if (error.code === 'P2003') {
    if (error.message.includes('delete()` invocation:')) {
      message = 'Delete failed';
      errorObj = [
        {
          path: '',
          message,
        },
      ];
    }
  } else if (error.code === 'P2002') {
    message = `${error?.meta?.target as string} must be a unique value`;
    errorObj = [
      {
        path: '',
        message,
      },
    ];
  }

  return new ApiError(message, statusCode, errorObj);
};
