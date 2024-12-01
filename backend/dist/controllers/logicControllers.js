"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAllLoans = exports.payRepayment = exports.manageLoans = exports.readAllLoans = exports.updateAdminLoan = exports.initiateLoan = void 0;
const logicUtils_1 = require("../utils/logicUtils");
const dbconnect_1 = __importDefault(require("../dbconnect"));
const uuid_1 = require("uuid");
const dateGenerate_1 = require("../services/dateGenerate");
const initiateLoan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { loan_amount, term_duration } = req.body;
    const { userId } = req.params;
    const initiateLoanWarnings = yield (0, logicUtils_1.initiateLoanUtils)(loan_amount, term_duration, userId);
    if (!(initiateLoanWarnings === null || initiateLoanWarnings === void 0 ? void 0 : initiateLoanWarnings.success)) {
        res.json(initiateLoanWarnings);
        return;
    }
    try {
        const id = (0, uuid_1.v4)();
        const result = yield dbconnect_1.default.query("INSERT INTO Loan(  id, term_duration, term_paid, loan_amount, paid_amount, customer_id, loan_status, loan_paid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", [id, term_duration, 0, loan_amount, 0, userId, "PENDING", false]);
        console.log(result.rows[0]);
        if (Number(result.rowCount) > 0) {
            res.json({
                success: true,
                data: { loan_details: result.rows[0] },
                message: "Loan requested successfully",
            });
        }
        else {
            res.json({ success: false, message: "Loan request not successfully" });
        }
    }
    catch (error) {
        res.json({ success: false, message: error });
    }
});
exports.initiateLoan = initiateLoan;
const updateAdminLoan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.user_access;
        const { loanId } = req.params;
        const updateAdminLoanWarnings = yield (0, logicUtils_1.updateAdminLoanUtils)(token, loanId);
        if (!(updateAdminLoanWarnings === null || updateAdminLoanWarnings === void 0 ? void 0 : updateAdminLoanWarnings.success)) {
            res.json(updateAdminLoanWarnings);
            return;
        }
        const date = new Date();
        const approvedDate = date.toDateString();
        const result = yield dbconnect_1.default.query("UPDATE Loan SET loan_status=$2, approved_date=$3 WHERE id=$1", [loanId, "APPROVED", approvedDate]);
        if (Number(result.rowCount) > 0) {
            res.json({ success: true, message: "Loan approved successfully" });
        }
    }
    catch (error) {
        res.json({ success: false, message: error });
    }
});
exports.updateAdminLoan = updateAdminLoan;
const readAllLoans = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const readAllLoansWarnings = yield (0, logicUtils_1.readAllLoansUtils)(userId);
    if (!(readAllLoansWarnings === null || readAllLoansWarnings === void 0 ? void 0 : readAllLoansWarnings.success)) {
        res.json(readAllLoansWarnings);
        return;
    }
    try {
        const result = yield dbconnect_1.default.query("SELECT * FROM Loan WHERE customer_id=$1", [
            userId,
        ]);
        if (Number(result.rowCount) > 0) {
            res.json({
                success: true,
                data: result.rows,
                message: "Current loan details",
            });
        }
        else {
            res.json({ success: false, message: "No current loan details found" });
        }
    }
    catch (error) {
        res.json({ success: false, message: error });
    }
});
exports.readAllLoans = readAllLoans;
const manageLoans = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { loanId } = req.params;
    const manageLoansWarnings = yield (0, logicUtils_1.manageLoansUtils)(loanId);
    if (!(manageLoansWarnings === null || manageLoansWarnings === void 0 ? void 0 : manageLoansWarnings.success)) {
        res.json(manageLoansWarnings);
        return;
    }
    try {
        let data = [];
        const result = yield dbconnect_1.default.query("SELECT * FROM Loan WHERE id=$1", [loanId]);
        if (Number(result.rowCount) > 0) {
            result.rows.forEach((loan) => {
                const repayment_amount = (loan.loan_amount - loan.paid_amount) /
                    (loan.term_duration - loan.term_paid);
                const repayment_dates = (0, dateGenerate_1.repaymentDates)(loan.approved_date, loan.term_duration);
                data.push({
                    id: loan.id,
                    loan_paid: loan.loan_paid,
                    loan_amount: loan.loan_amount,
                    term_duration: loan.term_duration,
                    approved_date: loan.approved_date,
                    term_paid: loan.term_paid,
                    repayment_amount,
                    repayment_dates,
                });
            });
            if (data.length > 0) {
                res.json({ success: true, data, message: "Current loan details" });
            }
        }
        else {
            res.json({ success: false, message: "No current loan details found" });
        }
    }
    catch (error) {
        res.json({ success: false, message: error });
    }
});
exports.manageLoans = manageLoans;
const payRepayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { repayAmount } = req.body;
    const { loanId } = req.params;
    const payRepaymentWarnings = yield (0, logicUtils_1.payRepaymentUtils)(repayAmount, loanId);
    if (!(payRepaymentWarnings === null || payRepaymentWarnings === void 0 ? void 0 : payRepaymentWarnings.success)) {
        res.json(payRepaymentWarnings);
        return;
    }
    const term_paid = Number(yield (payRepaymentWarnings === null || payRepaymentWarnings === void 0 ? void 0 : payRepaymentWarnings.term_paid)) + Number(1);
    const paid_amount = Number(yield (payRepaymentWarnings === null || payRepaymentWarnings === void 0 ? void 0 : payRepaymentWarnings.paid_amount)) + Number(repayAmount);
    const paid = Number(paid_amount) === Number(payRepaymentWarnings === null || payRepaymentWarnings === void 0 ? void 0 : payRepaymentWarnings.loan_amount)
        ? true
        : false;
    try {
        const result = yield dbconnect_1.default.query("UPDATE Loan SET paid_amount=$2, term_paid=$3, loan_paid=$4 WHERE id=$1 RETURNING *", [loanId, paid_amount, term_paid, paid]);
        if (result) {
            res.json({
                success: true,
                data: result.rows,
                message: "Paid repayment successfully",
            });
        }
    }
    catch (error) {
        res.json({ success: false, message: error });
    }
});
exports.payRepayment = payRepayment;
const fetchAllLoans = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield dbconnect_1.default.query("SELECT Loan.id AS loanId,Customer.firstname,Customer.lastname,Customer.user_email,Loan.loan_amount,Loan.term_duration,Loan.loan_status FROM Loan INNER JOIN Customer ON Loan.customer_id = Customer.id");
        if (Number(result.rowCount) > 0) {
            const user = yield dbconnect_1.default.query("SELECT * FROM Customer");
            res.json({
                success: true,
                data: result.rows,
                message: "Loan fetched successfully",
            });
        }
        else {
            res.json({ success: false, message: "No loans found" });
        }
    }
    catch (error) {
        res.json({ success: false, message: error });
    }
});
exports.fetchAllLoans = fetchAllLoans;
