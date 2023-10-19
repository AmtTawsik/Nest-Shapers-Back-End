"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedbackRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const feedback_cotroller_1 = require("./feedback.cotroller");
const router = express_1.default.Router();
router.get('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), feedback_cotroller_1.FeedbackController.getDataById);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), feedback_cotroller_1.FeedbackController.deleteDataById);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), feedback_cotroller_1.FeedbackController.updateDataById);
router.post('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.CUSTOMER), feedback_cotroller_1.FeedbackController.insertIntoDB);
router.get('/', feedback_cotroller_1.FeedbackController.getAllFromDB);
exports.feedbackRoutes = router;
