"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationSchema = void 0;
const zod_1 = require("zod");
const payment_contant_1 = require("./payment.contant");
const create = zod_1.z.object({
    body: zod_1.z.object({
        paymentStatus: zod_1.z
            .enum([...payment_contant_1.paymentStatus])
            .optional(),
        paymentDate: zod_1.z.string().optional(),
        paymentMethod: zod_1.z.enum([...payment_contant_1.paymentMethod], {
            required_error: 'Payment method is required',
        }),
        transactionId: zod_1.z.string().optional(),
        bookingId: zod_1.z.string({
            required_error: 'Booking ID is required',
        }),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        paymentStatus: zod_1.z
            .enum([...payment_contant_1.paymentStatus])
            .optional(),
        paymentDate: zod_1.z.string().optional(),
        paymentMethod: zod_1.z
            .enum([...payment_contant_1.paymentMethod])
            .optional(),
        transactionId: zod_1.z.string().optional(),
        bookingId: zod_1.z.string().optional(),
    }),
});
exports.validationSchema = {
    create,
    update,
};
