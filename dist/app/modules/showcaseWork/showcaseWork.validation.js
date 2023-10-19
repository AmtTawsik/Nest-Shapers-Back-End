"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationSchema = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        serviceId: zod_1.z.string({
            required_error: 'Service ID is required',
        }),
        imageUrl: zod_1.z.string({
            required_error: 'Image URL is required',
        }),
        description: zod_1.z.string({
            required_error: 'Description is required',
        }),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        serviceId: zod_1.z.string().optional(),
        imageUrl: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
    }),
});
exports.validationSchema = {
    create,
    update,
};
