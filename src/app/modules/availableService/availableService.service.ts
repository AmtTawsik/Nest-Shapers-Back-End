/* eslint-disable @typescript-eslint/ban-ts-comment */
import { AvailableService, BookingStatus, Prisma, Slot } from '@prisma/client';
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
  const { serviceId } = data;

  const service = await prisma.service.findUnique({
    where: {
      id: serviceId,
    },
  });

  const isExist = await prisma.availableService.findFirst({
    where: {
      serviceId: serviceId,
    },
  });

  if (isExist) {
    throw new ApiError(
      'This service already exist in available service list',
      httpStatus.CONFLICT
    );
  }

  data.categoryId = service?.serviceCategoryId as string;
  data.price = service?.price as number;
  data.serviceName = service?.serviceName as string;

  const result = await prisma.availableService.create({
    data,
    include: {
      service: {
        include: {
          serviceCategory: true,
        },
      },
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
      service: {
        include: {
          serviceCategory: true,
        },
      },
      slots: {
        include: {
          serviceTeam: true,
        },
      },
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
      service: {
        include: {
          serviceCategory: true,
        },
      },
      slots: {
        include: {
          serviceTeam: true,
        },
      },
    },
    where: whereConditons,
    skip,
    take: limit,
    orderBy: orderCondition,
  });

  const total = await prisma.availableService.count();

  if (date) {
    const bookings = await prisma.booking.findMany({
      where: {
        date: date,
        status: {
          in: [BookingStatus.pending, BookingStatus.confirmed],
        },
      },
    });

    result.forEach(service => {
      const serviceBooking = bookings.filter(
        book => book.serviceId === service.id
      );

      const bookedSlots = serviceBooking.map(b => b.slotId);
      const available = service.slots.filter(
        slot => !bookedSlots.includes(slot.id)
      );
      service.slots = available;
    });
  }

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
      service: {
        include: {
          serviceCategory: true,
        },
      },
      slots: {
        include: {
          serviceTeam: true,
        },
      },
    },
  });
  return result;
};

const getAvailAbleService = async (id: string, date: string) => {
  const result = await prisma.availableService.findUnique({
    where: {
      id,
    },
    include: {
      service: {
        include: {
          serviceCategory: true,
        },
      },
      slots: {
        include: {
          serviceTeam: true,
        },
      },
    },
  });

  const newService = result;

  if (date) {
    const bookings = await prisma.booking.findMany({
      where: {
        date: date,
        status: {
          in: [BookingStatus.pending, BookingStatus.confirmed],
        },
      },
    });

    const serviceBooking = bookings.filter(
      book => book.serviceId === newService?.id
    );

    const bookedSlots = serviceBooking.map(b => b.slotId);
    const available = newService?.slots.filter(
      slot => !bookedSlots.includes(slot.id)
    );

    if (newService) {
      //@ts-ignore
      newService.slots = available as Slot[];
    }

    return newService;
  }
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
      service: {
        include: {
          serviceCategory: true,
        },
      },
      slots: {
        include: {
          serviceTeam: true,
        },
      },
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
      slots: {
        include: {
          serviceTeam: true,
        },
      },
    },
  });

  return result;
};

const getDataByCategory = async (
  categoryId: string
): Promise<AvailableService[]> => {
  const AvailableServices = await prisma.availableService.findMany({
    include: {
      service: {
        include: {
          serviceCategory: true,
        },
      },
      slots: {
        include: {
          serviceTeam: true,
        },
      },
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
  getAvailAbleService,
};
