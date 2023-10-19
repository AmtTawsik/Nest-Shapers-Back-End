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
exports.AvailableServiceServices = void 0;
/* eslint-disable @typescript-eslint/ban-ts-comment */
const client_1 = require("@prisma/client");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const findFilterConditions_1 = require("../../../shared/findFilterConditions");
const orderCondition_1 = require("../../../shared/orderCondition");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const availableService_constant_1 = require("./availableService.constant");
const insertIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { serviceId } = data;
    const service = yield prisma_1.default.service.findUnique({
        where: {
            id: serviceId,
        },
    });
    const isExist = yield prisma_1.default.availableService.findFirst({
        where: {
            serviceId: serviceId,
        },
    });
    if (isExist) {
        throw new ApiError_1.default('This service already exist in available service list', http_status_1.default.CONFLICT);
    }
    data.categoryId = service === null || service === void 0 ? void 0 : service.serviceCategoryId;
    data.price = service === null || service === void 0 ? void 0 : service.price;
    data.serviceName = service === null || service === void 0 ? void 0 : service.serviceName;
    const result = yield prisma_1.default.availableService.create({
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
});
const getAllFromDB = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = (0, paginationHelper_1.calculatePagination)(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = (0, findFilterConditions_1.findFilterConditionsWithPrice)(searchTerm, filterData, availableService_constant_1.availableServiceSearchableFields, availableService_constant_1.availableServiceRelationalFields, availableService_constant_1.availableServiceRelationalFieldsMapper);
    const whereConditons = andConditions.length > 0 ? { AND: andConditions } : {};
    const orderCondition = (0, orderCondition_1.orderByConditions)(options);
    const result = yield prisma_1.default.availableService.findMany({
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
    const total = yield prisma_1.default.availableService.count();
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
const getAllRemainingServices = (date, filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = (0, paginationHelper_1.calculatePagination)(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = (0, findFilterConditions_1.findFilterConditionsWithPrice)(searchTerm, filterData, availableService_constant_1.availableServiceSearchableFields, availableService_constant_1.availableServiceRelationalFields, availableService_constant_1.availableServiceRelationalFieldsMapper);
    const whereConditons = andConditions.length > 0 ? { AND: andConditions } : {};
    const orderCondition = (0, orderCondition_1.orderByConditions)(options);
    const result = yield prisma_1.default.availableService.findMany({
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
    const total = yield prisma_1.default.availableService.count();
    if (date) {
        const bookings = yield prisma_1.default.booking.findMany({
            where: {
                date: date,
                status: {
                    in: [client_1.BookingStatus.pending, client_1.BookingStatus.confirmed],
                },
            },
        });
        result.forEach(service => {
            const serviceBooking = bookings.filter(book => book.serviceId === service.id);
            const bookedSlots = serviceBooking.map(b => b.slotId);
            const available = service.slots.filter(slot => !bookedSlots.includes(slot.id));
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
});
const getDataById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.availableService.findUnique({
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
});
const getAvailAbleService = (id, date) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.availableService.findUnique({
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
        const bookings = yield prisma_1.default.booking.findMany({
            where: {
                date: date,
                status: {
                    in: [client_1.BookingStatus.pending, client_1.BookingStatus.confirmed],
                },
            },
        });
        const serviceBooking = bookings.filter(book => book.serviceId === (newService === null || newService === void 0 ? void 0 : newService.id));
        const bookedSlots = serviceBooking.map(b => b.slotId);
        const available = newService === null || newService === void 0 ? void 0 : newService.slots.filter(slot => !bookedSlots.includes(slot.id));
        if (newService) {
            //@ts-ignore
            newService.slots = available;
        }
        return newService;
    }
});
const updateDataById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.availableService.update({
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
});
const deleteDataById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.availableService.delete({
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
});
const getDataByCategory = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const AvailableServices = yield prisma_1.default.availableService.findMany({
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
        throw new ApiError_1.default('No AvailableServices found for the specified category', http_status_1.default.NOT_FOUND);
    }
    return AvailableServices;
});
exports.AvailableServiceServices = {
    insertIntoDB,
    getAllFromDB,
    getDataById,
    updateDataById,
    deleteDataById,
    getDataByCategory,
    getAllRemainingServices,
    getAvailAbleService,
};
