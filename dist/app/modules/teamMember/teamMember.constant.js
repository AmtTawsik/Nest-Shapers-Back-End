"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamMemberRelationalFieldsMapper = exports.teamMemberRelationalFields = exports.teamMemberFilterableFields = exports.teamMemberSearchableFields = void 0;
exports.teamMemberSearchableFields = ['age'];
exports.teamMemberFilterableFields = [
    'searchTerm',
    'specializationId',
    'userId',
    'serviceTeamId',
    'age',
    'experience',
];
exports.teamMemberRelationalFields = [
    'serviceTeamId',
    'userId',
    'specializationId',
];
exports.teamMemberRelationalFieldsMapper = {
    specializationId: 'specialization',
    userId: 'user',
    serviceTeamId: 'serviceTeam',
};
