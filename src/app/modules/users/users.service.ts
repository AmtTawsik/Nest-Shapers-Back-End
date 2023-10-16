import { Users } from '@prisma/client';
import prisma from '../../../shared/prisma';

const getAllFromDB = async (): Promise<Users[]> => {
  const result = await prisma.users.findMany();

  return result;
};

export const UsersServices = {
  getAllFromDB,
};
