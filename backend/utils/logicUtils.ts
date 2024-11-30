import db from "../dbconnect";
const jwt = require("jsonwebtoken");
import dotenv from "dotenv";

dotenv.config();

export const initiateLoanUtils = async (
  loan_amount: Number,
  term_duration: Number,
  userId: string
) => {
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
    const user = await db.query("SELECT * FROM Customer WHERE id=$1", [userId]);

    if (Number(user?.rowCount) <= 0) {
      return {
        success: false,
        message: "Invalid userid",
      };
    }
    return { success: true, message: "No error found" };
  } catch (error) {
    return { success: false, message: error };
  }
};

export const updateAdminLoanUtils = async (token: string, loanId: string) => {
  if (!token) {
    return { success: false, message: "Token was not fetched" };
  }
  if (!loanId) {
    return { success: false, message: "Token was not fetched" };
  }
  await jwt.verify(
    token,
    process.env.ADMIN_SECRET,
    (error: Error, decoded: string) => {
      if (error || !decoded) {
        return { success: false, message: "Invalid request" };
      }
    }
  );
  try {
    const result = await db.query("SELECT * FROM Loan WHERE id=$1", [loanId]);

    if (Number(result.rowCount) <= 0) {
      return { success: false, message: "Loan Id is not valid" };
    }

    return { success: true, message: "No error found" };
  } catch (error) {
    console.log("Error while fetching load details", error);
    return { success: false, message: "Error while fetching loan details" };
  }
};

export const manageLoansUtils = async (userId: string) => {
  if (!userId) {
    return { success: false, message: "No user id found" };
  }
  try {
    const user = await db.query("SELECT * FROM Customer WHERE id=$1", [userId]);

    if (Number(user.rowCount) <= 0) {
      return { success: false, message: "User not found." };
    }

    const result = await db.query("SELECT * FROM Loan WHERE customer_id=$1", [
      userId,
    ]);

    if (Number(result.rowCount) <= 0) {
      return { success: false, message: "No Loans found." };
    }
    return { success: true, message: "No errors found." };
  } catch (error) {
    return {
      success: false,
      message: "Error while fetching user loan details",
    };
  }
};

export const payRepaymentUtils = async (
  repayAmount: number,
  loanId: string
) => {
  if (!repayAmount) {
    return { success: false, message: "Amount cannot be empty." };
  }
  if (Number(repayAmount) <= 0) {
    return { success: false, message: "Amount cannot be less/eqaul to zero." };
  }
  try {
    const result = await db.query("SELECT * FROM Loan WHERE id=$1", [loanId]);

    if (Number(result.rowCount) <= 0) {
      return { success: false, message: "Requested loan not found." };
    }

    if (result?.rows[0].loan_status == "PENDING") {
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
  } catch (error) {
    return { success: false, message: error };
  }
};
