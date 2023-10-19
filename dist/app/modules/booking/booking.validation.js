"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationSchema = void 0;
const zod_1 = require("zod");
const booking_constant_1 = require("./booking.constant");
const create = zod_1.z.object({
    body: zod_1.z.object({
        date: zod_1.z.string({
            required_error: 'Date is required',
        }),
        weekDay: zod_1.z.string().optional(),
        time: zod_1.z.string().optional(),
        status: zod_1.z.enum([...booking_constant_1.bookingStatus]).optional(),
        userId: zod_1.z.string({
            required_error: 'User ID is required',
        }),
        serviceId: zod_1.z.string({
            required_error: 'Service ID is required',
        }),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        date: zod_1.z.string().optional(),
        weekDay: zod_1.z.string().optional(),
        time: zod_1.z.string().optional(),
        status: zod_1.z.enum([...booking_constant_1.bookingStatus]).optional(),
        userId: zod_1.z.string().optional(),
        serviceId: zod_1.z.string().optional(),
    }),
});
exports.validationSchema = {
    create,
    update,
};
