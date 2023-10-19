"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRelationalFieldsMapper = exports.ReviewRelationalFields = exports.ReviewFilterableFields = exports.ReviewSearchableFields = void 0;
exports.ReviewSearchableFields = [''];
exports.ReviewFilterableFields = ['searchTerm', 'userId', 'serviceId'];
exports.ReviewRelationalFields = ['userId', 'serviceId'];
exports.ReviewRelationalFieldsMapper = {
    serviceId: 'service',
    userId: 'user',
};
