"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor(message, statusCode, errorMessages = [], stack = '') {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        this.errorMessages = errorMessages.length
            ? errorMessages
            : [{ path: '', message: this.message }];
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.default = ApiError;
