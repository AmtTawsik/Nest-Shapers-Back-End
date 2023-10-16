"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationErrorDB = void 0;
const ApiError_1 = __importDefault(require("./ApiError"));
const handleValidationErrorDB = (error) => {
    const errorsObj = [
        {
            path: '',
            message: error.message || 'Some field are not valid field',
        },
    ];
    return new ApiError_1.default('Validation Error', 400, errorsObj);
};
exports.handleValidationErrorDB = handleValidationErrorDB;
