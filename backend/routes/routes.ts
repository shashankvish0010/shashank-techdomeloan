import express from "express";
import { initialServer } from "../controllers/serverController";
import {
  adminLogin,
  adminRegister,
  userLogin,
  userRegister,
} from "../controllers/authController";
import {
  initiateLoan,
  manageLoans,
  payRepayment,
  updateAdminLoan,
} from "../controllers/logicControllers";

const router = express.Router();

router.get("/", initialServer);

router.post("/user/register", userRegister);

router.post("/user/login", userLogin);

router.post("/admin/register", adminRegister);

router.post("/admin/login", adminLogin);

router.post("/initiate/loan/:userId", initiateLoan);

router.put("/update/loan/:loanId", updateAdminLoan);

router.get("/fetch/loans/:userId", manageLoans);

router.post("/repay/loan/:loanId", payRepayment);

module.exports = router;
