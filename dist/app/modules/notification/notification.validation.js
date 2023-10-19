"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationSchema = void 0;
const zod_1 = require("zod");
const notification_constant_1 = require("./notification.constant");
const create = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({
            required_error: 'User ID is required',
        }),
        readStatus: zod_1.z.boolean().optional(),
        message: zod_1.z.string({
            required_error: 'Message is required',
        }),
        type: zod_1.z.enum([...notification_constant_1.notificationType], {
            required_error: 'Notification type is required',
        }),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().optional(),
        readStatus: zod_1.z.boolean().optional(),
        message: zod_1.z.string().optional(),
        type: zod_1.z.enum([...notification_constant_1.notificationType]).optional(),
    }),
});
exports.validationSchema = {
    create,
    update,
};
