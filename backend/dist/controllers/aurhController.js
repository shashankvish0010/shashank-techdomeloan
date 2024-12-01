"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRegister = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const validators_1 = require("../services/validators");
dotenv_1.default.config();
const userRegister = (req, res) => {
    const { firstname, lastname, user_password, confirm_password, user_email } = req.body;
    if (!firstname || !lastname || !user_password || !user_email) {
        res.json({ success: false, message: "Fill all the fields" });
        return;
    }
    try {
        if (!(0, validators_1.emailValidate)(user_email)) {
            res.json({ success: false, message: "Enter a valid email address" });
            return;
        }
        if (user_password !== confirm_password) {
            res.json({ success: false, message: "Password does not match." });
            return;
        }
    }
    catch (error) { }
};
exports.userRegister = userRegister;
