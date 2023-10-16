"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleZodError = void 0;
const ApiError_1 = __importDefault(require("./ApiError"));
const handleZodError = (error) => {
    const errorsObj = error.issues.map((issue) => {
        return {
            path: issue === null || issue === void 0 ? void 0 : issue.path[issue.path.length - 1],
            message: issue === null || issue === void 0 ? void 0 : issue.message,
        };
    });
    const message = `Validation Error`;
    const ob = new ApiError_1.default(message, 400, errorsObj);
    // eslint-disable-next-line no-console
    console.log(ob);
    return ob;
};
exports.handleZodError = handleZodError;
