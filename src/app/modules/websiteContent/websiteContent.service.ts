import { WebsiteContent } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (data: WebsiteContent): Promise<WebsiteContent> => {
  const result = await prisma.websiteContent.create({
    data,
  });
  return result;
};

const getAllFromDB = async (): Promise<WebsiteContent[]> => {
  const result = await prisma.websiteContent.findMany();

  return result;
};

const getDataById = async (id: string): Promise<WebsiteContent | null> => {
  const result = await prisma.websiteContent.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateDataById = async (
  id: string,
  payload: Partial<WebsiteContent>
): Promise<WebsiteContent> => {
  const result = await prisma.websiteContent.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteDataById = async (id: string): Promise<WebsiteContent> => {
  const result = await prisma.websiteContent.delete({
    where: {
      id,
    },
  });

  return result;
};

export const WebsiteContentServices = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateDataById,
  deleteDataById,
};
