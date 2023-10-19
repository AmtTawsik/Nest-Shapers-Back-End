"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_status_1 = __importDefault(require("http-status"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const routes_1 = __importDefault(require("./app/routes"));
const ApiError_1 = __importDefault(require("./errors/ApiError"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: 'http://localhost:3000', credentials: true }));
//parser
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
// Application Routs
app.use('/api/v1', routes_1.default);
// Main route
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('Working Successfully');
}));
// Error Route
app.get('*', (req, res, next) => {
    const message = 'Not Found';
    const errorObjs = [
        {
            path: `${req.originalUrl}`,
            message: `Invalid URL! API not found`,
        },
    ];
    next(new ApiError_1.default(message, http_status_1.default.NOT_FOUND, errorObjs));
});
// global error handaler
app.use(globalErrorHandler_1.default);
exports.default = app;
