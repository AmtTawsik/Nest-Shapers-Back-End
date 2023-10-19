"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationSchema = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        heading: zod_1.z.string().optional(),
        subHeading: zod_1.z.string().optional(),
        aboutUsText: zod_1.z.string().optional(),
        aboutUsImage: zod_1.z.string().optional(),
        ceoStatement: zod_1.z.string().optional(),
        ceoName: zod_1.z.string().optional(),
        ceoImage: zod_1.z.string().optional(),
        companyAddress: zod_1.z.string().optional(),
        companyContactNo: zod_1.z.string().optional(),
        companyEmail: zod_1.z.string().optional(),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        heading: zod_1.z.string().optional(),
        subHeading: zod_1.z.string().optional(),
        aboutUsText: zod_1.z.string().optional(),
        aboutUsImage: zod_1.z.string().optional(),
        ceoStatement: zod_1.z.string().optional(),
        ceoName: zod_1.z.string().optional(),
        ceoImage: zod_1.z.string().optional(),
        companyAddress: zod_1.z.string().optional(),
        companyContactNo: zod_1.z.string().optional(),
        companyEmail: zod_1.z.string().optional(),
    }),
});
exports.validationSchema = {
    create,
    update,
};
