import { Feedback } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (data: Feedback): Promise<Feedback> => {
  const result = await prisma.feedback.create({
    data,
  });
  return result;
};

const getAllFromDB = async (): Promise<Feedback[]> => {
  const result = await prisma.feedback.findMany();

  return result;
};

const getDataById = async (id: string): Promise<Feedback | null> => {
  const result = await prisma.feedback.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateDataById = async (
  id: string,
  payload: Partial<Feedback>
): Promise<Feedback> => {
  const result = await prisma.feedback.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteDataById = async (id: string): Promise<Feedback> => {
  const result = await prisma.feedback.delete({
    where: {
      id,
    },
  });

  return result;
};

export const FeedbackServices = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateDataById,
  deleteDataById,
};
