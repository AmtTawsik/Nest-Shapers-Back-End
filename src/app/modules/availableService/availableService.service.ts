import { AvailableService, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { calculatePagination } from '../../../helpers/paginationHelper';

import { IGenericPaginationResponse } from '../../../interfaces/genericPaginationResponse';
import { IpaginationOptions } from '../../../interfaces/paginationOptions';
import { findFilterConditionsWithPrice } from '../../../shared/findFilterConditions';
import { orderByConditions } from '../../../shared/orderCondition';
import prisma from '../../../shared/prisma';
import {
  IAvailableServiceFilters,
  availableServiceRelationalFields,
  availableServiceRelationalFieldsMapper,
  availableServiceSearchableFields,
} from './availableService.constant';

const insertIntoDB = async (
  data: AvailableService
): Promise<AvailableService> => {
  const result = await prisma.availableService.create({
    data,
    include: {
      service: true,
      slots: {},
    },
  });
  return result;
};

const getAllFromDB = async (
  filters: IAvailableServiceFilters,
  options: IpaginationOptions
): Promise<IGenericPaginationResponse<AvailableService[]>> => {
  const { page, limit, skip } = calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = findFilterConditionsWithPrice(
    searchTerm,
    filterData,
    availableServiceSearchableFields,
    availableServiceRelationalFields,
    availableServiceRelationalFieldsMapper
  );

  const whereConditons: Prisma.AvailableServiceWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const orderCondition = orderByConditions(options);

  const result = await prisma.availableService.findMany({
    include: {
      service: true,
      slots: {},
    },
    where: whereConditons,
    skip,
    take: limit,
    orderBy: orderCondition,
  });

  const total = await prisma.availableService.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getAllRemainingServices = async (
  date: string,
  filters: IAvailableServiceFilters,
  options: IpaginationOptions
): Promise<IGenericPaginationResponse<AvailableService[]>> => {
  const { page, limit, skip } = calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = findFilterConditionsWithPrice(
    searchTerm,
    filterData,
    availableServiceSearchableFields,
    availableServiceRelationalFields,
    availableServiceRelationalFieldsMapper
  );

  const whereConditons: Prisma.AvailableServiceWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const orderCondition = orderByConditions(options);

  const result = await prisma.availableService.findMany({
    include: {
      service: true,
      slots: {},
    },
    where: whereConditons,
    skip,
    take: limit,
    orderBy: orderCondition,
  });

  const total = await prisma.availableService.count();

  const bookings = await prisma.booking.findMany({
    where: {
      date: date,
    },
  });

  result.forEach(service => {
    const serviceBooking = bookings.filter(
      book => book.serviceId === service.id
    );
    const bookedSlots = serviceBooking.map(b => b.slot);
    const available = service.slots.filter(
      slot => !bookedSlots.includes(slot.id)
    );
    service.slots = available;
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getDataById = async (id: string): Promise<AvailableService | null> => {
  const result = await prisma.availableService.findUnique({
    where: {
      id,
    },
    include: {
      service: true,
      slots: {},
    },
  });
  return result;
};

const updateDataById = async (
  id: string,
  payload: Partial<AvailableService>
): Promise<AvailableService> => {
  const result = await prisma.availableService.update({
    where: {
      id,
    },
    data: payload,
    include: {
      service: true,
      slots: {},
    },
  });

  return result;
};

const deleteDataById = async (id: string): Promise<AvailableService> => {
  const result = await prisma.availableService.delete({
    where: {
      id,
    },
    include: {
      service: true,
      slots: {},
    },
  });

  return result;
};

const getDataByCategory = async (
  categoryId: string
): Promise<AvailableService[]> => {
  const AvailableServices = await prisma.availableService.findMany({
    include: {
      service: true,
    },
    where: {
      categoryId: categoryId,
      slots: {},
    },
  });

  if (!AvailableServices || AvailableServices.length === 0) {
    throw new ApiError(
      'No AvailableServices found for the specified category',
      httpStatus.NOT_FOUND
    );
  }

  return AvailableServices;
};

export const AvailableServiceServices = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateDataById,
  deleteDataById,
  getDataByCategory,
  getAllRemainingServices,
};
