import { Prisma, Slot } from '@prisma/client';

import { calculatePagination } from '../../../helpers/paginationHelper';

import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IGenericPaginationResponse } from '../../../interfaces/genericPaginationResponse';
import { IpaginationOptions } from '../../../interfaces/paginationOptions';
import { findFilterConditions } from '../../../shared/findFilterConditions';
import { orderByConditions } from '../../../shared/orderCondition';
import prisma from '../../../shared/prisma';
import {
  ISlotFilters,
  SlotRelationalFields,
  SlotRelationalFieldsMapper,
  SlotSearchableFields,
} from './slot.constant';

const insertIntoDB = async (data: Slot): Promise<Slot> => {
  const isExist = await prisma.slot.findFirst({
    where: {
      startTime: data.startTime,
      serviceTeamId: data.serviceTeamId,
    },
  });

  if (isExist) {
    throw new ApiError(
      'This team is alreday assign to another task',
      httpStatus.NOT_FOUND
    );
  }

  const result = await prisma.slot.create({
    data,
    include: {
      serviceTeam: true,
      availableService: true,
    },
  });
  return result;
};

const getAllFromDB = async (
  filters: ISlotFilters,
  options: IpaginationOptions
): Promise<IGenericPaginationResponse<Slot[]>> => {
  const { page, limit, skip } = calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = findFilterConditions(
    searchTerm,
    filterData,
    SlotSearchableFields,
    SlotRelationalFields,
    SlotRelationalFieldsMapper
  );

  const whereConditons: Prisma.SlotWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const orderCondition = orderByConditions(options);

  const result = await prisma.slot.findMany({
    include: {
      serviceTeam: true,
      availableService: true,
    },
    where: whereConditons,
    skip,
    take: limit,
    orderBy: orderCondition,
  });

  const total = await prisma.slot.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getDataById = async (id: string): Promise<Slot | null> => {
  const result = await prisma.slot.findUnique({
    where: {
      id,
    },
    include: {
      serviceTeam: true,
      availableService: true,
    },
  });
  return result;
};

const updateDataById = async (
  id: string,
  payload: Partial<Slot>
): Promise<Slot> => {
  const result = await prisma.slot.update({
    where: {
      id,
    },
    data: payload,
    include: {
      serviceTeam: true,
      availableService: true,
    },
  });

  return result;
};

const deleteDataById = async (id: string): Promise<Slot> => {
  const result = await prisma.slot.delete({
    where: {
      id,
    },
    include: {
      serviceTeam: true,
      availableService: true,
    },
  });

  return result;
};

export const SlotsServices = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateDataById,
  deleteDataById,
};
