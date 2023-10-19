"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceCategoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = require("../../middlewares/validateRequest");
const serviceCategory_controller_1 = require("./serviceCategory.controller");
const serviceCategory_validation_1 = require("./serviceCategory.validation");
const router = express_1.default.Router();
router.get('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), serviceCategory_controller_1.ServiceCategoryController.getDataById);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), serviceCategory_controller_1.ServiceCategoryController.deleteDataById);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), (0, validateRequest_1.validateRequest)(serviceCategory_validation_1.validationSchema.update), serviceCategory_controller_1.ServiceCategoryController.updateDataById);
router.post('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), (0, validateRequest_1.validateRequest)(serviceCategory_validation_1.validationSchema.create), serviceCategory_controller_1.ServiceCategoryController.insertIntoDB);
router.get('/', serviceCategory_controller_1.ServiceCategoryController.getAllFromDB);
exports.serviceCategoryRoutes = router;
