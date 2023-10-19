"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewAndRatingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = require("../../middlewares/validateRequest");
const reviewAndRating_controller_1 = require("./reviewAndRating.controller");
const reviewAndRating_validation_1 = require("./reviewAndRating.validation");
const router = express_1.default.Router();
router.get('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), reviewAndRating_controller_1.ReviewAndRatingController.getDataById);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), reviewAndRating_controller_1.ReviewAndRatingController.deleteDataById);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), (0, validateRequest_1.validateRequest)(reviewAndRating_validation_1.validationSchema.update), reviewAndRating_controller_1.ReviewAndRatingController.updateDataById);
router.post('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.CUSTOMER), (0, validateRequest_1.validateRequest)(reviewAndRating_validation_1.validationSchema.create), reviewAndRating_controller_1.ReviewAndRatingController.insertIntoDB);
router.get('/', reviewAndRating_controller_1.ReviewAndRatingController.getAllFromDB);
exports.reviewAndRatingRoutes = router;
