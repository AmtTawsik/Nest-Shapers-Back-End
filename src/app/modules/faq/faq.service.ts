import { Faq, Prisma } from '@prisma/client';
import { calculatePagination } from '../../../helpers/paginationHelper';
import { IGenericPaginationResponse } from '../../../interfaces/genericPaginationResponse';
import { IpaginationOptions } from '../../../interfaces/paginationOptions';
import { findFilterConditionsWithoutRelation } from '../../../shared/findFilterConditions';
import { orderByConditions } from '../../../shared/orderCondition';
import prisma from '../../../shared/prisma';
import { IFaqFilters, faqSearchableFields } from './faq.constant';

const insertIntoDB = async (data: Faq): Promise<Faq> => {
  const result = await prisma.faq.create({
    data,
  });
  return result;
};

const getAllFromDB = async (
  filters: IFaqFilters,
  options: IpaginationOptions
): Promise<IGenericPaginationResponse<Faq[]>> => {
  const { page, limit, skip } = calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = findFilterConditionsWithoutRelation(
    searchTerm,
    filterData,
    faqSearchableFields
  );

  const whereConditons: Prisma.FaqWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const orderCondition = orderByConditions(options);

  const result = await prisma.faq.findMany({
    where: whereConditons,
    skip,
    take: limit,
    orderBy: orderCondition,
  });

  const total = await prisma.faq.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getDataById = async (id: string): Promise<Faq | null> => {
  const result = await prisma.faq.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateDataById = async (
  id: string,
  payload: Partial<Faq>
): Promise<Faq> => {
  const result = await prisma.faq.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteDataById = async (id: string): Promise<Faq> => {
  const result = await prisma.faq.delete({
    where: {
      id,
    },
  });

  return result;
};

export const FaqServices = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateDataById,
  deleteDataById,
};
