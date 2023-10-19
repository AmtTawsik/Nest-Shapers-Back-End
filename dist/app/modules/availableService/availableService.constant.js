"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.availableServiceRelationalFieldsMapper = exports.availableServiceRelationalFields = exports.availableServiceFilterableFields = exports.availableServiceSearchableFields = void 0;
exports.availableServiceSearchableFields = ['serviceName'];
exports.availableServiceFilterableFields = [
    'searchTerm',
    'categoryId',
    'minPrice',
    'maxPrice',
];
exports.availableServiceRelationalFields = ['serviceId'];
exports.availableServiceRelationalFieldsMapper = {
    serviceId: 'service',
};
