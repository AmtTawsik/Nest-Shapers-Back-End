import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/paginationFields';
import ApiError from '../../../errors/ApiError';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { specializationFilterableFields } from './specialization.constant';
import { SpecializationServices } from './specialization.service';

export const insertIntoDB: RequestHandler = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await SpecializationServices.insertIntoDB(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Specialization created successfully',
    data: result,
  });
});

export const getAllFromDB: RequestHandler = catchAsync(
  async (req, res, next) => {
    const filters = pick(req.query, specializationFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await SpecializationServices.getAllFromDB(
      filters,
      paginationOptions
    );

    if (result.data.length === 0) {
      return next(
        new ApiError('No Specialization found!', httpStatus.NOT_FOUND)
      );
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      status: 'success',
      message: 'Specialization retrived successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getDataById: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await SpecializationServices.getDataById(req.params.id);

  if (!result) {
    return next(
      new ApiError(`No Specialization found with this id`, httpStatus.NOT_FOUND)
    );
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Specialization retrived successfully',
    data: result,
  });
});

const updateDataById: RequestHandler = catchAsync(async (req, res, next) => {
  const payload = req.body;

  const result = await SpecializationServices.updateDataById(
    req.params.id,
    payload
  );

  if (!result) {
    return next(
      new ApiError(`No Specialization found with this id`, httpStatus.NOT_FOUND)
    );
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Specialization updated successfully',
    data: result,
  });
});

const deleteDataById: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await SpecializationServices.deleteDataById(req.params.id);

  if (!result) {
    return next(
      new ApiError(`No Specialization found with this id`, httpStatus.NOT_FOUND)
    );
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Specialization deleted successfully',
    data: result,
  });
});

export const SpecializationController = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
  updateDataById,
  deleteDataById,
};
