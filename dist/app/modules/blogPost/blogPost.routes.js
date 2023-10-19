"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogPostRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = require("../../middlewares/validateRequest");
const blogPost_controller_1 = require("./blogPost.controller");
const blogPost_validation_1 = require("./blogPost.validation");
const router = express_1.default.Router();
router.get('/:id', blogPost_controller_1.BlogPostController.getDataById);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), blogPost_controller_1.BlogPostController.deleteDataById);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), (0, validateRequest_1.validateRequest)(blogPost_validation_1.validationSchema.update), blogPost_controller_1.BlogPostController.updateDataById);
router.post('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), (0, validateRequest_1.validateRequest)(blogPost_validation_1.validationSchema.create), blogPost_controller_1.BlogPostController.insertIntoDB);
router.get('/', blogPost_controller_1.BlogPostController.getAllFromDB);
exports.blogPostRoutes = router;
