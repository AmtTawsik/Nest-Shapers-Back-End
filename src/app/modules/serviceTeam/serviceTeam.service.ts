import { Prisma, ServiceTeam } from '@prisma/client';
import { calculatePagination } from '../../../helpers/paginationHelper';
import { IGenericPaginationResponse } from '../../../interfaces/genericPaginationResponse';
import { IpaginationOptions } from '../../../interfaces/paginationOptions';
import { findFilterConditionsWithoutRelation } from '../../../shared/findFilterConditions';
import { orderByConditions } from '../../../shared/orderCondition';
import prisma from '../../../shared/prisma';
import { serviceTeamSearchableFields } from './serviceTeam.constant';
import { IServiceTeamFilters } from './serviceTeam.interface';

const insertIntoDB = async (data: ServiceTeam): Promise<ServiceTeam> => {
  const result = await prisma.serviceTeam.create({
    data,
  });
  return result;
};

const getAllFromDB = async (
  filters: IServiceTeamFilters,
  options: IpaginationOptions
): Promise<IGenericPaginationResponse<ServiceTeam[]>> => {
  const { page, limit, skip } = calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = findFilterConditionsWithoutRelation(
    searchTerm,
    filterData,
    serviceTeamSearchableFields
  );

  const whereConditons: Prisma.ServiceTeamWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const orderCondition = orderByConditions(options);

  const result = await prisma.serviceTeam.findMany({
    where: whereConditons,
    skip,
    take: limit,
    orderBy: orderCondition,
    include: {
      teamMembers: {
        include: {
          user: true,
          serviceTeam: true,
          specialization: true,
        },
      },
      serviceSchedule: {},
      teamNotifications: {},
    },
  });

  const total = await prisma.serviceTeam.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getDataById = async (id: string): Promise<ServiceTeam | null> => {
  const result = await prisma.serviceTeam.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateDataById = async (
  id: string,
  payload: Partial<ServiceTeam>
): Promise<ServiceTeam> => {
  const result = await prisma.serviceTeam.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteDataById = async (id: string): Promise<ServiceTeam> => {
  const result = await prisma.serviceTeam.delete({
    where: {
      id,
    },
  });

  return result;
};

export const ServiceTeamServices = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateDataById,
  deleteDataById,
};
