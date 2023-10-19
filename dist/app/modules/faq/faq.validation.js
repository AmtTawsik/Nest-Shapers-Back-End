"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationSchema = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        question: zod_1.z.string({
            required_error: 'Question is required',
        }),
        answer: zod_1.z.string({
            required_error: 'Answer is required',
        }),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        question: zod_1.z.string(),
        answer: zod_1.z.string(),
    }),
});
exports.validationSchema = {
    create,
    update,
};
