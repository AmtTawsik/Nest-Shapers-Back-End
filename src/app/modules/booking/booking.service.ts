/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Booking,
  BookingStatus,
  Payment,
  PaymentMethod,
  PaymentStatus,
  Prisma,
  UserRole,
} from '@prisma/client';

import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import { calculatePagination } from '../../../helpers/paginationHelper';
import { IGenericPaginationResponse } from '../../../interfaces/genericPaginationResponse';
import { IpaginationOptions } from '../../../interfaces/paginationOptions';
import { orderByConditions } from '../../../shared/orderCondition';
import prisma from '../../../shared/prisma';
import { getWeekdayFromDate } from '../../../shared/utils';

type Data = Partial<Booking & Payment>;

const bookService = async (
  verifiedUser: JwtPayload,
  data: Data
): Promise<any> => {
  //checking if the available service exist
  const availableService = await prisma.availableService.findUnique({
    where: {
      id: data.serviceId,
    },
  });
  if (!availableService) {
    throw new ApiError('This service is not available', httpStatus.NOT_FOUND);
  }

  const findSlot = await prisma.slot.findUnique({
    where: {
      id: data.slotId,
    },
  });

  const booking = await prisma.$transaction(async transactionClient => {
    const book = await transactionClient.booking.create({
      data: {
        userId: verifiedUser.userId,
        date: data.date as string,
        weekDay: getWeekdayFromDate(data.date as string),
        time: findSlot?.startTime,
        serviceId: availableService.id,
        slotId: findSlot?.id as string,
        status: BookingStatus.pending,
      },
      include: {
        payment: true,
      },
    });

    const payment = await transactionClient.payment.create({
      data: {
        paymentStatus: PaymentStatus.notPaid,
        paymentMethod: data.paymentMethod as PaymentMethod,
        bookingId: book.id,
      },
    });

    return {
      booking: book,
      payment: payment,
    };
  });

  return booking;
};

const cancelBooking = async (
  bookingId: string,
  paymentId: string
): Promise<any> => {
  //checking if the available service exist
  const bookings = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
  });
  if (!bookings) {
    throw new ApiError('There is no booking', httpStatus.NOT_FOUND);
  }

  if (bookings.status === BookingStatus.confirmed) {
    throw new ApiError(
      'This booking already finished, you can not cancel now',
      httpStatus.NOT_FOUND
    );
  }

  if (bookings.status === BookingStatus.rejected) {
    throw new ApiError('This booking already cancelled', httpStatus.NOT_FOUND);
  }

  const cancelBooking = await prisma.$transaction(async transactionClient => {
    const book = await transactionClient.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        status: BookingStatus.rejected,
      },
    });

    const payment = await transactionClient.payment.update({
      where: {
        id: paymentId,
      },
      data: {
        paymentStatus: PaymentStatus.rejected,
      },
    });

    return {
      booking: book,
      payment: payment,
    };
  });

  return cancelBooking;
};

const completeBooking = async (
  bookingId: string,
  paymentId: string
): Promise<any> => {
  //checking if the available service exist
  const bookings = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
  });
  if (!bookings) {
    throw new ApiError('There is no booking', httpStatus.NOT_FOUND);
  }

  if (bookings.status === BookingStatus.confirmed) {
    throw new ApiError(
      'This booking already finished, you can not cancel now',
      httpStatus.NOT_FOUND
    );
  }

  if (bookings.status === BookingStatus.rejected) {
    throw new ApiError('This booking already cancelled', httpStatus.NOT_FOUND);
  }

  const finishBooking = await prisma.$transaction(async transactionClient => {
    const book = await transactionClient.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        status: BookingStatus.confirmed,
      },
    });

    const payment = await transactionClient.payment.update({
      where: {
        id: paymentId,
      },
      data: {
        paymentStatus: PaymentStatus.paid,
      },
    });

    return {
      booking: book,
      payment: payment,
    };
  });

  return finishBooking;
};

const getAllBooking = async (
  options: IpaginationOptions,
  verifiedUser: JwtPayload
): Promise<IGenericPaginationResponse<Booking[]>> => {
  const { page, limit, skip } = calculatePagination(options);

  const orderCondition = orderByConditions(options);

  let whereCondition: Prisma.BookingWhereInput = {};

  if (verifiedUser.role === UserRole.customer) {
    // If the user is a customer, filter orders by their user ID
    whereCondition = {
      userId: verifiedUser.userId,
    };
  }

  const result = await prisma.booking.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy: orderCondition,
    include: {
      user: true,
      slot: true,
      service: true,
      payment: true,
    },
  });

  const total = await prisma.booking.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSingleBooking = async (id: string): Promise<Booking | null> => {
  const result = await prisma.booking.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
      slot: true,
      service: true,
      payment: true,
    },
  });
  return result;
};

const updateBooking = async (
  id: string,
  payload: Partial<Booking>
): Promise<Booking> => {
  const result = await prisma.booking.update({
    where: {
      id,
    },
    data: payload,
    include: {
      user: true,
      slot: true,
      service: true,
      payment: true,
    },
  });

  return result;
};

const deleteBooking = async (id: string): Promise<Booking> => {
  const result = await prisma.booking.delete({
    where: {
      id,
    },
    include: {
      user: true,
      slot: true,
      service: true,
      payment: true,
    },
  });

  return result;
};

export const BookingServices = {
  bookService,
  cancelBooking,
  completeBooking,
  getSingleBooking,
  updateBooking,
  deleteBooking,
  getAllBooking,
};
