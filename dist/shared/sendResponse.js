"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, data) => {
    const responseData = {
        statusCode: data.statusCode,
        success: true,
        status: data.status,
        message: data.message || null,
        meta: data.meta,
        data: data.data || null,
    };
    res.status(data.statusCode).json(responseData);
};
exports.default = sendResponse;
