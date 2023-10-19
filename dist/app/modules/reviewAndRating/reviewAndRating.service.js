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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewAndRatingServices = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const findFilterConditions_1 = require("../../../shared/findFilterConditions");
const orderCondition_1 = require("../../../shared/orderCondition");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const reviewAndRating_constant_1 = require("./reviewAndRating.constant");
const insertIntoDB = (verifiedUser, data) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield prisma_1.default.booking.findFirst({
        where: {
            userId: verifiedUser.userId,
            serviceId: data.serviceId,
        },
    });
    if (booking && booking.status === 'confirmed') {
        const result = yield prisma_1.default.reviewAndRating.create({
            data,
            include: {
                user: true,
                service: true,
            },
        });
        return result;
    }
    else {
        throw new ApiError_1.default(`You must have a confirmed booking for this service to add a review`, http_status_1.default.NOT_FOUND);
    }
});
const getAllFromDB = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = (0, paginationHelper_1.calculatePagination)(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = (0, findFilterConditions_1.findFilterConditions)(searchTerm, filterData, reviewAndRating_constant_1.ReviewSearchableFields, reviewAndRating_constant_1.ReviewRelationalFields, reviewAndRating_constant_1.ReviewRelationalFieldsMapper);
    const whereConditons = andConditions.length > 0 ? { AND: andConditions } : {};
    const orderCondition = (0, orderCondition_1.orderByConditions)(options);
    const result = yield prisma_1.default.reviewAndRating.findMany({
        include: {
            user: true,
            service: true,
        },
        where: whereConditons,
        skip,
        take: limit,
        orderBy: orderCondition,
    });
    const total = yield prisma_1.default.reviewAndRating.count();
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
const getDataById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.reviewAndRating.findUnique({
        where: {
            id,
        },
        include: {
            user: true,
            service: true,
        },
    });
    return result;
});
const updateDataById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.reviewAndRating.update({
        where: {
            id,
        },
        data: payload,
        include: {
            user: true,
            service: true,
        },
    });
    return result;
});
const deleteDataById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.reviewAndRating.delete({
        where: {
            id,
        },
        include: {
            user: true,
            service: true,
        },
    });
    return result;
});
exports.ReviewAndRatingServices = {
    insertIntoDB,
    getAllFromDB,
    getDataById,
    updateDataById,
    deleteDataById,
};
