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
exports.BookingServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const client_1 = require("@prisma/client");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const orderCondition_1 = require("../../../shared/orderCondition");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const utils_1 = require("../../../shared/utils");
const bookService = (verifiedUser, data) => __awaiter(void 0, void 0, void 0, function* () {
    //checking if the available service exist
    const availableService = yield prisma_1.default.availableService.findUnique({
        where: {
            id: data.serviceId,
        },
    });
    if (!availableService) {
        throw new ApiError_1.default('This service is not available', http_status_1.default.NOT_FOUND);
    }
    const findSlot = yield prisma_1.default.slot.findUnique({
        where: {
            id: data.slotId,
        },
    });
    const booking = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const book = yield transactionClient.booking.create({
            data: {
                userId: verifiedUser.userId,
                date: data.date,
                weekDay: (0, utils_1.getWeekdayFromDate)(data.date),
                time: findSlot === null || findSlot === void 0 ? void 0 : findSlot.startTime,
                serviceId: availableService.id,
                slotId: findSlot === null || findSlot === void 0 ? void 0 : findSlot.id,
                status: client_1.BookingStatus.pending,
            },
            include: {
                payment: true,
            },
        });
        const payment = yield transactionClient.payment.create({
            data: {
                paymentStatus: client_1.PaymentStatus.notPaid,
                paymentMethod: data.paymentMethod,
                bookingId: book.id,
            },
        });
        return {
            booking: book,
            payment: payment,
        };
    }));
    return booking;
});
const cancelBooking = (bookingId, paymentId) => __awaiter(void 0, void 0, void 0, function* () {
    //checking if the available service exist
    const bookings = yield prisma_1.default.booking.findUnique({
        where: {
            id: bookingId,
        },
    });
    if (!bookings) {
        throw new ApiError_1.default('There is no booking', http_status_1.default.NOT_FOUND);
    }
    if (bookings.status === client_1.BookingStatus.confirmed) {
        throw new ApiError_1.default('This booking already finished, you can not cancel now', http_status_1.default.NOT_FOUND);
    }
    if (bookings.status === client_1.BookingStatus.rejected) {
        throw new ApiError_1.default('This booking already cancelled', http_status_1.default.NOT_FOUND);
    }
    const cancelBooking = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const book = yield transactionClient.booking.update({
            where: {
                id: bookingId,
            },
            data: {
                status: client_1.BookingStatus.rejected,
            },
        });
        const payment = yield transactionClient.payment.update({
            where: {
                id: paymentId,
            },
            data: {
                paymentStatus: client_1.PaymentStatus.rejected,
            },
        });
        return {
            booking: book,
            payment: payment,
        };
    }));
    return cancelBooking;
});
const completeBooking = (bookingId, paymentId) => __awaiter(void 0, void 0, void 0, function* () {
    //checking if the available service exist
    const bookings = yield prisma_1.default.booking.findUnique({
        where: {
            id: bookingId,
        },
    });
    if (!bookings) {
        throw new ApiError_1.default('There is no booking', http_status_1.default.NOT_FOUND);
    }
    if (bookings.status === client_1.BookingStatus.confirmed) {
        throw new ApiError_1.default('This booking already finished, you can not cancel now', http_status_1.default.NOT_FOUND);
    }
    if (bookings.status === client_1.BookingStatus.rejected) {
        throw new ApiError_1.default('This booking already cancelled', http_status_1.default.NOT_FOUND);
    }
    const finishBooking = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const book = yield transactionClient.booking.update({
            where: {
                id: bookingId,
            },
            data: {
                status: client_1.BookingStatus.confirmed,
            },
        });
        const payment = yield transactionClient.payment.update({
            where: {
                id: paymentId,
            },
            data: {
                paymentStatus: client_1.PaymentStatus.paid,
            },
        });
        return {
            booking: book,
            payment: payment,
        };
    }));
    return finishBooking;
});
const getAllBooking = (options, verifiedUser) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = (0, paginationHelper_1.calculatePagination)(options);
    const orderCondition = (0, orderCondition_1.orderByConditions)(options);
    let whereCondition = {};
    if (verifiedUser.role === client_1.UserRole.customer) {
        // If the user is a customer, filter orders by their user ID
        whereCondition = {
            userId: verifiedUser.userId,
        };
    }
    const result = yield prisma_1.default.booking.findMany({
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
    const total = yield prisma_1.default.booking.count();
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
const getSingleBooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.booking.findUnique({
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
});
const updateBooking = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.booking.update({
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
});
const deleteBooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.booking.delete({
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
});
exports.BookingServices = {
    bookService,
    cancelBooking,
    completeBooking,
    getSingleBooking,
    updateBooking,
    deleteBooking,
    getAllBooking,
};
