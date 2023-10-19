"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationSchema = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        serviceId: zod_1.z.string({
            required_error: 'Service ID is required',
        }),
        status: zod_1.z.boolean().optional(),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        serviceId: zod_1.z.string().optional(),
        status: zod_1.z.boolean().optional(),
    }),
});
exports.validationSchema = {
    create,
    update,
};
