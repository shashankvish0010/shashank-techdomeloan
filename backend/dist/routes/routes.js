"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const serverController_1 = require("../controllers/serverController");
const authController_1 = require("../controllers/authController");
const logicControllers_1 = require("../controllers/logicControllers");
const router = express_1.default.Router();
router.get("/", serverController_1.initialServer);
router.post("/user/register", authController_1.userRegister);
router.post("/user/login", authController_1.userLogin);
router.post("/admin/register", authController_1.adminRegister);
router.post("/admin/login", authController_1.adminLogin);
router.post("/initiate/loan/:userId", logicControllers_1.initiateLoan);
router.get("/update/loan/:loanId", logicControllers_1.updateAdminLoan);
router.get("/fetch/loan/:loanId", logicControllers_1.manageLoans);
router.get("/fetch/loans/:userId", logicControllers_1.readAllLoans);
router.get("/fetch/allloans/", logicControllers_1.fetchAllLoans);
router.post("/repay/loan/:loanId", logicControllers_1.payRepayment);
module.exports = router;
