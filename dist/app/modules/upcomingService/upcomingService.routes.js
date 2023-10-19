"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upcomingServiceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = require("../../middlewares/validateRequest");
const upcomingService_controller_1 = require("./upcomingService.controller");
const upcomingService_validation_1 = require("./upcomingService.validation");
const router = express_1.default.Router();
router.get('/:id', upcomingService_controller_1.UpcomingServiceController.getDataById);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), upcomingService_controller_1.UpcomingServiceController.deleteDataById);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), (0, validateRequest_1.validateRequest)(upcomingService_validation_1.validationSchema.update), upcomingService_controller_1.UpcomingServiceController.updateDataById);
router.post('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), (0, validateRequest_1.validateRequest)(upcomingService_validation_1.validationSchema.create), upcomingService_controller_1.UpcomingServiceController.insertIntoDB);
router.get('/', upcomingService_controller_1.UpcomingServiceController.getAllFromDB);
exports.upcomingServiceRoutes = router;
