"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationSchema = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        age: zod_1.z.string({
            required_error: 'Age is required',
        }),
        dob: zod_1.z.string({
            required_error: 'Date of birth is required',
        }),
        experience: zod_1.z.string({
            required_error: 'Experience is required',
        }),
        history: zod_1.z.string({
            required_error: 'History is required',
        }),
        userId: zod_1.z.string({
            required_error: 'User ID is required',
        }),
        specializationId: zod_1.z.string({
            required_error: 'Specialization ID is required',
        }),
        serviceTeamId: zod_1.z.string({
            required_error: 'Service Team ID is required',
        }),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        age: zod_1.z.string().optional(),
        dob: zod_1.z.string().optional(),
        experience: zod_1.z.string().optional(),
        history: zod_1.z.string().optional(),
        userId: zod_1.z.string().optional(),
        specializationId: zod_1.z.string().optional(),
        serviceTeamId: zod_1.z.string().optional(),
    }),
});
exports.validationSchema = {
    create,
    update,
};
