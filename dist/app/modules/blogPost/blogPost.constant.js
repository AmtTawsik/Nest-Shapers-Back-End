"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogPostRelationalFieldsMapper = exports.BlogPostRelationalFields = exports.BlogPostFilterableFields = exports.BlogPostSearchableFields = void 0;
exports.BlogPostSearchableFields = ['title'];
exports.BlogPostFilterableFields = [
    'searchTerm',
    'authorName',
    'categoryId',
];
exports.BlogPostRelationalFields = ['categoryId'];
exports.BlogPostRelationalFieldsMapper = {
    categoryId: 'serviceCategory',
};
