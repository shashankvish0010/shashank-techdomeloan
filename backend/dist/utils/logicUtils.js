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
exports.payRepaymentUtils = exports.readAllLoansUtils = exports.manageLoansUtils = exports.updateAdminLoanUtils = exports.initiateLoanUtils = void 0;
const dbconnect_1 = __importDefault(require("../dbconnect"));
const jwt = require("jsonwebtoken");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const initiateLoanUtils = (loan_amount, term_duration, userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!loan_amount || !term_duration) {
        return { success: false, message: "Fill both the fields" };
    }
    if (Number(loan_amount) <= 0 || Number(term_duration) <= 0) {
        return {
            success: false,
            message: "Both the fields cannot be less/equal to 0",
        };
    }
    try {
        const user = yield dbconnect_1.default.query("SELECT * FROM Customer WHERE id=$1", [userId]);
        if (Number(user === null || user === void 0 ? void 0 : user.rowCount) <= 0) {
            return {
                success: false,
                message: "Invalid userid",
            };
        }
        return { success: true, message: "No error found" };
    }
    catch (error) {
        return { success: false, message: error };
    }
});
exports.initiateLoanUtils = initiateLoanUtils;
const updateAdminLoanUtils = (token, loanId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token) {
        return { success: false, message: "Token was not fetched" };
    }
    if (!loanId) {
        return { success: false, message: "Token was not fetched" };
    }
    yield jwt.verify(token, process.env.ADMIN_SECRET, (error, decoded) => {
        if (error || !decoded) {
            return { success: false, message: "Invalid request" };
        }
    });
    try {
        const result = yield dbconnect_1.default.query("SELECT * FROM Loan WHERE id=$1", [loanId]);
        if (Number(result.rowCount) <= 0) {
            return { success: false, message: "Loan Id is not valid" };
        }
        return { success: true, message: "No error found" };
    }
    catch (error) {
        console.log("Error while fetching load details", error);
        return { success: false, message: "Error while fetching loan details" };
    }
});
exports.updateAdminLoanUtils = updateAdminLoanUtils;
const manageLoansUtils = (loanId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!loanId) {
        return { success: false, message: "No loan id found" };
    }
    try {
        const loan = yield dbconnect_1.default.query("SELECT * FROM Loan WHERE id=$1", [loanId]);
        if (Number(loan.rowCount) <= 0) {
            return { success: false, message: "loan not found." };
        }
        return { success: true, message: "No errors found." };
    }
    catch (error) {
        return {
            success: false,
            message: "Error while fetching user loan details",
        };
    }
});
exports.manageLoansUtils = manageLoansUtils;
const readAllLoansUtils = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userId) {
        return { success: false, message: "No user id found" };
    }
    try {
        const user = yield dbconnect_1.default.query("SELECT * FROM Customer WHERE id=$1", [userId]);
        if (Number(user.rowCount) <= 0) {
            return { success: false, message: "user not found." };
        }
        const result = yield dbconnect_1.default.query("SELECT * FROM Loan WHERE customer_id=$1", [
            userId,
        ]);
        if (Number(result.rowCount) <= 0) {
            return { success: false, message: "No users found." };
        }
        return { success: true, message: "No errors found." };
    }
    catch (error) {
        return {
            success: false,
            message: "Error while fetching user user details",
        };
    }
});
exports.readAllLoansUtils = readAllLoansUtils;
const payRepaymentUtils = (repayAmount, loanId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!repayAmount) {
        return { success: false, message: "Amount cannot be empty." };
    }
    if (Number(repayAmount) <= 0) {
        return { success: false, message: "Amount cannot be less/eqaul to zero." };
    }
    try {
        const result = yield dbconnect_1.default.query("SELECT * FROM Loan WHERE id=$1", [loanId]);
        if (Number(result.rowCount) <= 0) {
            return { success: false, message: "Requested loan not found." };
        }
        if ((result === null || result === void 0 ? void 0 : result.rows[0].loan_status) == "PENDING") {
            return { success: false, message: "Requested loan not approved." };
        }
        if (Number(repayAmount) > Number(result.rows[0].loan_amount)) {
            return {
                success: false,
                message: "Repay amount is greater than loan amount.",
            };
        }
        if (result.rows[0].loan_paid == true) {
            return {
                success: false,
                message: "Loan amount already paid.",
            };
        }
        return {
            success: true,
            loan_amount: result.rows[0].loan_amount,
            term_paid: result.rows[0].term_paid,
            paid_amount: result.rows[0].paid_amount,
            term_duration: result.rows[0].term_duration,
            message: "No error found.",
        };
    }
    catch (error) {
        return { success: false, message: error };
    }
});
exports.payRepaymentUtils = payRepaymentUtils;
