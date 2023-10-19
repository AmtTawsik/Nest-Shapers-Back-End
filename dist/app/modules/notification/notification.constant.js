"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationRelationalFieldsMapper = exports.NotificationRelationalFields = exports.NotificationFilterableFields = exports.NotificationSearchableFields = exports.notificationType = void 0;
exports.notificationType = [
    'booking',
    'confirmation',
    'reminder',
];
exports.NotificationSearchableFields = ['message'];
exports.NotificationFilterableFields = ['searchTerm', 'readStatus'];
exports.NotificationRelationalFields = ['userId'];
exports.NotificationRelationalFieldsMapper = {
    userId: 'user',
};
