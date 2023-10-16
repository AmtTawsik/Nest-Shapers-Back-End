import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/paginationFields';
import ApiError from '../../../errors/ApiError';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { faqFilterableFields } from './faq.constant';
import { FaqServices } from './faq.service';

export const insertIntoDB: RequestHandler = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await FaqServices.insertIntoDB(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Faq created successfully',
    data: result,
  });
});

export const getAllFromDB: RequestHandler = catchAsync(
  async (req, res, next) => {
    const filters = pick(req.query, faqFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await FaqServices.getAllFromDB(filters, paginationOptions);

    if (result.data.length === 0) {
      return next(new ApiError('No Faq found!', httpStatus.NOT_FOUND));
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      status: 'success',
      message: 'Faq retrived successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getDataById: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await FaqServices.getDataById(req.params.id);

  if (!result) {
    return next(
      new ApiError(`No Faq found with this id`, httpStatus.NOT_FOUND)
    );
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Faq retrived successfully',
    data: result,
  });
});

const updateDataById: RequestHandler = catchAsync(async (req, res, next) => {
  const payload = req.body;

  const result = await FaqServices.updateDataById(req.params.id, payload);

  if (!result) {
    return next(
      new ApiError(`No Faq found with this id`, httpStatus.NOT_FOUND)
    );
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Faq updated successfully',
    data: result,
  });
});

const deleteDataById: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await FaqServices.deleteDataById(req.params.id);

  if (!result) {
    return next(
      new ApiError(`No Faq found with this id`, httpStatus.NOT_FOUND)
    );
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Faq deleted successfully',
    data: result,
  });
});

export const FaqController = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateDataById,
  deleteDataById,
};
