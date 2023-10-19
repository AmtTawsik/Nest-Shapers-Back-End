"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationSchema = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'Title is required',
        }),
        authorName: zod_1.z.string({
            required_error: 'Author Name is required',
        }),
        imageUrl: zod_1.z.string().optional(),
        blogLink: zod_1.z.string({
            required_error: 'Blog Link is required',
        }),
        categoryId: zod_1.z.string({
            required_error: 'Category ID is required',
        }),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string(),
        authorName: zod_1.z.string(),
        imageUrl: zod_1.z.string().optional(),
        blogLink: zod_1.z.string(),
        categoryId: zod_1.z.string(),
    }),
});
exports.validationSchema = {
    create,
    update,
};
