"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationSchema = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({
            required_error: 'User ID is required',
        }),
        serviceId: zod_1.z.string({
            required_error: 'Service ID is required',
        }),
        rating: zod_1.z.number({
            required_error: 'Rating is required and should be an integer',
        }),
        review: zod_1.z.string({
            required_error: 'Review is required',
        }),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().optional(),
        serviceId: zod_1.z.string().optional(),
        rating: zod_1.z.number().optional(),
        review: zod_1.z.string().optional(),
    }),
});
exports.validationSchema = {
    create,
    update,
};
