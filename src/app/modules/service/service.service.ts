import { Prisma, Service } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { calculatePagination } from '../../../helpers/paginationHelper';

import { IGenericPaginationResponse } from '../../../interfaces/genericPaginationResponse';
import { IpaginationOptions } from '../../../interfaces/paginationOptions';
import { findFilterConditions } from '../../../shared/findFilterConditions';
import { orderByConditions } from '../../../shared/orderCondition';
import prisma from '../../../shared/prisma';

import {
  sercviceRelationalFields,
  serviceRelationalFieldsMapper,
  serviceSearchableFields,
} from './service.constant';
import { IServiceFilters } from './service.interface';

const insertIntoDB = async (data: Service): Promise<Service> => {
  const result = await prisma.service.create({
    data,
    include: {
      serviceCategory: true,
      availableServices: {},
      upcomingServices: {},
    },
  });
  return result;
};

const getAllFromDB = async (
  filters: IServiceFilters,
  options: IpaginationOptions
): Promise<IGenericPaginationResponse<Service[]>> => {
  const { page, limit, skip } = calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = findFilterConditions(
    searchTerm,
    filterData,
    serviceSearchableFields,
    sercviceRelationalFields,
    serviceRelationalFieldsMapper
  );

  const whereConditons: Prisma.ServiceWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const orderCondition = orderByConditions(options);

  const result = await prisma.service.findMany({
    include: {
      serviceCategory: true,
      availableServices: {},
      upcomingServices: {},
    },
    where: whereConditons,
    skip,
    take: limit,
    orderBy: orderCondition,
  });

  const total = await prisma.service.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getDataById = async (id: string): Promise<Service | null> => {
  const result = await prisma.service.findUnique({
    where: {
      id,
    },
    include: {
      serviceCategory: true,
      availableServices: {},
      upcomingServices: {},
    },
  });
  return result;
};

const updateDataById = async (
  id: string,
  payload: Partial<Service>
): Promise<Service> => {
  const result = await prisma.service.update({
    where: {
      id,
    },
    data: payload,
    include: {
      serviceCategory: true,
      availableServices: {},
      upcomingServices: {},
    },
  });

  return result;
};

const deleteDataById = async (id: string): Promise<Service> => {
  const result = await prisma.service.delete({
    where: {
      id,
    },
    include: {
      serviceCategory: true,
    },
  });

  return result;
};

const getDataByCategory = async (categoryId: string): Promise<Service[]> => {
  const Services = await prisma.service.findMany({
    include: {
      serviceCategory: true,
      availableServices: {},
      upcomingServices: {},
    },
    where: {
      serviceCategory: {
        id: categoryId,
      },
    },
  });

  if (!Services || Services.length === 0) {
    throw new ApiError(
      'No Services found for the specified category',
      httpStatus.NOT_FOUND
    );
  }

  return Services;
};

export const ServiceServices = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateDataById,
  deleteDataById,
  getDataByCategory,
};
