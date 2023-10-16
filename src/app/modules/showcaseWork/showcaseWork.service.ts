import { ShowcaseWork } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (data: ShowcaseWork): Promise<ShowcaseWork> => {
  const result = await prisma.showcaseWork.create({
    data,
  });
  return result;
};

const getAllFromDB = async (): Promise<ShowcaseWork[]> => {
  const result = await prisma.showcaseWork.findMany({
    include: {
      service: true,
    },
  });

  return result;
};

const getDataById = async (id: string): Promise<ShowcaseWork | null> => {
  const result = await prisma.showcaseWork.findUnique({
    include: {
      service: true,
    },
    where: {
      id,
    },
  });
  return result;
};

const updateDataById = async (
  id: string,
  payload: Partial<ShowcaseWork>
): Promise<ShowcaseWork> => {
  const result = await prisma.showcaseWork.update({
    include: {
      service: true,
    },
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteDataById = async (id: string): Promise<ShowcaseWork> => {
  const result = await prisma.showcaseWork.delete({
    include: {
      service: true,
    },
    where: {
      id,
    },
  });

  return result;
};

export const ShowcaseWorkServices = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateDataById,
  deleteDataById,
};
