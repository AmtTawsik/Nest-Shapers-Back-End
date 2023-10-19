"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceController = exports.getAllFromDB = exports.insertIntoDB = void 0;
const http_status_1 = __importDefault(require("http-status"));
const paginationFields_1 = require("../../../constants/paginationFields");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const service_constant_1 = require("./service.constant");
const service_service_1 = require("./service.service");
exports.insertIntoDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield service_service_1.ServiceServices.insertIntoDB(data);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        status: 'success',
        message: 'Service created successfully',
        data: result,
    });
}));
exports.getAllFromDB = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, service_constant_1.serviceFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, paginationFields_1.paginationFields);
    const result = yield service_service_1.ServiceServices.getAllFromDB(filters, paginationOptions);
    if (result.data.length === 0) {
        return next(new ApiError_1.default('No Service found!', http_status_1.default.NOT_FOUND));
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        status: 'success',
        message: 'Service retrived successfully',
        meta: result.meta,
        data: result.data,
    });
}));
const getDataById = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_service_1.ServiceServices.getDataById(req.params.id);
    if (!result) {
        return next(new ApiError_1.default(`No Service found with this id`, http_status_1.default.NOT_FOUND));
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        status: 'success',
        message: 'Service retrived successfully',
        data: result,
    });
}));
const updateDataById = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield service_service_1.ServiceServices.updateDataById(req.params.id, payload);
    if (!result) {
        return next(new ApiError_1.default(`No Service found with this id`, http_status_1.default.NOT_FOUND));
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        status: 'success',
        message: 'Service updated successfully',
        data: result,
    });
}));
const deleteDataById = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_service_1.ServiceServices.deleteDataById(req.params.id);
    if (!result) {
        return next(new ApiError_1.default(`No Service found with this id`, http_status_1.default.NOT_FOUND));
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        status: 'success',
        message: 'Service deleted successfully',
        data: result,
    });
}));
const getServiceByCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_service_1.ServiceServices.getDataByCategory(req.params.categoryId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        status: 'success',
        message: 'Service retrived successfully',
        data: result,
    });
}));
exports.ServiceController = {
    insertIntoDB: exports.insertIntoDB,
    getAllFromDB: exports.getAllFromDB,
    getDataById,
    updateDataById,
    deleteDataById,
    getServiceByCategory,
};
