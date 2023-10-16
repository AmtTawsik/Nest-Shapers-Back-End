"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const config_1 = __importDefault(require("../../config"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const handleClientError_1 = require("../../errors/handleClientError");
const handleValidationErroDB_1 = require("../../errors/handleValidationErroDB");
const handleZodError_1 = require("../../errors/handleZodError");
const sendErrorToDev = (err, res) => {
    res.status(err.statusCode).json({
        success: false,
        status: err.status,
        message: err.message,
        errorMessages: err.errorMessages,
        stack: err === null || err === void 0 ? void 0 : err.stack,
        error: err,
    });
};
const sendErrorToProd = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            success: false,
            status: err.status,
            message: err.message,
            errorMessages: err.errorMessages,
        });
    }
    else {
        // log the error
        console.log(`🛑 Production ERROR`, err);
        res.status(500).json({
            success: false,
            status: 'error',
            message: 'Something went wrong',
            errorMessages: [],
        });
    }
};
const allErrors = (err) => {
    let error = Object.assign({}, err);
    if (err instanceof zod_1.ZodError) {
        error = (0, handleZodError_1.handleZodError)(error);
    }
    if (err instanceof client_1.Prisma.PrismaClientKnownRequestError)
        error = (0, handleClientError_1.handleClientError)(error);
    if (err instanceof client_1.Prisma.PrismaClientValidationError) {
        error = (0, handleValidationErroDB_1.handleValidationErrorDB)(error);
    }
    return error;
};
const globalErrorHandler = (err, req, res, next) => {
    if (config_1.default.env === 'development') {
        // eslint-disable-next-line no-console
        console.log('🚀 globalErrorHandler ~~ ', err);
    }
    else {
        console.log('🚀 globalErrorHandler ~~ ', err);
    }
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if (config_1.default.env === 'development') {
        const error = allErrors(err);
        if (err instanceof ApiError_1.default) {
            sendErrorToDev(err, res);
        }
        else if (err instanceof Error) {
            sendErrorToDev(error, res);
        }
        else if (err instanceof zod_1.ZodError) {
            sendErrorToDev(error, res);
        }
    }
    else if (config_1.default.env === 'production') {
        const error = allErrors(err);
        if (err instanceof ApiError_1.default) {
            sendErrorToProd(err, res);
        }
        else if (err instanceof Error) {
            sendErrorToProd(error, res);
        }
        else if (err instanceof zod_1.ZodError) {
            sendErrorToDev(error, res);
        }
    }
    next();
};
exports.default = globalErrorHandler;
