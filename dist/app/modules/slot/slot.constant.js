"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotRelationalFieldsMapper = exports.SlotRelationalFields = exports.SlotFilterableFields = exports.SlotSearchableFields = exports.weekDays = void 0;
exports.weekDays = [
    'saturday',
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
];
exports.SlotSearchableFields = ['startTime'];
exports.SlotFilterableFields = [
    'searchTerm',
    'startTime',
    'serviceTeamId',
    'availableServiceId',
];
exports.SlotRelationalFields = [
    'serviceTeamId',
    'availableServiceId',
];
exports.SlotRelationalFieldsMapper = {
    serviceTeamId: 'serviceTeam ',
    availableServiceId: 'availableService',
};
