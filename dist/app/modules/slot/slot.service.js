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
exports.SlotsServices = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const findFilterConditions_1 = require("../../../shared/findFilterConditions");
const orderCondition_1 = require("../../../shared/orderCondition");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const slot_constant_1 = require("./slot.constant");
const insertIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.slot.findFirst({
        where: {
            startTime: data.startTime,
            serviceTeamId: data.serviceTeamId,
        },
    });
    if (isExist) {
        throw new ApiError_1.default('This team is alreday assign to another task', http_status_1.default.NOT_FOUND);
    }
    const result = yield prisma_1.default.slot.create({
        data,
        include: {
            serviceTeam: true,
            availableService: true,
        },
    });
    return result;
});
const getAllFromDB = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = (0, paginationHelper_1.calculatePagination)(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = (0, findFilterConditions_1.findFilterConditions)(searchTerm, filterData, slot_constant_1.SlotSearchableFields, slot_constant_1.SlotRelationalFields, slot_constant_1.SlotRelationalFieldsMapper);
    const whereConditons = andConditions.length > 0 ? { AND: andConditions } : {};
    const orderCondition = (0, orderCondition_1.orderByConditions)(options);
    const result = yield prisma_1.default.slot.findMany({
        include: {
            serviceTeam: true,
            availableService: true,
        },
        where: whereConditons,
        skip,
        take: limit,
        orderBy: orderCondition,
    });
    const total = yield prisma_1.default.slot.count();
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
    const result = yield prisma_1.default.slot.findUnique({
        where: {
            id,
        },
        include: {
            serviceTeam: true,
            availableService: true,
        },
    });
    return result;
});
const updateDataById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.slot.update({
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
});
const deleteDataById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.slot.delete({
        where: {
            id,
        },
        include: {
            serviceTeam: true,
            availableService: true,
        },
    });
    return result;
});
exports.SlotsServices = {
    insertIntoDB,
    getAllFromDB,
    getDataById,
    updateDataById,
    deleteDataById,
};
