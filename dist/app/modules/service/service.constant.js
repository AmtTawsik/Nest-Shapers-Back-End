"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceRelationalFieldsMapper = exports.sercviceRelationalFields = exports.serviceFilterableFields = exports.serviceSearchableFields = void 0;
exports.serviceSearchableFields = ['serviceName'];
exports.serviceFilterableFields = [
    'searchTerm',
    'serviceCategoryId',
    'price',
];
exports.sercviceRelationalFields = ['serviceCategoryId'];
exports.serviceRelationalFieldsMapper = {
    serviceCategoryId: 'serviceCategory',
};
