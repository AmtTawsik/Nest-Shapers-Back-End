import { FeatuedIn, Prisma } from '@prisma/client';
import { calculatePagination } from '../../../helpers/paginationHelper';
import { IGenericPaginationResponse } from '../../../interfaces/genericPaginationResponse';
import { IpaginationOptions } from '../../../interfaces/paginationOptions';
import { findFilterConditionsWithoutRelation } from '../../../shared/findFilterConditions';
import { orderByConditions } from '../../../shared/orderCondition';
import prisma from '../../../shared/prisma';
import {
  IFeaturedInFilters,
  featuredInSearchableFields,
} from './featuedIn.constant';

const insertIntoDB = async (data: FeatuedIn): Promise<FeatuedIn> => {
  const result = await prisma.featuedIn.create({
    data,
  });
  return result;
};

const getAllFromDB = async (
  filters: IFeaturedInFilters,
  options: IpaginationOptions
): Promise<IGenericPaginationResponse<FeatuedIn[]>> => {
  const { page, limit, skip } = calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = findFilterConditionsWithoutRelation(
    searchTerm,
    filterData,
    featuredInSearchableFields
  );

  const whereConditons: Prisma.FeatuedInWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const orderCondition = orderByConditions(options);

  const result = await prisma.featuedIn.findMany({
    where: whereConditons,
    skip,
    take: limit,
    orderBy: orderCondition,
  });

  const total = await prisma.featuedIn.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getDataById = async (id: string): Promise<FeatuedIn | null> => {
  const result = await prisma.featuedIn.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateDataById = async (
  id: string,
  payload: Partial<FeatuedIn>
): Promise<FeatuedIn> => {
  const result = await prisma.featuedIn.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteDataById = async (id: string): Promise<FeatuedIn> => {
  const result = await prisma.featuedIn.delete({
    where: {
      id,
    },
  });

  return result;
};

export const FeaturedInServices = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateDataById,
  deleteDataById,
};
