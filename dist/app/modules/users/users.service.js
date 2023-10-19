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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const findFilterConditions_1 = require("../../../shared/findFilterConditions");
const orderCondition_1 = require("../../../shared/orderCondition");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const users_constant_1 = require("./users.constant");
const insertIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullName, email, password, role, contactNumber, address, profileImageUrl, gender, } = data;
    const hashedPassword = yield bcrypt_1.default.hash(password, Number(config_1.default.bcrypt_salt_rounds));
    const newData = {
        fullName,
        email,
        password: hashedPassword,
        contactNumber,
        address,
        profileImageUrl,
        role,
        gender,
    };
    const result = yield prisma_1.default.users.create({ data: newData });
    const newResultData = {
        id: result.id,
        fullName: result.fullName,
        email: result.email,
        role: result.role,
        contactNumber: result.contactNumber,
        address: result.address,
        profileImageUrl: result.profileImageUrl,
        gender: result.gender,
    };
    return newResultData;
});
const loginUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = data;
    // check user exist
    const user = yield prisma_1.default.users.findUnique({
        where: { email },
    });
    if (!user) {
        throw new ApiError_1.default('User does not exist', http_status_1.default.NOT_FOUND);
    }
    const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!passwordMatch) {
        throw new ApiError_1.default('Password is incorrect', http_status_1.default.UNAUTHORIZED);
    }
    // create access token
    const { id: userId, role, email: userEmail } = user;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ userId, role, userEmail }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    // create refresh token
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ userId, role, userEmail }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    //verify token
    // invalid token - synchronous
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
    }
    catch (err) {
        throw new ApiError_1.default('Invalid Refresh Token', http_status_1.default.FORBIDDEN);
    }
    const { userId } = verifiedToken;
    const user = yield prisma_1.default.users.findUnique({
        where: { id: userId },
    });
    if (!user) {
        throw new ApiError_1.default('User does not exist', http_status_1.default.NOT_FOUND);
    }
    const { id, role, email: userEmail } = user;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ userId: id, role, userEmail }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken: accessToken,
    };
});
const getAllFromDB = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = (0, paginationHelper_1.calculatePagination)(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = (0, findFilterConditions_1.findFilterConditionsWithoutRelation)(searchTerm, filterData, users_constant_1.userSearchableFields);
    const whereConditons = andConditions.length > 0 ? { AND: andConditions } : {};
    const orderCondition = (0, orderCondition_1.orderByConditions)(options);
    const result = yield prisma_1.default.users.findMany({
        where: whereConditons,
        skip,
        take: limit,
        orderBy: orderCondition,
        select: {
            id: true,
            fullName: true,
            email: true,
            role: true,
            contactNumber: true,
            address: true,
            profileImageUrl: true,
            gender: true,
            teamMembers: true,
            bookings: true,
            reviewAndRatings: true,
            notifications: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    const total = yield prisma_1.default.users.count();
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
const getDataById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.users.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            fullName: true,
            email: true,
            role: true,
            contactNumber: true,
            address: true,
            profileImageUrl: true,
            gender: true,
            teamMembers: true,
            bookings: true,
            reviewAndRatings: true,
            notifications: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return result;
});
const updateDataById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield prisma_1.default.users.findUnique({
        where: { id: id },
    });
    if (!existingUser) {
        throw new ApiError_1.default('User does not exist', http_status_1.default.NOT_FOUND);
    }
    const result = yield prisma_1.default.users.update({
        where: {
            id,
        },
        data: Object.assign(Object.assign({}, payload), { password: payload.password
                ? yield bcrypt_1.default.hash(payload.password, Number(config_1.default.bcrypt_salt_rounds))
                : undefined }),
        select: {
            id: true,
            fullName: true,
            email: true,
            role: true,
            contactNumber: true,
            address: true,
            profileImageUrl: true,
            gender: true,
            teamMembers: true,
            bookings: true,
            reviewAndRatings: true,
            notifications: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return result;
});
const deleteDataById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.users.delete({
        where: {
            id,
        },
        select: {
            id: true,
            fullName: true,
            email: true,
            role: true,
            contactNumber: true,
            address: true,
            profileImageUrl: true,
            gender: true,
            teamMembers: true,
            bookings: true,
            reviewAndRatings: true,
            notifications: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return result;
});
const getProfileData = (verifiedUser) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.users.findUnique({
        where: { id: verifiedUser.userId },
    });
    if (!user) {
        throw new ApiError_1.default('No user found with this id', http_status_1.default.UNAUTHORIZED);
    }
    return user;
});
const updateProfileDataById = (verifiedUser, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield prisma_1.default.users.findUnique({
        where: { id: verifiedUser.userId },
    });
    if (!existingUser) {
        throw new ApiError_1.default('User does not exist', http_status_1.default.NOT_FOUND);
    }
    if (payload.role === 'admin' ||
        payload.role === 'super_admin' ||
        payload.role === 'customer' ||
        payload.role === 'team_member') {
        throw new ApiError_1.default('You can not change role', http_status_1.default.NOT_FOUND);
    }
    const result = yield prisma_1.default.users.update({
        where: {
            id: verifiedUser.userId,
        },
        data: Object.assign(Object.assign({}, payload), { password: payload.password
                ? yield bcrypt_1.default.hash(payload.password, Number(config_1.default.bcrypt_salt_rounds))
                : undefined }),
        select: {
            id: true,
            fullName: true,
            email: true,
            role: true,
            contactNumber: true,
            address: true,
            profileImageUrl: true,
            gender: true,
            teamMembers: true,
            bookings: true,
            reviewAndRatings: true,
            notifications: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return result;
});
const getTeamMember = () => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.users.findMany({
        where: { role: 'team_member' },
    });
    return user;
});
exports.UsersServices = {
    insertIntoDB,
    loginUser,
    getAllFromDB,
    getDataById,
    updateDataById,
    deleteDataById,
    getProfileData,
    refreshToken,
    updateProfileDataById,
    getTeamMember,
};
