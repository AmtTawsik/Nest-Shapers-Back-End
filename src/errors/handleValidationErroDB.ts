import { Prisma } from '@prisma/client';
import ApiError from './ApiError';

export const handleValidationErrorDB = (
  error: Prisma.PrismaClientValidationError
) => {
  const errorsObj = [
    {
      path: '',
      message: error.message || 'Some field are not valid field',
    },
  ];

  return new ApiError('Validation Error', 400, errorsObj);
};
