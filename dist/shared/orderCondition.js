"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderByConditions = void 0;
const orderByConditions = (options = {}) => {
    if (options.sortBy && options.sortOrder) {
        return {
            [options.sortBy]: options.sortOrder,
        };
    }
    return {
        createdAt: 'desc',
    };
};
exports.orderByConditions = orderByConditions;
