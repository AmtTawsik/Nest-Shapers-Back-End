import { Prisma, UpcomingService } from '@prisma/client';
import { calculatePagination } from '../../../helpers/paginationHelper';

import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IGenericPaginationResponse } from '../../../interfaces/genericPaginationResponse';
import { IpaginationOptions } from '../../../interfaces/paginationOptions';
import { findFilterConditions } from '../../../shared/findFilterConditions';
import { orderByConditions } from '../../../shared/orderCondition';
import prisma from '../../../shared/prisma';
import {
  IUpcomingServiceFilters,
  upcomingSercviceRelationalFields,
  upcomingServiceRelationalFieldsMapper,
  upcomingServiceSearchableFields,
} from './upcomingService.constant';

const insertIntoDB = async (
  data: UpcomingService
): Promise<UpcomingService> => {
  const isExist = await prisma.upcomingService.findFirst({
    where: {
      serviceId: data.serviceId,
    },
  });

  if (isExist) {
    throw new ApiError(
      'This service already exist in upcoming service list',
      httpStatus.CONFLICT
    );
  }

  const result = await prisma.upcomingService.create({
    data,
    include: {
      service: {
        include: {
          serviceCategory: true
        }
      },
    },
  });
  return result;
};

const getAllFromDB = async (
  filters: IUpcomingServiceFilters,
  options: IpaginationOptions
): Promise<IGenericPaginationResponse<UpcomingService[]>> => {
  const { page, limit, skip } = calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = findFilterConditions(
    searchTerm,
    filterData,
    upcomingServiceSearchableFields,
    upcomingSercviceRelationalFields,
    upcomingServiceRelationalFieldsMapper
  );

  const whereConditons: Prisma.UpcomingServiceWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const orderCondition = orderByConditions(options);

  const result = await prisma.upcomingService.findMany({
    include: {
      service: {
        include: {
          serviceCategory: true
        }
      },
    },
    where: whereConditons,
    skip,
    take: limit,
    orderBy: orderCondition,
  });

  const total = await prisma.upcomingService.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getDataById = async (id: string): Promise<UpcomingService | null> => {
  const result = await prisma.upcomingService.findUnique({
    where: {
      id,
    },
    include: {
      service: {
        include: {
          serviceCategory: true
        }
      },
    },
  });
  return result;
};

const updateDataById = async (
  id: string,
  payload: Partial<UpcomingService>
): Promise<UpcomingService> => {
  const result = await prisma.upcomingService.update({
    where: {
      id,
    },
    data: payload,
    include: {
      service: {
        include: {
          serviceCategory: true
        }
      },
    },
  });

  return result;
};

const deleteDataById = async (id: string): Promise<UpcomingService> => {
  const result = await prisma.upcomingService.delete({
    where: {
      id,
    },
    include: {
      service: {
        include: {
          serviceCategory: true
        }
      },
    },
  });

  return result;
};

export const UpcomingServiceServices = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateDataById,
  deleteDataById,
};
