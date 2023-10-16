import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import config from '../../../config';
import { paginationFields } from '../../../constants/paginationFields';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { BookingServices } from './booking.service';

export const bookService: RequestHandler = catchAsync(async (req, res) => {
  const data = req.body;
  const token = req.headers.authorization;

  const verifiedUser = jwtHelpers.verifyToken(
    token as string,
    config.jwt.secret as string
  );
  const result = await BookingServices.bookService(verifiedUser, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Booking created successfully',
    data: result,
  });
});

export const cancelBooking: RequestHandler = catchAsync(async (req, res) => {
  const { bookingId, paymentId } = req.params;
  const result = await BookingServices.cancelBooking(bookingId, paymentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Booking canceled successfully',
    data: result,
  });
});

export const finishBooking: RequestHandler = catchAsync(async (req, res) => {
  const { bookingId, paymentId } = req.params;
  const result = await BookingServices.completeBooking(bookingId, paymentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Booking completed successfully',
    data: result,
  });
});

export const getAllBooking: RequestHandler = catchAsync(
  async (req, res, next) => {
    const token = req.headers.authorization;

    const verifiedUser = jwtHelpers.verifyToken(
      token as string,
      config.jwt.secret as string
    );

    const paginationOptions = pick(req.query, paginationFields);

    const result = await BookingServices.getAllBooking(
      paginationOptions,
      verifiedUser
    );

    if (result.data.length === 0) {
      return next(new ApiError('No Booking found!', httpStatus.NOT_FOUND));
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      status: 'success',
      message: 'Booking retrived successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

export const getSingleBooking: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingServices.getSingleBooking(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Single booking rerived successfully',
    data: result,
  });
});

export const updateBooking: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { ...data } = req.body;
  const appointment = await BookingServices.updateBooking(id, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Booking updated successfully',
    data: appointment,
  });
});

export const deleteBooking: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingServices.deleteBooking(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Booking deleted successfully',
    data: result,
  });
});

export const BookingController = {
  bookService,
  cancelBooking,
  finishBooking,
  getAllBooking,
  getSingleBooking,
  updateBooking,
  deleteBooking,
};
