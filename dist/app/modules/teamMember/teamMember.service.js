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
exports.TeamMemberServices = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const findFilterConditions_1 = require("../../../shared/findFilterConditions");
const orderCondition_1 = require("../../../shared/orderCondition");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const teamMember_constant_1 = require("./teamMember.constant");
const insertIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.teamMember.create({
        data,
        include: {
            user: true,
            specialization: true,
            serviceTeam: true,
        },
    });
    return result;
});
const getAllFromDB = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = (0, paginationHelper_1.calculatePagination)(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = (0, findFilterConditions_1.findFilterConditions)(searchTerm, filterData, teamMember_constant_1.teamMemberSearchableFields, teamMember_constant_1.teamMemberRelationalFields, teamMember_constant_1.teamMemberRelationalFieldsMapper);
    const whereConditons = andConditions.length > 0 ? { AND: andConditions } : {};
    const orderCondition = (0, orderCondition_1.orderByConditions)(options);
    const result = yield prisma_1.default.teamMember.findMany({
        include: {
            user: true,
            specialization: true,
            serviceTeam: true,
        },
        where: whereConditons,
        skip,
        take: limit,
        orderBy: orderCondition,
    });
    const total = yield prisma_1.default.teamMember.count();
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
    const result = yield prisma_1.default.teamMember.findUnique({
        where: {
            id,
        },
        include: {
            user: true,
            specialization: true,
            serviceTeam: true,
        },
    });
    return result;
});
const updateDataById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.teamMember.update({
        where: {
            id,
        },
        data: payload,
        include: {
            user: true,
            specialization: true,
            serviceTeam: true,
        },
    });
    return result;
});
const deleteDataById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.teamMember.delete({
        where: {
            id,
        },
        include: {
            user: true,
            specialization: true,
            serviceTeam: true,
        },
    });
    return result;
});
exports.TeamMemberServices = {
    insertIntoDB,
    getAllFromDB,
    getDataById,
    updateDataById,
    deleteDataById,
};
