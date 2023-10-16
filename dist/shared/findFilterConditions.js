"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findFilterConditionsWithoutRelation = exports.findFilterConditions = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const findFilterConditions = (searchTerm, filtersData, searchableFields, relationalFields, relationalFieldsMapper) => {
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: searchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length > 0) {
        andConditions.push({
            AND: Object.keys(filtersData).map(key => {
                if (relationalFields.includes(key)) {
                    return {
                        [relationalFieldsMapper[key]]: {
                            id: filtersData[key],
                        },
                    };
                }
                else {
                    return {
                        [key]: {
                            equals: filtersData[key],
                        },
                    };
                }
            }),
        });
    }
    return andConditions;
};
exports.findFilterConditions = findFilterConditions;
const findFilterConditionsWithoutRelation = (searchTerm, filtersData, searchableFields) => {
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: searchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length > 0) {
        andConditions.push({
            AND: Object.keys(filtersData).map(key => ({
                [key]: {
                    equals: filtersData[key],
                },
            })),
        });
    }
    return andConditions;
};
exports.findFilterConditionsWithoutRelation = findFilterConditionsWithoutRelation;
