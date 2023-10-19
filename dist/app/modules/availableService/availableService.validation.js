"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationSchema = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        isFeatured: zod_1.z.boolean().optional(),
        isAvailable: zod_1.z.boolean().optional(),
        totalServiceProvided: zod_1.z.number().int().optional(),
        serviceId: zod_1.z.string({
            required_error: 'Service ID is required',
        }),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        isFeatured: zod_1.z.boolean().optional(),
        isAvailable: zod_1.z.boolean().optional(),
        totalServiceProvided: zod_1.z.number().int().optional(),
        serviceId: zod_1.z.string().optional(),
    }),
});
exports.validationSchema = {
    create,
    update,
};
