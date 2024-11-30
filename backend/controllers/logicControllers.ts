import { Request, Response } from "express";
import {
  initiateLoanUtils,
  manageLoansUtils,
  payRepaymentUtils,
  updateAdminLoanUtils,
} from "../utils/logicUtils";
import db from "../dbconnect";
import { v4 as uuidv4 } from "uuid";
import { repaymentDates } from "../services/dateGenerate";
import { manageLoanData } from "./types/dto";

export const initiateLoan = async (req: Request, res: Response) => {
  const { loan_amount, term_duration } = req.body;
  const { userId } = req.params;
  const initiateLoanWarnings = await initiateLoanUtils(
    loan_amount,
    term_duration,
    userId
  );

  if (!initiateLoanWarnings?.success) {
    res.json(initiateLoanWarnings);
    return;
  }

  try {
    const id = uuidv4();
    const result = await db.query(
      "INSERT INTO Loan(  id, term_duration, term_paid, loan_amount, paid_amount, customer_id, loan_status, loan_paid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [id, term_duration, 0, loan_amount, 0, userId, "PENDING", false]
    );
    console.log(result.rows[0]);

    if (Number(result.rowCount) > 0) {
      res.json({
        success: true,
        data: { loan_details: result.rows[0] },
        message: "Loan requested successfully",
      });
    } else {
      res.json({ success: false, message: "Loan request not successfully" });
    }
  } catch (error) {
    res.json({ success: false, message: error });
  }
};

export const updateAdminLoan = async (req: Request, res: Response) => {
  try {
    const token =
      "eyJhbGciOiJIUzI1NiJ9.ZmE0YjBiZGEtMTI1NS00Yjc5LTk1OTQtZTE5NDMzMGY5MTk3.e5EGK_v4c2R_4EXKH0SDj08kzgMvDjOdw8PzGuQLAHU";
    const { loanId } = req.params;
    const updateAdminLoanWarnings = await updateAdminLoanUtils(token, loanId);

    if (!updateAdminLoanWarnings?.success) {
      res.json(updateAdminLoanWarnings);
      return;
    }
    const date = new Date();
    const approvedDate = date.toDateString();
    const result = await db.query(
      "UPDATE Loan SET loan_status=$2, approved_date=$3 WHERE id=$1",
      [loanId, "APPROVED", approvedDate]
    );
    if (Number(result.rowCount) > 0) {
      res.json({ success: true, message: "Loan approved successfully" });
    }
  } catch (error) {
    res.json({ success: false, message: error });
  }
};

export const manageLoans = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const manageLoansWarnings = await manageLoansUtils(userId);

  if (!manageLoansWarnings?.success) {
    res.json(manageLoansWarnings);
    return;
  }

  try {
    let data: manageLoanData[] = [];
    const result = await db.query("SELECT * FROM Loan WHERE customer_id=$1", [
      userId,
    ]);
    if (Number(result.rowCount) > 0) {
      result.rows.forEach((loan) => {
        const repayment_amount =
          (loan.loan_amount - loan.paid_amount) /
          (loan.term_duration - loan.term_paid);
        const repayment_dates = repaymentDates(
          loan.approved_date,
          loan.term_duration
        );
        data.push({
          loan_amount: loan.loan_amount,
          term_duration: loan.term_duration,
          approved_date: loan.approved_date,
          repayment_amount,
          repayment_dates,
        });
      });

      if (data.length > 0) {
        res.json({ success: true, data, message: "Current loan details" });
      }
    } else {
      res.json({ success: false, message: "No current loan details found" });
    }
  } catch (error) {
    res.json({ success: false, message: error });
  }
};

export const payRepayment = async (req: Request, res: Response) => {
  const { repayAmount } = req.body;
  const { loanId } = req.params;
  const payRepaymentWarnings = await payRepaymentUtils(repayAmount, loanId);

  if (!payRepaymentWarnings?.success) {
    res.json(payRepaymentWarnings);
    return;
  }

  const term_paid: number =
    Number(await payRepaymentWarnings?.term_paid) + Number(1);
  const paid_amount: number =
    Number(await payRepaymentWarnings?.paid_amount) + Number(repayAmount);
  const paid: boolean =
    Number(paid_amount) === Number(payRepaymentWarnings?.loan_amount)
      ? true
      : false;
  try {
    const result = await db.query(
      "UPDATE Loan SET paid_amount=$2, term_paid=$3, loan_paid=$4 WHERE id=$1",
      [loanId, paid_amount, term_paid, paid]
    );

    if (result) {
      res.json({ success: true, message: "Paid repayment successfully" });
    }
  } catch (error) {
    res.json({ success: false, message: error });
  }
};
