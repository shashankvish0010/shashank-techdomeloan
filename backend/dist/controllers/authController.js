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
exports.adminLogin = exports.adminRegister = exports.userLogin = exports.userRegister = void 0;
const dbconnect_1 = __importDefault(require("../dbconnect"));
const dotenv_1 = __importDefault(require("dotenv"));
const authUtils_1 = require("../utils/authUtils");
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
const jwt = require("jsonwebtoken");
const userRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = (0, uuid_1.v4)();
    const { firstname, lastname, user_password, confirm_password, user_email } = req.body;
    const authWarnings = yield (0, authUtils_1.userAuthRegisterUtils)(firstname, lastname, user_password, confirm_password, user_email);
    if (!(authWarnings === null || authWarnings === void 0 ? void 0 : authWarnings.success)) {
        res.json(authWarnings);
        return;
    }
    try {
        const salt = Number(bcrypt_1.default.genSalt(10));
        const hashedPassword = yield bcrypt_1.default.hash(user_password, salt);
        if (!hashedPassword) {
            res.json({ success: false, message: "Password not hashed" });
            return;
        }
        const result = yield dbconnect_1.default.query("INSERT INTO Customer(id, firstname, lastname, user_password, user_email) VALUES ($1, $2, $3, $4, $5) RETURNING id", [id, firstname, lastname, hashedPassword, user_email]);
        if (result) {
            res.json({ success: true, message: "Registered Successfully" });
        }
        else {
            res.json({ success: false, message: "Not Registered Successfully" });
        }
    }
    catch (error) {
        console.log("Error occured while registration", error);
        res.json({ success: false, message: "Error occured while registration" });
    }
});
exports.userRegister = userRegister;
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_email, user_password } = req.body;
    const authWarnings = yield (0, authUtils_1.userAuthLoginUtils)(user_email, user_password);
    if (!(authWarnings === null || authWarnings === void 0 ? void 0 : authWarnings.success)) {
        res.json(authWarnings);
        return;
    }
    const result = yield dbconnect_1.default.query("SELECT * FROM Customer WHERE user_email=$1", [
        user_email,
    ]);
    if (result) {
        const token = yield jwt.sign(result.rows[0].id, process.env.CUSTOMER_SECRET);
        if (!token) {
            res.json({ success: true, message: "Token not generated" });
        }
        res.json({
            success: true,
            data: { token, user: result.rows[0] },
            message: "Login successfully",
        });
    }
});
exports.userLogin = userLogin;
const adminRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = (0, uuid_1.v4)();
    const { firstname, lastname, admin_password, confirm_password, admin_email } = req.body;
    const authWarnings = yield (0, authUtils_1.adminAuthRegisterUtils)(firstname, lastname, admin_password, confirm_password, admin_email);
    if (!(authWarnings === null || authWarnings === void 0 ? void 0 : authWarnings.success)) {
        res.json(authWarnings);
        return;
    }
    try {
        const salt = Number(bcrypt_1.default.genSalt(10));
        const hashedPassword = yield bcrypt_1.default.hash(admin_password, salt);
        if (!hashedPassword) {
            res.json({ success: false, message: "Password not hashed" });
            return;
        }
        const result = yield dbconnect_1.default.query("INSERT INTO Admin(id, firstname, lastname, admin_password, admin_email) VALUES ($1, $2, $3, $4, $5) RETURNING id", [id, firstname, lastname, hashedPassword, admin_email]);
        if (result) {
            res.json({ success: true, message: "Admin Registered Successfully" });
        }
        else {
            res.json({ success: false, message: "Not Registered Successfully" });
        }
    }
    catch (error) {
        console.log("Error occured while registration", error);
        res.json({ success: false, message: "Error occured while registration" });
    }
});
exports.adminRegister = adminRegister;
const adminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { admin_email, admin_password } = req.body;
    const authWarnings = yield (0, authUtils_1.adminAuthLoginUtils)(admin_email, admin_password);
    if (!(authWarnings === null || authWarnings === void 0 ? void 0 : authWarnings.success)) {
        res.json(authWarnings);
        return;
    }
    const result = yield dbconnect_1.default.query("SELECT * FROM Admin WHERE admin_email=$1", [
        admin_email,
    ]);
    if (result) {
        const token = yield jwt.sign(result.rows[0].id, process.env.ADMIN_SECRET);
        if (!token) {
            res.json({ success: true, message: "Token not generated" });
        }
        res.json({
            success: true,
            data: { token, admin: result.rows[0] },
            message: "Login successfully",
        });
    }
});
exports.adminLogin = adminLogin;
