"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationSchema = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        serviceName: zod_1.z.string({
            required_error: 'Service Name is required',
        }),
        description: zod_1.z.string({
            required_error: 'Description is required',
        }),
        price: zod_1.z.number({
            required_error: 'Price is required',
        }),
        imageUrl: zod_1.z.string({
            required_error: 'Image URL is required',
        }),
        serviceCategoryId: zod_1.z.string({
            required_error: 'Service Category ID is required',
        }),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        serviceName: zod_1.z.string(),
        description: zod_1.z.string(),
        price: zod_1.z.number(),
        imageUrl: zod_1.z.string(),
        serviceCategoryId: zod_1.z.string(),
    }),
});
exports.validationSchema = {
    create,
    update,
};
