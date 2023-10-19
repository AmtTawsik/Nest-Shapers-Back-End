"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationSchema = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        bestSellingServiceId: zod_1.z.string({
            required_error: 'Best Selling Service ID is required',
        }),
        totalClient: zod_1.z.number({
            required_error: 'Total client number is required',
        }),
        totalServiceProvided: zod_1.z.number().optional(),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        bestSellingServiceId: zod_1.z.string().optional(),
        totalClient: zod_1.z.number().optional(),
        totalServiceProvided: zod_1.z.number().optional(),
    }),
});
exports.validationSchema = {
    create,
    update,
};
