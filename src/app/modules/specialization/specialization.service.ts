import { Prisma, Specialization } from '@prisma/client';
import { calculatePagination } from '../../../helpers/paginationHelper';
import { IGenericPaginationResponse } from '../../../interfaces/genericPaginationResponse';
import { IpaginationOptions } from '../../../interfaces/paginationOptions';
import { findFilterConditionsWithoutRelation } from '../../../shared/findFilterConditions';
import { orderByConditions } from '../../../shared/orderCondition';
import prisma from '../../../shared/prisma';
import { specializationSearchableFields } from './specialization.constant';
import { IspecializationFilters } from './specialization.interface';

const insertIntoDB = async (data: Specialization): Promise<Specialization> => {
  const result = await prisma.specialization.create({
    data,
  });
  return result;
};

const getAllFromDB = async (
  filters: IspecializationFilters,
  options: IpaginationOptions
): Promise<IGenericPaginationResponse<Specialization[]>> => {
  const { page, limit, skip } = calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = findFilterConditionsWithoutRelation(
    searchTerm,
    filterData,
    specializationSearchableFields
  );

  const whereConditons: Prisma.SpecializationWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const orderCondition = orderByConditions(options);

  const result = await prisma.specialization.findMany({
    where: whereConditons,
    skip,
    take: limit,
    orderBy: orderCondition,
    include: {
      teamMembers: {},
    },
  });

  const total = await prisma.specialization.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getDataById = async (id: string): Promise<Specialization | null> => {
  const result = await prisma.specialization.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateDataById = async (
  id: string,
  payload: Partial<Specialization>
): Promise<Specialization> => {
  const result = await prisma.specialization.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteDataById = async (id: string): Promise<Specialization> => {
  const result = await prisma.specialization.delete({
    where: {
      id,
    },
  });

  return result;
};

export const SpecializationServices = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateDataById,
  deleteDataById,
};
