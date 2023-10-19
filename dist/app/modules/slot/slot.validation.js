"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationSchema = void 0;
const zod_1 = require("zod");
const slot_constant_1 = require("./slot.constant");
const create = zod_1.z.object({
    body: zod_1.z.object({
        startTime: zod_1.z.string({
            required_error: 'Start Time is required',
        }),
        serviceTeamId: zod_1.z.string({
            required_error: 'Service Team ID is required',
        }),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        startTime: zod_1.z.string().optional(),
        weekDay: zod_1.z.enum([...slot_constant_1.weekDays]).optional(),
        serviceTeamId: zod_1.z.string().optional(),
        availableServiceId: zod_1.z.string().optional(),
    }),
});
exports.validationSchema = {
    create,
    update,
};
