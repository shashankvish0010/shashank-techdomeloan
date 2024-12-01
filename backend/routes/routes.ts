import express from "express";
import { initialServer } from "../controllers/serverController";
import {
  adminLogin,
  adminRegister,
  userLogin,
  userRegister,
} from "../controllers/authController";
import {
  fetchAllLoans,
  initiateLoan,
  manageLoans,
  payRepayment,
  readAllLoans,
  updateAdminLoan,
} from "../controllers/logicControllers";

const router = express.Router();

router.get("/", initialServer);

router.post("/user/register", userRegister);

router.post("/user/login", userLogin);

router.post("/admin/register", adminRegister);

router.post("/admin/login", adminLogin);

router.post("/initiate/loan/:userId", initiateLoan);

router.get("/update/loan/:loanId", updateAdminLoan);

router.get("/fetch/loan/:loanId", manageLoans);

router.get("/fetch/loans/:userId", readAllLoans);

router.get("/fetch/allloans/", fetchAllLoans);

router.post("/repay/loan/:loanId", payRepayment);

module.exports = router;
