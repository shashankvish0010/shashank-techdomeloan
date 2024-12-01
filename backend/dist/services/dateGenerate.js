"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repaymentDates = void 0;
const repaymentDates = (approvedDate, term_duration) => {
    const repaymentDates = [];
    for (let i = 1; i <= term_duration; i++) {
        const repayDate = new Date(new Date().setDate(new Date().getDate() + 7 * i)).toDateString();
        repaymentDates.push(repayDate);
    }
    return repaymentDates;
};
exports.repaymentDates = repaymentDates;
