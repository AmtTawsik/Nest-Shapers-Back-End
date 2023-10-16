import { Prisma, ServiceCategory } from '@prisma/client';
import { calculatePagination } from '../../../helpers/paginationHelper';
import { IGenericPaginationResponse } from '../../../interfaces/genericPaginationResponse';
import { IpaginationOptions } from '../../../interfaces/paginationOptions';
import { findFilterConditionsWithoutRelation } from '../../../shared/findFilterConditions';
import { orderByConditions } from '../../../shared/orderCondition';
import prisma from '../../../shared/prisma';
import { serviceCategorySearchableFields } from './serviceCategory.constant';
import { IServiceCategoryFilters } from './serviceCategory.interface';

const insertIntoDB = async (
  data: ServiceCategory
): Promise<ServiceCategory> => {
  const result = await prisma.serviceCategory.create({
    data,
  });
  return result;
};

const getAllFromDB = async (
  filters: IServiceCategoryFilters,
  options: IpaginationOptions
): Promise<IGenericPaginationResponse<ServiceCategory[]>> => {
  const { page, limit, skip } = calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = findFilterConditionsWithoutRelation(
    searchTerm,
    filterData,
    serviceCategorySearchableFields
  );

  const whereConditons: Prisma.ServiceCategoryWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const orderCondition = orderByConditions(options);

  const result = await prisma.serviceCategory.findMany({
    where: whereConditons,
    skip,
    take: limit,
    orderBy: orderCondition,
    include: {
      services: {},
    },
  });

  const total = await prisma.serviceCategory.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getDataById = async (id: string): Promise<ServiceCategory | null> => {
  const result = await prisma.serviceCategory.findUnique({
    where: {
      id,
    },
    include: {
      services: {},
    },
  });
  return result;
};

const updateDataById = async (
  id: string,
  payload: Partial<ServiceCategory>
): Promise<ServiceCategory> => {
  const result = await prisma.serviceCategory.update({
    where: {
      id,
    },
    data: payload,
    include: {
      services: {},
    },
  });

  return result;
};

const deleteDataById = async (id: string): Promise<ServiceCategory> => {
  const result = await prisma.serviceCategory.delete({
    where: {
      id,
    },
  });

  return result;
};

export const ServiceCategoryServices = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateDataById,
  deleteDataById,
};
