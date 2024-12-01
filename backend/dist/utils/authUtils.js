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
exports.adminAuthLoginUtils = exports.adminAuthRegisterUtils = exports.userAuthLoginUtils = exports.userAuthRegisterUtils = void 0;
const validators_1 = require("../services/validators");
const dbconnect_1 = __importDefault(require("../dbconnect"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userAuthRegisterUtils = (firstname, lastname, user_password, confirm_password, user_email) => __awaiter(void 0, void 0, void 0, function* () {
    if (!firstname ||
        !lastname ||
        !user_password ||
        !confirm_password ||
        !user_email) {
        return { success: false, message: "Fill all the fields" };
    }
    try {
        if (!(0, validators_1.emailValidate)(user_email)) {
            return { success: false, message: "Enter a valid email address" };
        }
        if (user_password !== confirm_password) {
            return { success: false, message: "Password does not match." };
        }
        const user = yield dbconnect_1.default.query("SELECT id FROM Customer WHERE user_email=$1", [
            user_email,
        ]);
        console.log(user.rowCount);
        if (Number(user.rowCount) > 0) {
            return { success: false, message: "Email already exists." };
        }
        return { success: true, message: "No user auth errors found." };
    }
    catch (error) {
        return { success: false, message: error };
    }
});
exports.userAuthRegisterUtils = userAuthRegisterUtils;
const userAuthLoginUtils = (user_email, user_password) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user_email || !user_password) {
        return { success: false, message: "Fill all the fields." };
    }
    try {
        if (!(0, validators_1.emailValidate)(user_email)) {
            return { success: false, message: "Enter a valid email address" };
        }
        const user = yield dbconnect_1.default.query("SELECT * FROM Customer WHERE user_email=$1", [
            user_email,
        ]);
        if (Number(user.rowCount) <= 0) {
            return { success: false, message: "Email do not exists." };
        }
        if (!(yield bcrypt_1.default.compare(user_password, user.rows[0].user_password))) {
            return { success: false, message: "Incorrect password." };
        }
        return { success: true, message: "No user login auth errors found." };
    }
    catch (error) {
        return { success: false, message: error };
    }
});
exports.userAuthLoginUtils = userAuthLoginUtils;
const adminAuthRegisterUtils = (firstname, lastname, admin_password, confirm_password, admin_email) => __awaiter(void 0, void 0, void 0, function* () {
    if (!firstname ||
        !lastname ||
        !admin_password ||
        !confirm_password ||
        !admin_email) {
        return { success: false, message: "Fill all the fields" };
    }
    try {
        if (!(0, validators_1.emailValidate)(admin_email)) {
            return { success: false, message: "Enter a valid email address" };
        }
        const validPasswords = ["AX34DV", "BGCDSV", "GHTR3G"];
        if (admin_password !== confirm_password) {
            return { success: false, message: "Password does not match." };
        }
        if (!validPasswords.includes(admin_password)) {
            return {
                success: false,
                message: "Enter provided admin password only, You can get it in Readme file.",
            };
        }
        const admin = yield dbconnect_1.default.query("SELECT id FROM Admin WHERE admin_email=$1", [
            admin_email,
        ]);
        if (Number(admin.rowCount) > 0) {
            return { success: false, message: "Email already exists." };
        }
        return { success: true, message: "No admin auth errors found." };
    }
    catch (error) {
        return { success: false, message: error };
    }
});
exports.adminAuthRegisterUtils = adminAuthRegisterUtils;
const adminAuthLoginUtils = (admin_email, admin_password) => __awaiter(void 0, void 0, void 0, function* () {
    if (!admin_email || !admin_password) {
        return { success: false, message: "Fill all the fields." };
    }
    try {
        if (!(0, validators_1.emailValidate)(admin_email)) {
            return { success: false, message: "Enter a valid email address" };
        }
        const admin = yield dbconnect_1.default.query("SELECT * FROM Admin WHERE admin_email=$1", [
            admin_email,
        ]);
        if (Number(admin.rowCount) <= 0) {
            return { success: false, message: "Email do not exists." };
        }
        if (!(yield bcrypt_1.default.compare(admin_password, admin.rows[0].admin_password))) {
            return { success: false, message: "Incorrect password." };
        }
        return { success: true, message: "No admin login auth errors found." };
    }
    catch (error) {
        return { success: false, message: error };
    }
});
exports.adminAuthLoginUtils = adminAuthLoginUtils;
