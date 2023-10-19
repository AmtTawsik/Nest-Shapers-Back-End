"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../middlewares/validateRequest");
const users_controller_1 = require("./users.controller");
const users_validation_1 = require("./users.validation");
const router = express_1.default.Router();
router.post('/signup', (0, validateRequest_1.validateRequest)(users_validation_1.validationSchema.create), users_controller_1.UserController.insertIntoDB);
router.post('/signin', (0, validateRequest_1.validateRequest)(users_validation_1.validationSchema.userLogin), users_controller_1.UserController.signinUser);
router.post('/refresh-token', (0, validateRequest_1.validateRequest)(users_validation_1.validationSchema.refreshTokenZodSchema), users_controller_1.UserController.refreshToken);
exports.authRoutes = router;
