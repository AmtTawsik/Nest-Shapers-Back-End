"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleClientError = void 0;
const ApiError_1 = __importDefault(require("./ApiError"));
const handleClientError = (error) => {
    var _a, _b;
    let errorObj = [];
    let message = '';
    const statusCode = 400;
    if (error.code === 'P2025') {
        message = ((_a = error.meta) === null || _a === void 0 ? void 0 : _a.cause) || 'Record not found!';
        errorObj = [
            {
                path: '',
                message,
            },
        ];
    }
    else if (error.code === 'P2003') {
        if (error.message.includes('delete()` invocation:')) {
            message = 'Delete failed';
            errorObj = [
                {
                    path: '',
                    message,
                },
            ];
        }
    }
    else if (error.code === 'P2002') {
        message = `${(_b = error === null || error === void 0 ? void 0 : error.meta) === null || _b === void 0 ? void 0 : _b.target} must be a unique value`;
        errorObj = [
            {
                path: '',
                message,
            },
        ];
    }
    return new ApiError_1.default(message, statusCode, errorObj);
};
exports.handleClientError = handleClientError;
