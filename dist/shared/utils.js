"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeekdayFromDate = void 0;
function getWeekdayFromDate(dateStr) {
    const date = new Date(dateStr);
    const daysOfWeek = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];
    const dayOfWeek = daysOfWeek[date.getDay()];
    return dayOfWeek;
}
exports.getWeekdayFromDate = getWeekdayFromDate;
